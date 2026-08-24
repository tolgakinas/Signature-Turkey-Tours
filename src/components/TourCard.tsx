import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Plane, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { TourPackage, CurrencyCode, AccommodationTierType } from '../types';
import { formatPrice } from '../utils/currency';

interface TourCardProps {
  tour: TourPackage;
  activeCurrency: CurrencyCode;
  onSelectTour: (tour: TourPackage) => void;
  onQuickInquiry: (tour: TourPackage) => void;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  activeCurrency,
  onSelectTour,
  onQuickInquiry,
}) => {
  const [selectedTier, setSelectedTier] = useState<AccommodationTierType>('comfort');

  const currentPrice = tour.pricePerPersonUSD[selectedTier];

  return (
    <div className="bg-white dark:bg-[#161C24] rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 hover:border-amber-600 dark:border-[#D4AF37]/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group text-stone-900 dark:text-[#FDFCF8]">
      {/* Hero Image Container */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-stone-50 dark:bg-[#0A0E14]">
        <img
          src={tour.heroImage}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161C24] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {tour.badge ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md">
              {tour.badge}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-50 dark:bg-[#0A0E14]/80 backdrop-blur-md text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10">
              Private Tour
            </span>
          )}

          <div className="flex items-center gap-1 bg-stone-50 dark:bg-[#0A0E14]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-stone-900 dark:text-white border border-stone-200 dark:border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-stone-900 dark:text-white font-bold">{tour.ratings.score}</span>
            <span className="text-stone-500 dark:text-stone-400 text-[11px]">({tour.ratings.reviewCount})</span>
          </div>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-800 dark:text-stone-200">
          <div className="flex items-center gap-1.5 font-medium bg-stone-50 dark:bg-[#0A0E14]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200 dark:border-white/10">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
            <span>{tour.durationDays} Days / {tour.durationNights} Nights</span>
          </div>
          <div className="bg-stone-50 dark:bg-[#0A0E14]/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-600 dark:text-[#D4AF37] font-medium border border-stone-200 dark:border-white/10">
            100% Private Scholar Guide
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Destinations Tagline */}
          <div className="flex items-start gap-1.5 text-xs text-amber-600 dark:text-[#D4AF37] font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{tour.destinations.join(' • ')}</span>
          </div>

          {/* Tour Title */}
          <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-stone-900 dark:text-white group-hover:text-amber-600 dark:text-[#D4AF37] transition-colors line-clamp-2 mb-2">
            {tour.title}
          </h3>

          {/* Overview Snippet */}
          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-4">
            {tour.tagline}
          </p>

          {/* Key Highlights Bento Box */}
          <div className="space-y-1.5 bg-stone-50 dark:bg-[#0A0E14] p-3 rounded-2xl border border-stone-200 dark:border-white/5">
            <div className="text-[10px] font-bold text-amber-600 dark:text-[#D4AF37] uppercase tracking-wider mb-1">
              Curated Highlights
            </div>
            {tour.highlights.slice(0, 3).map((hl, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Selector Tabs & Pricing */}
        <div className="pt-2 border-t border-stone-200 dark:border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold">Hotel Tier:</span>
            <span className="text-[11px] text-stone-500">double occupancy</span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-stone-50 dark:bg-[#0A0E14] p-1 rounded-xl border border-stone-200 dark:border-white/5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedTier('classic')}
              className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                selectedTier === 'classic'
                  ? 'bg-stone-100 dark:bg-[#212936] text-white font-bold shadow-xs border border-stone-200 dark:border-white/10'
                  : 'text-stone-500 dark:text-stone-400 hover:text-white'
              }`}
            >
              Classic 4★
            </button>
            <button
              type="button"
              onClick={() => setSelectedTier('comfort')}
              className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                selectedTier === 'comfort'
                  ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] font-bold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-white'
              }`}
            >
              Comfort Cave
            </button>
            <button
              type="button"
              onClick={() => setSelectedTier('luxury')}
              className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                selectedTier === 'luxury'
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-white'
              }`}
            >
              Luxury Sultan
            </button>
          </div>

          {/* Pricing & CTA Row */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">Starting from</div>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-[#D4AF37] font-serif-luxury">
                {formatPrice(currentPrice, activeCurrency)}
                <span className="text-xs font-normal text-stone-500 dark:text-stone-400 ml-1">/ pax</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id={`view-itinerary-${tour.id}`}
                onClick={() => onSelectTour(tour)}
                className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-[#212936] hover:bg-[#2c3647] text-stone-800 dark:text-stone-200 text-xs font-bold transition-all cursor-pointer border border-stone-200 dark:border-white/5"
              >
                Itinerary
              </button>

              <button
                type="button"
                id={`inquire-tour-${tour.id}`}
                onClick={() => onQuickInquiry(tour)}
                className="px-4 py-2 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
              >
                <span>Inquire</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

