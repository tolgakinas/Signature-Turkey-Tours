import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Star, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Plane, 
  Car, 
  Users, 
  Coffee, 
  Utensils, 
  Clock, 
  ChevronRight, 
  Download, 
  Phone,
  HelpCircle,
  Award
} from 'lucide-react';
import { TourPackage, CurrencyCode, AccommodationTierType } from '../types';
import { formatPrice } from '../utils/currency';

interface TourDetailModalProps {
  tour: TourPackage | null;
  activeCurrency: CurrencyCode;
  onClose: () => void;
  onOpenInquiry: (tourTitle: string, tier: AccommodationTierType, travelers: number) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  activeCurrency,
  onClose,
  onOpenInquiry,
}) => {
  if (!tour) return null;

  const [selectedTier, setSelectedTier] = useState<AccommodationTierType>('comfort');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'hotels' | 'inclusions' | 'pricing'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Group discount calculation (5% for 4-5 pax, 10% for 6-8 pax, 15% for 9+)
  let discountPercentage = 0;
  if (travelersCount >= 9) discountPercentage = 15;
  else if (travelersCount >= 6) discountPercentage = 10;
  else if (travelersCount >= 4) discountPercentage = 5;

  const basePriceUSD = tour.pricePerPersonUSD[selectedTier];
  const discountedPriceUSD = Math.round(basePriceUSD * (1 - discountPercentage / 100));
  const totalPriceUSD = discountedPriceUSD * travelersCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
        {/* Modal Container */}
        <div className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-[#FDFCF8] w-full max-w-5xl rounded-3xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]">
          {/* Modal Header */}
          <div className="relative bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-white p-5 sm:p-6 shrink-0 border-b border-stone-200 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white transition-colors cursor-pointer border border-stone-200 dark:border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14]">
                  {tour.durationDays} Days / {tour.durationNights} Nights Private Tour
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-amber-600 dark:text-[#D4AF37]" />
                  <span>{tour.ratings.score} ({tour.ratings.reviewCount} reviews)</span>
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400">&bull; 100% Tailor-Made & Flexible</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                {tour.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                {tour.tagline}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 sm:gap-4 mt-6 overflow-x-auto border-t border-stone-200 dark:border-white/10 pt-3 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('itinerary')}
                className={`pb-1 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'itinerary'
                    ? 'border-amber-600 dark:border-[#D4AF37] text-amber-600 dark:text-[#D4AF37] font-bold'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:text-stone-200'
                }`}
              >
                Day-by-Day Itinerary ({tour.itinerary.length} Days)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hotels')}
                className={`pb-1 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'hotels'
                    ? 'border-amber-600 dark:border-[#D4AF37] text-amber-600 dark:text-[#D4AF37] font-bold'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:text-stone-200'
                }`}
              >
                Hotel & Tier Options
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inclusions')}
                className={`pb-1 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'inclusions'
                    ? 'border-amber-600 dark:border-[#D4AF37] text-amber-600 dark:text-[#D4AF37] font-bold'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:text-stone-200'
                }`}
              >
                What's Included & Excluded
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pricing')}
                className={`pb-1 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'border-amber-600 dark:border-[#D4AF37] text-amber-600 dark:text-[#D4AF37] font-bold'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:text-stone-200'
                }`}
              >
                Transparent Pricing & Calculator
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-stone-50 dark:bg-[#0A0E14] space-y-6">
            {/* TAB 1: ITINERARY */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-[#161C24] p-4 rounded-2xl border border-stone-200 dark:border-white/5 text-xs">
                  <div>
                    <div className="text-stone-500 dark:text-stone-400 font-medium">Starting City</div>
                    <div className="font-bold text-stone-900 dark:text-white mt-0.5">{tour.startingCity}</div>
                  </div>
                  <div>
                    <div className="text-stone-500 dark:text-stone-400 font-medium">Ending City</div>
                    <div className="font-bold text-stone-900 dark:text-white mt-0.5">{tour.endingCity}</div>
                  </div>
                  <div>
                    <div className="text-stone-500 dark:text-stone-400 font-medium">Physical Rating</div>
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{tour.physicalRating}</div>
                  </div>
                  <div>
                    <div className="text-stone-500 dark:text-stone-400 font-medium">Best Season</div>
                    <div className="font-bold text-amber-600 dark:text-[#D4AF37] mt-0.5">{tour.recommendedSeason}</div>
                  </div>
                </div>

                {/* Day-by-Day Accordion / Timeline */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-stone-900 dark:text-white flex items-center justify-between">
                    <span>Detailed Day-by-Day Timeline</span>
                    <span className="text-xs font-normal text-stone-500 dark:text-stone-400">Click any day to expand</span>
                  </h3>

                  <div className="space-y-3">
                    {tour.itinerary.map((day) => {
                      const isExpanded = expandedDay === day.day;
                      return (
                        <div
                          key={day.day}
                          className="bg-white dark:bg-[#161C24] rounded-2xl border border-stone-200 dark:border-white/5 overflow-hidden transition-all"
                        >
                          {/* Day Header Trigger */}
                          <button
                            type="button"
                            onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                            className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                                D{day.day}
                              </div>
                              <div>
                                <div className="text-xs text-amber-600 dark:text-[#D4AF37] font-semibold uppercase tracking-wider">
                                  {day.location}
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-white">
                                  {day.title}
                                </h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-[#0A0E14] px-2.5 py-1 rounded-lg border border-stone-200 dark:border-white/5">
                                <Utensils className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                                <span>Meals: {day.includedMeals.join(', ')}</span>
                              </div>
                              <span className="text-stone-500 dark:text-stone-400 font-bold text-sm">
                                {isExpanded ? '−' : '+'}
                              </span>
                            </div>
                          </button>

                          {/* Day Detailed Content */}
                          {isExpanded && (
                            <div className="p-4 pt-1 border-t border-stone-200 dark:border-white/5 space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-[#0A0E14]/60">
                              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                                {day.description}
                              </p>

                              {/* Morning / Afternoon / Evening Timeline */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white dark:bg-[#161C24] p-3.5 rounded-xl border border-stone-200 dark:border-white/5">
                                <div className="space-y-1">
                                  <div className="font-bold text-amber-600 dark:text-[#D4AF37] text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-amber-600 dark:text-[#D4AF37]" />
                                    <span>Morning</span>
                                  </div>
                                  <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">{day.morning}</p>
                                </div>

                                <div className="space-y-1 border-t md:border-t-0 md:border-l border-stone-200 dark:border-white/10 pt-2 md:pt-0 md:pl-3">
                                  <div className="font-bold text-amber-600 dark:text-[#D4AF37] text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-amber-600 dark:text-[#D4AF37]" />
                                    <span>Afternoon</span>
                                  </div>
                                  <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">{day.afternoon}</p>
                                </div>

                                <div className="space-y-1 border-t md:border-t-0 md:border-l border-stone-200 dark:border-white/10 pt-2 md:pt-0 md:pl-3">
                                  <div className="font-bold text-amber-600 dark:text-[#D4AF37] text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-amber-600 dark:text-[#D4AF37]" />
                                    <span>Evening</span>
                                  </div>
                                  <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">{day.evening}</p>
                                </div>
                              </div>

                              {/* Insider Tip if present */}
                              {day.insiderTip && (
                                <div className="bg-amber-500 dark:bg-[#D4AF37]/10 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-200 p-3 rounded-xl flex items-start gap-2 text-xs">
                                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-[#D4AF37] shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold text-amber-600 dark:text-[#D4AF37]">Signature Insider Tip: </span>
                                    <span>{day.insiderTip}</span>
                                  </div>
                                </div>
                              )}

                              {/* Hotel for this night */}
                              <div className="text-xs text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2 pt-1">
                                <span className="font-semibold text-stone-900 dark:text-white">Night Accommodations:</span>
                                <span className="bg-white dark:bg-[#161C24] px-2.5 py-1 rounded-lg text-amber-600 dark:text-[#D4AF37] border border-stone-200 dark:border-white/5">
                                  {selectedTier === 'classic' && day.recommendedHotel.classic}
                                  {selectedTier === 'comfort' && day.recommendedHotel.comfort}
                                  {selectedTier === 'luxury' && day.recommendedHotel.luxury}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HOTELS & TIERS */}
            {activeTab === 'hotels' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#161C24] p-5 rounded-2xl border border-stone-200 dark:border-white/5">
                  <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-stone-900 dark:text-white mb-2">
                    Hand-Selected Turkish Accommodations
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-6 font-light">
                    We inspect and select each property based on historical character, breathtaking views, pristine cleanliness, and world-renowned Turkish hospitality. Choose your preferred accommodation level:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Classic Tier Card */}
                    <div
                      onClick={() => setSelectedTier('classic')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedTier === 'classic'
                          ? 'border-amber-600 dark:border-[#D4AF37] bg-stone-100 dark:bg-[#212936] shadow-lg'
                          : 'border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-[#0A0E14] hover:border-stone-200 dark:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Classic Tier</span>
                        <span className="text-sm font-bold text-stone-900 dark:text-white">{formatPrice(tour.pricePerPersonUSD.classic, activeCurrency)} /pax</span>
                      </div>
                      <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2">4-Star Boutique Heritage</h4>
                      <ul className="text-xs text-stone-500 dark:text-stone-400 space-y-1.5 list-disc list-inside">
                        <li>Sirkeci Mansion & White House Hotel (Istanbul)</li>
                        <li>Dere Suites Stone & Cave Hotel (Cappadocia)</li>
                        <li>Pam Thermal Hotel & Spa (Pamukkale)</li>
                        <li>Ilayda Avantgarde (Kusadasi Aegean)</li>
                      </ul>
                    </div>

                    {/* Comfort Tier Card */}
                    <div
                      onClick={() => setSelectedTier('comfort')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedTier === 'comfort'
                          ? 'border-amber-600 dark:border-[#D4AF37] bg-amber-500 dark:bg-[#D4AF37]/15 shadow-lg'
                          : 'border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-[#0A0E14] hover:border-stone-200 dark:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-[#D4AF37]">Comfort Tier (Most Popular)</span>
                        <span className="text-sm font-bold text-amber-600 dark:text-[#D4AF37]">{formatPrice(tour.pricePerPersonUSD.comfort, activeCurrency)} /pax</span>
                      </div>
                      <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2">Superior Boutique & Cave Suites</h4>
                      <ul className="text-xs text-stone-500 dark:text-stone-400 space-y-1.5 list-disc list-inside">
                        <li>Ajwa Sultanahmet & Celine Hotel (Istanbul)</li>
                        <li>Kayakapı Premium Caves or Argos (Cappadocia)</li>
                        <li>Doga Thermal Health Boutique Spa (Pamukkale)</li>
                        <li>Korumar Ephesus Beach & Spa Resort (Aegean)</li>
                      </ul>
                    </div>

                    {/* Luxury Tier Card */}
                    <div
                      onClick={() => setSelectedTier('luxury')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedTier === 'luxury'
                          ? 'border-amber-500 bg-amber-950/40 text-white shadow-lg'
                          : 'border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-[#0A0E14] hover:border-stone-200 dark:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${selectedTier === 'luxury' ? 'text-amber-600 dark:text-amber-400' : 'text-stone-500 dark:text-stone-400'}`}>Luxury Sultan Tier</span>
                        <span className={`text-sm font-bold ${selectedTier === 'luxury' ? 'text-amber-700 dark:text-amber-300' : 'text-stone-900 dark:text-white'}`}>{formatPrice(tour.pricePerPersonUSD.luxury, activeCurrency)} /pax</span>
                      </div>
                      <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2">Ottoman Palaces & Master Cave Suites</h4>
                      <ul className="text-xs space-y-1.5 list-disc list-inside text-stone-500 dark:text-stone-400">
                        <li>Four Seasons Sultanahmet / Çırağan Palace Kempinski</li>
                        <li>Museum Hotel Relais & Châteaux (Cappadocia)</li>
                        <li>Richmond Pamukkale Thermal Spa Resort</li>
                        <li>Six Senses Kaplankaya / Luxury Villa</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included Checklist */}
                <div className="bg-white dark:bg-[#161C24] p-5 rounded-2xl border border-emerald-500/20">
                  <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-2 mb-4">
                    <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>Everything Included In Your Private Tour</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                    {tour.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded Checklist */}
                <div className="bg-white dark:bg-[#161C24] p-5 rounded-2xl border border-stone-200 dark:border-white/10">
                  <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide flex items-center gap-2 mb-4">
                    <HelpCircle className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                    <span>What Is Excluded (Clear & Transparent)</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    {tour.excluded.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-white/10 text-stone-600 dark:text-stone-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 bg-stone-50 dark:bg-[#0A0E14] p-3 rounded-xl border border-stone-200 dark:border-white/5 text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-bold text-amber-600 dark:text-[#D4AF37]">Note: </span>
                    We can seamlessly arrange the Cappadocia Sunrise Hot Air Balloon Flight add-on with 100% weather safety refund guarantee.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PRICING CALCULATOR */}
            {activeTab === 'pricing' && (
              <div className="bg-white dark:bg-[#161C24] p-5 rounded-2xl border border-stone-200 dark:border-white/5 space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-stone-900 dark:text-white mb-1">
                    Transparent Pricing & Group Discount Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    Our private tours are priced transparently per person based on double occupancy. Private groups of 4 or more travelers enjoy exclusive group discounts:
                  </p>
                </div>

                {/* Number of Travelers Selector */}
                <div className="bg-stone-50 dark:bg-[#0A0E14] p-4 rounded-2xl border border-stone-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white">Number of Travelers in Your Party</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">Private vehicle & guide exclusively for your group</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {[2, 3, 4, 6, 8, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTravelersCount(num)}
                        className={`w-9 h-9 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          travelersCount === num
                            ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                            : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-amber-600 dark:border-[#D4AF37]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Cost Breakdown Card */}
                <div className="bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-white p-5 rounded-2xl border border-stone-200 dark:border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-white/10 pb-3">
                    <div>
                      <div className="text-xs text-amber-600 dark:text-[#D4AF37] font-semibold uppercase tracking-wider">
                        Selected Tier: {selectedTier.toUpperCase()}
                      </div>
                      <div className="text-sm text-stone-600 dark:text-stone-300">
                        For {travelersCount} Travelers ({tour.durationDays} Days / {tour.durationNights} Nights)
                      </div>
                    </div>

                    {discountPercentage > 0 && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                        {discountPercentage}% Private Group Discount Applied!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">Price Per Person:</div>
                      <div className="text-2xl font-extrabold text-amber-600 dark:text-[#D4AF37] font-serif-luxury">
                        {formatPrice(discountedPriceUSD, activeCurrency)}
                      </div>
                      {discountPercentage > 0 && (
                        <div className="text-xs text-stone-500 line-through">
                          Standard: {formatPrice(basePriceUSD, activeCurrency)}
                        </div>
                      )}
                    </div>

                    <div className="sm:text-right">
                      <div className="text-xs text-stone-500 dark:text-stone-400">Total Group Quotation:</div>
                      <div className="text-2xl font-extrabold text-stone-900 dark:text-white font-serif-luxury">
                        {formatPrice(totalPriceUSD, activeCurrency)}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">
                        All internal flights, private Mercedes, guide, meals & hotels included
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Sticky Bottom Action Bar */}
          <div className="bg-stone-50 dark:bg-[#0A0E14] p-4 sm:p-5 border-t border-stone-200 dark:border-white/10 shrink-0 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">
                Estimated Total for {travelersCount} Travelers ({selectedTier.toUpperCase()} Tier)
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-[#D4AF37] font-serif-luxury">
                {formatPrice(discountedPriceUSD, activeCurrency)}
                <span className="text-xs font-normal text-stone-500 dark:text-stone-400 ml-1">/ person</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/905448362845?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20for%20${travelersCount}%20people.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-950/30 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>

              <button
                type="button"
                id="modal-inquire-btn"
                onClick={() => {
                  onClose();
                  onOpenInquiry(tour.title, selectedTier, travelersCount);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Tailored Quote (Free)</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
