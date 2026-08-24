import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Edit3,
  Check,
  Save,
  TrendingUp,
  Percent,
  DollarSign,
  Calendar,
  Eye,
  Star,
  MapPin,
  Clock,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Plus,
  Trash2,
  Copy,
  Search,
  Filter,
  SlidersHorizontal,
  Layers,
  Award,
  AlertTriangle
} from 'lucide-react';
import { TourPackage, SignatureExperience } from '../../types';
import { 
  getInitialTours, 
  getInitialExperiences, 
  fetchToursFromApi, 
  fetchExperiencesFromApi, 
  saveTourToServer, 
  deleteTourFromServer, 
  resetToursOnServer, 
  saveExperienceToServer, 
  deleteExperienceFromServer, 
  resetExperiencesOnServer,
  persistLocalTours,
  persistLocalExperiences
} from '../../utils/toursStorage';
import { TourEditorModal } from './TourEditorModal';
import { ExperienceEditorModal } from './ExperienceEditorModal';

interface AdminToursManagerProps {
  onShowToast: (msg: string) => void;
  onOpenPublicTour?: (tourId: string) => void;
  tours?: TourPackage[];
  experiences?: SignatureExperience[];
  onToursUpdated?: (tours: TourPackage[]) => void;
  onExperiencesUpdated?: (experiences: SignatureExperience[]) => void;
}

