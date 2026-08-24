import React, { useState } from 'react';
import { 
  MapPin, 
  Plane, 
  Car, 
  Sparkles, 
  ChevronRight, 
  Info,
  Clock,
  Compass,
  Anchor,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Calendar,
  Camera,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { MAP_POIS_DATA, MAP_TOUR_ROUTES } from '../data/mapData';
import { MapPointOfInterest, MapTourRoute } from '../types';

interface InteractiveTurkeyMapProps {
  onSelectDestination: (destName: string) => void;
  onOpenInquiryForTour?: (tourTitle: string) => void;
}

export const InteractiveTurkeyMap: React.FC<InteractiveTurkeyMapProps> = ({
  onSelectDestination,
  onOpenInquiryForTour,
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>('10-day-classic');
  const [activePoiId, setActivePoiId] = useState<string>('istanbul');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);

  // Active tour route data
  const currentTourRoute = MAP_TOUR_ROUTES.find((r) => r.tourId === selectedTourId) || null;

  // Active POI data
  const activePoi = MAP_POIS_DATA.find((p) => p.id === activePoiId) || MAP_POIS_DATA[0];

  // Categories list
  const categories = [
    'All',
    'UNESCO Wonder',
    'Ancient Monument',
    'Natural Wonder',
    'Coastal & Yachting',
    'Cave & Balloon'
  ];

  const filteredPois = MAP_POIS_DATA.filter((p) => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    return true;
  });

  // Calculate coordinates for route segment connections
  const getPoiCoord = (poiId: string) => {
    const poi = MAP_POIS_DATA.find((p) => p.id === poiId);
    if (!poi) return { x: 400, y: 225 };
    return { x: poi.x, y: poi.y };
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <section id="routes-map" className="py-16 md:py-24 bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-[#FDFCF8] relative border-t border-stone-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
            <span>Interactive Itinerary & Regional Route Explorer</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-3">
            Explore Turkey's Private Routes & Sights
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            Select any signature itinerary to trace the full day-by-day journey, or click individual ancient ruins, cave valleys, and turquoise bays to reveal scholar insider tips and flight connections.
          </p>

          {/* Tour Route Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mr-2 hidden md:inline">
              Select Tour Route:
            </div>
            {MAP_TOUR_ROUTES.map((route) => (
              <button
                key={route.tourId}
                type="button"
                onClick={() => {
                  setSelectedTourId(route.tourId);
                  if (route.stops.length > 0) {
                    setActivePoiId(route.stops[0].poiId);
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTourId === route.tourId
                    ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-lg scale-105'
                    : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: route.color }} />
                <span>{route.tourName.split('(')[0]}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelectedTourId('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTourId === 'all'
                  ? 'bg-[#38BDF8] text-stone-900 dark:text-[#0A0E14] shadow-lg'
                  : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
              }`}
            >
              All 14 Regional POIs
            </button>
          </div>
        </div>

        {/* Map & Detail Container Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: SVG Interactive Turkey Map Canvas */}
          <div className="lg:col-span-7 bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl relative flex flex-col space-y-4">
            {/* Top Toolbar inside map */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {selectedTourId === 'all' ? 'All Iconic Sights' : currentTourRoute?.tourName}
                </span>
                {currentTourRoute && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-[10px] text-amber-600 dark:text-[#D4AF37] font-extrabold">
                    {currentTourRoute.durationDays} Days / {currentTourRoute.stops.length} Stops
                  </span>
                )}
              </div>

              {/* Map Zoom & Pan Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg bg-stone-50 dark:bg-[#0A0E14] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg bg-stone-50 dark:bg-[#0A0E14] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-lg bg-stone-50 dark:bg-[#0A0E14] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10"
                  title="Reset Map View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider mr-1">
                Filter Sights:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14]'
                      : 'bg-stone-50 dark:bg-[#0A0E14] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SVG Visual Canvas with Zoom & High Contrast Topography */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-stone-50 dark:bg-[#0A0E14] rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 shadow-inner flex items-center justify-center">
              <div 
                className="w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              >
                <svg
                  viewBox="0 0 850 480"
                  className="w-full h-full object-contain filter drop-shadow-lg select-none"
                >
                  {/* Subtle Grid / Lat-Long Grid lines */}
                  <defs>
                    <linearGradient id="goldFlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2DD4BF" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Water bodies subtle tones */}
                  <rect width="850" height="480" fill="#0A0E14" />

                  {/* Turkey Land Outline SVG Path */}
                  <path
                    d="M 120 110 
                       Q 180 75 270 85 
                       T 410 85 
                       T 550 75 
                       T 690 90 
                       T 770 140 
                       T 810 200 
                       T 780 280 
                       T 710 340 
                       T 610 375 
                       T 480 355 
                       T 360 400 
                       T 250 410 
                       T 130 380 
                       T 70 310 
                       T 95 210 
                       Z"
                    fill="#131922"
                    stroke="#2A3444"
                    strokeWidth="2"
                  />

                  {/* Sea / Region Labels */}
                  <text x="380" y="45" fill="#4B5563" fontSize="10" fontWeight="bold" letterSpacing="4">
                    BLACK SEA (KARADENİZ)
                  </text>
                  <text x="35" y="240" fill="#4B5563" fontSize="10" fontWeight="bold" letterSpacing="3">
                    AEGEAN SEA
                  </text>
                  <text x="360" y="445" fill="#4B5563" fontSize="10" fontWeight="bold" letterSpacing="4">
                    MEDITERRANEAN SEA (AKDENİZ)
                  </text>

                  {/* Render Tour Route Segments when tour is selected */}
                  {currentTourRoute && currentTourRoute.segments.map((seg, sIdx) => {
                    const fromCoord = getPoiCoord(seg.from);
                    const toCoord = getPoiCoord(seg.to);

                    // Midpoint for curve
                    const midX = (fromCoord.x + toCoord.x) / 2;
                    const midY = (fromCoord.y + toCoord.y) / 2 - (seg.type === 'flight' ? 35 : (seg.type === 'sea' ? -20 : 10));

                    if (seg.type === 'flight') {
                      return (
                        <g key={`seg-${sIdx}`}>
                          {/* Curved flight line */}
                          <path
                            d={`M ${fromCoord.x} ${fromCoord.y} Q ${midX} ${midY} ${toCoord.x} ${toCoord.y}`}
                            fill="none"
                            stroke="url(#goldFlightGrad)"
                            strokeWidth="2.5"
                            strokeDasharray="6 4"
                            className="animate-pulse"
                            filter="url(#glow)"
                          />
                          {/* Midpoint plane icon */}
                          <circle cx={midX} cy={midY} r="9" fill="#0A0E14" stroke="#D4AF37" strokeWidth="1.5" />
                          <text x={midX} y={midY + 3.5} textAnchor="middle" fill="#D4AF37" fontSize="9" fontWeight="bold">
                            ✈
                          </text>
                        </g>
                      );
                    } else if (seg.type === 'sea') {
                      return (
                        <g key={`seg-${sIdx}`}>
                          {/* Sea route line */}
                          <path
                            d={`M ${fromCoord.x} ${fromCoord.y} Q ${midX} ${midY} ${toCoord.x} ${toCoord.y}`}
                            fill="none"
                            stroke="url(#seaGrad)"
                            strokeWidth="3"
                            strokeDasharray="4 3"
                          />
                          <circle cx={midX} cy={midY} r="8" fill="#0A0E14" stroke="#2DD4BF" strokeWidth="1.5" />
                          <text x={midX} y={midY + 3} textAnchor="middle" fill="#2DD4BF" fontSize="8" fontWeight="bold">
                            ⚓
                          </text>
                        </g>
                      );
                    } else {
                      // Overland VIP Mercedes Highway
                      return (
                        <g key={`seg-${sIdx}`}>
                          <path
                            d={`M ${fromCoord.x} ${fromCoord.y} Q ${midX} ${midY} ${toCoord.x} ${toCoord.y}`}
                            fill="none"
                            stroke="#64748B"
                            strokeWidth="2"
                          />
                        </g>
                      );
                    }
                  })}

                  {/* Render POI Nodes */}
                  {filteredPois.map((poi) => {
                    const isSelected = activePoiId === poi.id;
                    const stopInCurrentTour = currentTourRoute?.stops.find((s) => s.poiId === poi.id);
                    const stopIndex = currentTourRoute?.stops.findIndex((s) => s.poiId === poi.id);

                    return (
                      <g
                        key={poi.id}
                        onClick={() => setActivePoiId(poi.id)}
                        className="cursor-pointer group"
                      >
                        {/* Active Glow Ring */}
                        {isSelected && (
                          <circle
                            cx={poi.x}
                            cy={poi.y}
                            r="20"
                            fill="#D4AF37"
                            fillOpacity="0.3"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Ring */}
                        <circle
                          cx={poi.x}
                          cy={poi.y}
                          r={isSelected ? "11" : (stopInCurrentTour ? "9" : "7")}
                          fill={isSelected ? "#D4AF37" : (stopInCurrentTour ? "#38BDF8" : "#1E293B")}
                          stroke={isSelected ? "#FFFFFF" : (stopInCurrentTour ? "#D4AF37" : "#475569")}
                          strokeWidth="2"
                        />

                        {/* Stop Number Badge if part of current itinerary */}
                        {stopInCurrentTour && stopIndex !== undefined && stopIndex >= 0 && (
                          <text
                            x={poi.x}
                            y={poi.y + 3.5}
                            textAnchor="middle"
                            fill="#0A0E14"
                            fontSize="8"
                            fontWeight="bold"
                          >
                            {stopIndex + 1}
                          </text>
                        )}

                        {/* POI Label */}
                        <text
                          x={poi.x}
                          y={poi.y - (isSelected ? 16 : 12)}
                          textAnchor="middle"
                          fill={isSelected ? "#D4AF37" : (stopInCurrentTour ? "#FFFFFF" : "#94A3B8")}
                          fontSize={isSelected ? "12" : "10"}
                          fontWeight={isSelected || stopInCurrentTour ? "bold" : "500"}
                          className="transition-all"
                        >
                          {poi.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Map Legend & Transport Modes */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-white/5 gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                  <span className="w-3.5 h-0.5 bg-amber-500 dark:bg-[#D4AF37] border-b border-dashed border-amber-600 dark:border-[#D4AF37] inline-block" />
                  <Plane className="w-3 h-3 text-amber-600 dark:text-[#D4AF37]" />
                  <span>Domestic Flight (1h)</span>
                </span>

                <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                  <span className="w-3.5 h-0.5 bg-stone-400 inline-block" />
                  <Car className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                  <span>Mercedes VIP Drive</span>
                </span>

                <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                  <span className="w-3.5 h-0.5 bg-[#2DD4BF] border-b border-dashed border-[#2DD4BF] inline-block" />
                  <Anchor className="w-3 h-3 text-[#2DD4BF]" />
                  <span>Gulet Sea Cruise</span>
                </span>
              </div>

              <div className="text-[10px] text-amber-600 dark:text-[#D4AF37] font-bold">
                TÜRSAB VIP Ground Logistics
              </div>
            </div>

            {/* Day-by-Day Timeline Scrubber (when tour is selected) */}
            {currentTourRoute && (
              <div className="bg-stone-50 dark:bg-[#0A0E14] p-3 rounded-2xl border border-stone-200 dark:border-white/5 space-y-2">
                <div className="text-[11px] font-bold text-stone-600 dark:text-stone-300 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-amber-600 dark:text-[#D4AF37]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{currentTourRoute.tourName} Itinerary Sequence:</span>
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">Click a day to focus map</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {currentTourRoute.stops.map((stop, sIdx) => {
                    const isStopActive = activePoiId === stop.poiId;
                    const poi = MAP_POIS_DATA.find((p) => p.id === stop.poiId);

                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => setActivePoiId(stop.poiId)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          isStopActive
                            ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] font-bold shadow-md'
                            : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                          isStopActive ? 'bg-stone-50 dark:bg-[#0A0E14] text-amber-600 dark:text-[#D4AF37]' : 'bg-white/10 text-stone-900 dark:text-white'
                        }`}>
                          {sIdx + 1}
                        </span>
                        <span>{stop.dayLabel}: {poi?.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT 5 COLS: Rich Point of Interest Details Card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header Hero Image */}
            <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-50 dark:bg-[#0A0E14]">
              <img
                src={activePoi.gallery && activePoi.gallery.length > 0 ? (activeGalleryIdx === 0 ? activePoi.image : activePoi.gallery[activeGalleryIdx - 1] || activePoi.image) : activePoi.image}
                alt={activePoi.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161C24] via-[#161C24]/40 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-stone-50 dark:bg-[#0A0E14]/80 backdrop-blur-md border border-stone-200 dark:border-white/10 text-amber-600 dark:text-[#D4AF37]">
                  {activePoi.category}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-50 dark:bg-[#0A0E14]/80 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10">
                  {activePoi.region} Region
                </span>
              </div>

              {/* Title on bottom */}
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold tracking-wide">
                  {activePoi.turkishName}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                  {activePoi.name}
                </h3>
              </div>
            </div>

            {/* Gallery Thumbnail Bar if available */}
            {activePoi.gallery && activePoi.gallery.length > 0 && (
              <div className="px-4 py-2 bg-stone-50 dark:bg-[#0A0E14] border-b border-stone-200 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveGalleryIdx(0)}
                  className={`w-10 h-7 rounded-lg overflow-hidden border cursor-pointer shrink-0 ${
                    activeGalleryIdx === 0 ? 'border-amber-600 dark:border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-stone-200 dark:border-white/10 opacity-60'
                  }`}
                >
                  <img src={activePoi.image} alt="main" className="w-full h-full object-cover" />
                </button>
                {activePoi.gallery.map((gImg, gIdx) => (
                  <button
                    key={gIdx}
                    type="button"
                    onClick={() => setActiveGalleryIdx(gIdx + 1)}
                    className={`w-10 h-7 rounded-lg overflow-hidden border cursor-pointer shrink-0 ${
                      activeGalleryIdx === gIdx + 1 ? 'border-amber-600 dark:border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-stone-200 dark:border-white/10 opacity-60'
                    }`}
                  >
                    <img src={gImg} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Body Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col space-y-4 text-xs">
              {/* Detailed overview */}
              <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                {activePoi.detailedDesc}
              </p>

              {/* Scholar Guide Insider Tip Box */}
              <div className="bg-stone-50 dark:bg-[#0A0E14] border border-amber-600 dark:border-[#D4AF37]/30 rounded-2xl p-3.5 text-xs text-amber-600 dark:text-[#D4AF37] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 dark:text-white">Scholar Guide Insider Tip: </span>
                  <span className="text-stone-600 dark:text-stone-300 font-light">{activePoi.insiderTip}</span>
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Monument Highlights & Inclusions:
                </div>
                <div className="space-y-1.5">
                  {activePoi.topHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-stone-800 dark:text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing & Photography Advice */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200 dark:border-white/5 text-[11px]">
                <div className="bg-stone-50 dark:bg-[#0A0E14] p-2.5 rounded-xl border border-stone-200 dark:border-white/5">
                  <span className="block text-stone-500 font-medium">Ideal Stay:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{activePoi.idealDuration}</span>
                </div>
                <div className="bg-stone-50 dark:bg-[#0A0E14] p-2.5 rounded-xl border border-stone-200 dark:border-white/5">
                  <span className="block text-stone-500 font-medium">Best Lighting:</span>
                  <span className="font-bold text-amber-600 dark:text-[#D4AF37] truncate block">{activePoi.bestTimeOfDay}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 dark:border-white/5 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => onSelectDestination(activePoi.name.split(' ')[0])}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Filter Tours Visiting {activePoi.name.split(' ')[0]}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {onOpenInquiryForTour && (
                  <button
                    type="button"
                    onClick={() => onOpenInquiryForTour(`Custom Private Itinerary featuring ${activePoi.name}`)}
                    className="py-3 px-4 rounded-xl bg-stone-50 dark:bg-[#0A0E14] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Request Quote
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