export const AdminToursManager: React.FC<AdminToursManagerProps> = ({
  onShowToast,
  onOpenPublicTour,
  tours: propTours,
  experiences: propExperiences,
  onToursUpdated,
  onExperiencesUpdated,
}) => {
  // Subtab: 'tours' | 'experiences'
  const [activeSubTab, setActiveSubTab] = useState<'tours' | 'experiences'>('tours');

  // Tours State
  const [tours, setTours] = useState<TourPackage[]>(() => propTours || getInitialTours());
  const [seasonalMultiplier, setSeasonalMultiplier] = useState<number>(1.0);
  const [tourSearch, setTourSearch] = useState('');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('All');
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null);
  const [isTourEditorOpen, setIsTourEditorOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<TourPackage | null>(null);
  const [tierEdits, setTierEdits] = useState<{ [id: string]: { classic: number; comfort: number; luxury: number } }>({});
  const [expandedTourId, setExpandedTourId] = useState<string | null>(null);

  // Experiences State
  const [experiences, setExperiences] = useState<SignatureExperience[]>(() => propExperiences || getInitialExperiences());
  const [experienceSearch, setExperienceSearch] = useState('');
  const [experienceLocationFilter, setExperienceLocationFilter] = useState('All');
  const [editingExperience, setEditingExperience] = useState<SignatureExperience | null>(null);
  const [isExperienceEditorOpen, setIsExperienceEditorOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<SignatureExperience | null>(null);
  const [expPriceEdits, setExpPriceEdits] = useState<{ [id: string]: number }>({});

  // Sync with props if provided
  useEffect(() => {
    if (propTours) setTours(propTours);
  }, [propTours]);

  useEffect(() => {
    if (propExperiences) setExperiences(propExperiences);
  }, [propExperiences]);

  // Initial fetch from backend
  useEffect(() => {
    const loadBackendData = async () => {
      const [fetchedTours, fetchedExperiences] = await Promise.all([
        fetchToursFromApi(),
        fetchExperiencesFromApi(),
      ]);
      setTours(fetchedTours);
      setExperiences(fetchedExperiences);
      if (onToursUpdated) onToursUpdated(fetchedTours);
      if (onExperiencesUpdated) onExperiencesUpdated(fetchedExperiences);
    };
    loadBackendData();
  }, []);

  // ================= TOURS HANDLERS =================

  const handlePriceChange = (tourId: string, tier: 'classic' | 'comfort' | 'luxury', val: number) => {
    setTierEdits((prev) => ({
      ...prev,
      [tourId]: {
        ...(prev[tourId] || tours.find((t) => t.id === tourId)?.pricePerPersonUSD || { classic: 3000, comfort: 4000, luxury: 6000 }),
        [tier]: val,
      },
    }));
  };

  const handleSaveTourPrices = async (tourId: string) => {
    const updatedTierPrices = tierEdits[tourId];
    const targetTour = tours.find((t) => t.id === tourId);
    if (updatedTierPrices && targetTour) {
      const updatedTour: TourPackage = {
        ...targetTour,
        pricePerPersonUSD: updatedTierPrices,
      };

      const updatedList = tours.map((t) => (t.id === tourId ? updatedTour : t));
      setTours(updatedList);
      persistLocalTours(updatedList);
      if (onToursUpdated) onToursUpdated(updatedList);

      await saveTourToServer(updatedTour, false);
      onShowToast(`Tier pricing saved for "${targetTour.title}"`);
    }
  };

  const handleApplySeasonalMarkup = (markupPercent: number) => {
    const mult = 1 + markupPercent / 100;
    setSeasonalMultiplier(mult);
    onShowToast(`Seasonal yield pricing updated: ${markupPercent > 0 ? `+${markupPercent}% markup applied` : 'Standard rates active'}.`);
  };

  const handleOpenCreateTour = () => {
    setEditingTour(null);
    setIsTourEditorOpen(true);
  };

  const handleOpenEditTour = (tour: TourPackage) => {
    setEditingTour(tour);
    setIsTourEditorOpen(true);
  };

  const handleSaveTourFromModal = async (savedTour: TourPackage, isNew: boolean) => {
    let updatedList: TourPackage[];
    if (isNew) {
      updatedList = [savedTour, ...tours];
      onShowToast(`New tour package "${savedTour.title}" created successfully!`);
    } else {
      updatedList = tours.map((t) => (t.id === savedTour.id ? savedTour : t));
      onShowToast(`Tour "${savedTour.title}" updated successfully!`);
    }

    setTours(updatedList);
    persistLocalTours(updatedList);
    if (onToursUpdated) onToursUpdated(updatedList);

    await saveTourToServer(savedTour, isNew);
  };

  const handleDuplicateTour = async (tour: TourPackage) => {
    const duplicated: TourPackage = {
      ...JSON.parse(JSON.stringify(tour)),
      id: `${tour.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${tour.title} (Copy)`,
      tagline: tour.tagline ? `${tour.tagline} (Bespoke Variant)` : '',
    };

    const updatedList = [duplicated, ...tours];
    setTours(updatedList);
    persistLocalTours(updatedList);
    if (onToursUpdated) onToursUpdated(updatedList);

    await saveTourToServer(duplicated, true);
    onShowToast(`Duplicated "${tour.title}" as a new draft tour!`);
  };

  const handleConfirmDeleteTour = async () => {
    if (!tourToDelete) return;
    const tourId = tourToDelete.id;
    const title = tourToDelete.title;

    const updatedList = tours.filter((t) => t.id !== tourId);
    setTours(updatedList);
    persistLocalTours(updatedList);
    if (onToursUpdated) onToursUpdated(updatedList);

    await deleteTourFromServer(tourId);
    setTourToDelete(null);
    onShowToast(`Tour "${title}" deleted.`);
  };

  const handleResetAllTours = async () => {
    if (window.confirm('Reset all signature tours back to default original catalog? Any custom tours or price edits will be replaced.')) {
      const resetList = await resetToursOnServer();
      setTours(resetList);
      persistLocalTours(resetList);
      if (onToursUpdated) onToursUpdated(resetList);
      onShowToast('All signature tours reset to factory defaults.');
    }
  };

  // ================= EXPERIENCES HANDLERS =================

  const handleExpPriceChange = (expId: string, val: number) => {
    setExpPriceEdits((prev) => ({
      ...prev,
      [expId]: val,
    }));
  };

  const handleSaveExpPrice = async (expId: string) => {
    const newPrice = expPriceEdits[expId];
    const target = experiences.find((e) => e.id === expId);
    if (newPrice !== undefined && target) {
      const updated: SignatureExperience = {
        ...target,
        priceUSD: newPrice,
      };

      const updatedList = experiences.map((e) => (e.id === expId ? updated : e));
      setExperiences(updatedList);
      persistLocalExperiences(updatedList);
      if (onExperiencesUpdated) onExperiencesUpdated(updatedList);

      await saveExperienceToServer(updated, false);
      onShowToast(`Price for "${target.title}" updated to $${newPrice} USD.`);
    }
  };

  const handleOpenCreateExperience = () => {
    setEditingExperience(null);
    setIsExperienceEditorOpen(true);
  };

  const handleOpenEditExperience = (exp: SignatureExperience) => {
    setEditingExperience(exp);
    setIsExperienceEditorOpen(true);
  };

  const handleSaveExperienceFromModal = async (savedExp: SignatureExperience, isNew: boolean) => {
    let updatedList: SignatureExperience[];
    if (isNew) {
      updatedList = [savedExp, ...experiences];
      onShowToast(`Design excursion "${savedExp.title}" published!`);
    } else {
      updatedList = experiences.map((e) => (e.id === savedExp.id ? savedExp : e));
      onShowToast(`Design excursion "${savedExp.title}" updated!`);
    }

    setExperiences(updatedList);
    persistLocalExperiences(updatedList);
    if (onExperiencesUpdated) onExperiencesUpdated(updatedList);

    await saveExperienceToServer(savedExp, isNew);
  };

  const handleDuplicateExperience = async (exp: SignatureExperience) => {
    const duplicated: SignatureExperience = {
      ...JSON.parse(JSON.stringify(exp)),
      id: `${exp.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${exp.title} (VIP Variation)`,
    };

    const updatedList = [duplicated, ...experiences];
    setExperiences(updatedList);
    persistLocalExperiences(updatedList);
    if (onExperiencesUpdated) onExperiencesUpdated(updatedList);

    await saveExperienceToServer(duplicated, true);
    onShowToast(`Duplicated "${exp.title}" as a new design excursion!`);
  };

  const handleConfirmDeleteExperience = async () => {
    if (!experienceToDelete) return;
    const expId = experienceToDelete.id;
    const title = experienceToDelete.title;

    const updatedList = experiences.filter((e) => e.id !== expId);
    setExperiences(updatedList);
    persistLocalExperiences(updatedList);
    if (onExperiencesUpdated) onExperiencesUpdated(updatedList);

    await deleteExperienceFromServer(expId);
    setExperienceToDelete(null);
    onShowToast(`Design excursion "${title}" deleted.`);
  };

  const handleResetAllExperiences = async () => {
    if (window.confirm('Reset all design excursions & masterclasses back to default catalog?')) {
      const resetList = await resetExperiencesOnServer();
      setExperiences(resetList);
      persistLocalExperiences(resetList);
      if (onExperiencesUpdated) onExperiencesUpdated(resetList);
      onShowToast('All design excursions reset to default catalog.');
    }
  };

  // Filtered Tours
  const filteredTours = tours.filter((t) => {
    const matchSearch =
      tourSearch === '' ||
      t.title.toLowerCase().includes(tourSearch.toLowerCase()) ||
      t.destinations.some((d) => d.toLowerCase().includes(tourSearch.toLowerCase())) ||
      t.startingCity.toLowerCase().includes(tourSearch.toLowerCase());

    if (!matchSearch) return false;

    if (selectedDurationFilter === '3-5') return t.durationDays <= 5;
    if (selectedDurationFilter === '7-10') return t.durationDays >= 7 && t.durationDays <= 10;
    if (selectedDurationFilter === '12+') return t.durationDays >= 11;

    return true;
  });

  // Filtered Experiences
  const uniqueLocations = Array.from(new Set(experiences.map((e) => e.location.split('(')[0].trim())));
  const filteredExperiences = experiences.filter((e) => {
    const matchSearch =
      experienceSearch === '' ||
      e.title.toLowerCase().includes(experienceSearch.toLowerCase()) ||
      e.location.toLowerCase().includes(experienceSearch.toLowerCase()) ||
      (e.badge && e.badge.toLowerCase().includes(experienceSearch.toLowerCase()));

    if (!matchSearch) return false;

    if (experienceLocationFilter !== 'All') {
      return e.location.toLowerCase().includes(experienceLocationFilter.toLowerCase());
    }

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Subtab Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Tours &amp; Design Excursions Control
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Public Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Create, edit, duplicate, and adjust pricing for private signature tours and bespoke Turkish excursions.
            </p>
          </div>

          {/* Subtab Toggle Buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveSubTab('tours')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'tours'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Signature Tour Packages ({tours.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('experiences')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'experiences'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Design Excursions &amp; Masterclasses ({experiences.length})</span>
            </button>
          </div>
        </div>

        {/* Global Security / Compliance info banner */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All modifications immediately synchronize with public guest itinerary pages, pricing calculators, and PDF quote builders.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {activeSubTab === 'tours' ? (
              <button
                type="button"
                onClick={handleResetAllTours}
                className="text-[11px] text-slate-500 hover:text-rose-600 font-semibold cursor-pointer underline underline-offset-2"
              >
                Reset Tours to Defaults
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetAllExperiences}
                className="text-[11px] text-slate-500 hover:text-rose-600 font-semibold cursor-pointer underline underline-offset-2"
              >
                Reset Excursions to Defaults
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: SIGNATURE TOURS                                                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'tours' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Filters, Yield, Create */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search & Duration Filter */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={tourSearch}
                  onChange={(e) => setTourSearch(e.target.value)}
                  placeholder="Search by tour title, city, destination..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <span className="text-[11px] font-bold text-slate-500 px-2">Duration:</span>
                {[
                  { label: 'All', val: 'All' },
                  { label: '3-5 Days', val: '3-5' },
                  { label: '7-10 Days', val: '7-10' },
                  { label: '12+ Days', val: '12+' },
                ].map((dur) => (
                  <button
                    key={dur.val}
                    type="button"
                    onClick={() => setSelectedDurationFilter(dur.val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      selectedDurationFilter === dur.val
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Seasonal Yield Control & Create Tour Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500">Yield:</span>
                {[
                  { label: 'Standard (0%)', markup: 0 },
                  { label: '+10% High', markup: 10 },
                  { label: '+18% Peak', markup: 18 },
                ].map((season) => {
                  const active = Math.round((seasonalMultiplier - 1) * 100) === season.markup;
                  return (
                    <button
                      key={season.label}
                      type="button"
                      onClick={() => handleApplySeasonalMarkup(season.markup)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {season.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleOpenCreateTour}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Create New Tour Package</span>
              </button>
            </div>
          </div>

          {/* Tour Packages Cards Grid */}
          <div className="space-y-4">
            {filteredTours.map((tour) => {
              const currentTierPrices = tierEdits[tour.id] || tour.pricePerPersonUSD;
              const hasPriceChanges =
                tierEdits[tour.id] &&
                (tierEdits[tour.id].classic !== tour.pricePerPersonUSD.classic ||
                  tierEdits[tour.id].comfort !== tour.pricePerPersonUSD.comfort ||
                  tierEdits[tour.id].luxury !== tour.pricePerPersonUSD.luxury);

              const isExpanded = expandedTourId === tour.id;

              return (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                >
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    
                    {/* Left: Thumbnail & Tour Meta */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-200">
                        <img
                          src={tour.heroImage}
                          alt={tour.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-stone-900 dark:text-white text-[10px] font-bold">
                          {tour.durationDays}D / {tour.durationNights}N
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 truncate">
                            {tour.title}
                          </h3>
                          {tour.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 truncate">
                              {tour.badge}
                            </span>
                          )}
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Rating: {tour.physicalRating}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-1">
                          {tour.tagline || tour.overview}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            <span>{tour.destinations.join(' &bull; ')}</span>
                          </span>
                          <span>&bull;</span>
                          <span className="text-slate-400">
                            Starts: {tour.startingCity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Live Pricing Quick Editor */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 shrink-0">
                      <div className="text-center">
                        <span className="block text-[10px] font-bold uppercase text-slate-500">Classic (4★)</span>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span className="text-xs font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            min="100"
                            value={currentTierPrices.classic}
                            onChange={(e) => handlePriceChange(tour.id, 'classic', Number(e.target.value) || 0)}
                            className="w-16 px-1.5 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded text-center"
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="block text-[10px] font-bold uppercase text-amber-700">Comfort (Heritage)</span>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span className="text-xs font-bold text-amber-600">$</span>
                          <input
                            type="number"
                            min="100"
                            value={currentTierPrices.comfort}
                            onChange={(e) => handlePriceChange(tour.id, 'comfort', Number(e.target.value) || 0)}
                            className="w-16 px-1.5 py-1 text-xs font-bold text-slate-900 bg-white border border-amber-300 rounded text-center"
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="block text-[10px] font-bold uppercase text-indigo-700">Luxury (5★ Palace)</span>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span className="text-xs font-bold text-indigo-600">$</span>
                          <input
                            type="number"
                            min="100"
                            value={currentTierPrices.luxury}
                            onChange={(e) => handlePriceChange(tour.id, 'luxury', Number(e.target.value) || 0)}
                            className="w-16 px-1.5 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded text-center"
                          />
                        </div>
                      </div>

                      {hasPriceChanges && (
                        <button
                          type="button"
                          onClick={() => handleSaveTourPrices(tour.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer animate-in fade-in"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEditTour(tour)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                        title="Edit Full Tour Itinerary, Days, Inclusions & Hotels"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Tour</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicateTour(tour)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                        title="Duplicate Tour Itinerary"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {onOpenPublicTour && (
                        <button
                          type="button"
                          onClick={() => onOpenPublicTour(tour.id)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                          title="Preview in Guest Storefront"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setTourToDelete(tour)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                        title="Delete Tour Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedTourId(isExpanded ? null : tour.id)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl cursor-pointer"
                        title="Quick View Day-by-Day Breakdown"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Day-by-Day Preview Accordion */}
                  {isExpanded && (
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Day-by-Day Schedule Preview ({tour.itinerary.length} Days)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenEditTour(tour)}
                          className="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Days in Detail Builder</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tour.itinerary.map((day) => (
                          <div key={day.day} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <span>Day {day.day}: {day.title}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                                {day.location}
                              </span>
                            </div>
                            <p className="text-slate-500 line-clamp-2 leading-relaxed">
                              {day.morning || day.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredTours.length === 0 && (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Compass className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No tours matching criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms or create a brand new signature tour package.
                </p>
                <button
                  type="button"
                  onClick={handleOpenCreateTour}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Create New Tour
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: DESIGN EXCURSIONS & EXPERIENCES                                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'experiences' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Search, Filter, Create */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={experienceSearch}
                  onChange={(e) => setExperienceSearch(e.target.value)}
                  placeholder="Search excursions, balloon flights, yachts, hammams..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <span className="text-[11px] font-bold text-slate-500 px-2">Location:</span>
                <select
                  value={experienceLocationFilter}
                  onChange={(e) => setExperienceLocationFilter(e.target.value)}
                  className="bg-white px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 text-slate-800"
                >
                  <option value="All">All Regions</option>
                  {uniqueLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenCreateExperience}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Add New Design Excursion</span>
            </button>
          </div>

          {/* Excursions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExperiences.map((exp) => {
              const currentPrice = expPriceEdits[exp.id] !== undefined ? expPriceEdits[exp.id] : exp.priceUSD;
              const hasPriceChanged = expPriceEdits[exp.id] !== undefined && expPriceEdits[exp.id] !== exp.priceUSD;

              return (
                <div
                  key={exp.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition-all"
                >
                  <div>
                    {/* Hero Image & Badge */}
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                      
                      {exp.badge && (
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                          {exp.badge}
                        </div>
                      )}

                      <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-stone-900 dark:text-white flex items-center justify-between">
                        <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span className="truncate max-w-[130px]">{exp.location}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>{exp.duration}</span>
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                          Key Inclusions ({exp.included.length}):
                        </div>
                        {exp.included.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Bar: Inline Price Edit & Actions */}
                  <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Price:</span>
                      <div className="relative flex items-center">
                        <span className="text-xs font-bold text-slate-500 mr-0.5">$</span>
                        <input
                          type="number"
                          min="1"
                          value={currentPrice}
                          onChange={(e) => handleExpPriceChange(exp.id, Number(e.target.value) || 0)}
                          className="w-16 px-1.5 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded text-center"
                        />
                        {hasPriceChanged && (
                          <button
                            type="button"
                            onClick={() => handleSaveExpPrice(exp.id)}
                            className="ml-1 p-1 bg-emerald-600 text-white rounded cursor-pointer hover:bg-emerald-500"
                            title="Save new rate"
                          >
                            <Save className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditExperience(exp)}
                        className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                        title="Edit Excursion Details"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicateExperience(exp)}
                        className="p-1.5 bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-lg cursor-pointer transition-colors"
                        title="Duplicate Excursion"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setExperienceToDelete(exp)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-lg cursor-pointer transition-colors"
                        title="Delete Excursion"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredExperiences.length === 0 && (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No design excursions found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search criteria or add a brand new bespoke excursion.
                </p>
                <button
                  type="button"
                  onClick={handleOpenCreateExperience}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Add Design Excursion
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS: TOUR EDITOR, EXPERIENCE EDITOR, DELETE CONFIRMATIONS             */}
      {/* ========================================================================= */}

      {/* Full Tour Package Editor Modal */}
      <TourEditorModal
        tour={editingTour}
        isOpen={isTourEditorOpen}
        onClose={() => {
          setIsTourEditorOpen(false);
          setEditingTour(null);
        }}
        onSave={handleSaveTourFromModal}
      />

      {/* Full Design Experience Editor Modal */}
      <ExperienceEditorModal
        experience={editingExperience}
        isOpen={isExperienceEditorOpen}
        onClose={() => {
          setIsExperienceEditorOpen(false);
          setEditingExperience(null);
        }}
        onSave={handleSaveExperienceFromModal}
      />

      {/* Delete Tour Confirmation Modal */}
      {tourToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Tour Package</h3>
                <p className="text-xs text-slate-500">This action removes it from the public catalog.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900">"{tourToDelete.title}"</strong> ({tourToDelete.durationDays} Days)?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTourToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteTour}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete Tour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Experience Confirmation Modal */}
      {experienceToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Design Excursion</h3>
                <p className="text-xs text-slate-500">This action removes it from the bespoke enhancements list.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900">"{experienceToDelete.title}"</strong> (${experienceToDelete.priceUSD} USD)?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setExperienceToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteExperience}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete Excursion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
