import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Search, 
  Compass, 
  Plane, 
  Clock, 
  Phone,
  MessageSquare,
  Award,
  ChevronRight
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface HeroSectionProps {
  activeCurrency: CurrencyCode;
  onOpenCustomPlanner: () => void;
  onOpenInquiryModal: (tourTitle?: string) => void;
  onQuickFilter: (dest: string, duration: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCurrency,
  onOpenCustomPlanner,
  onOpenInquiryModal,
  onQuickFilter,
}) => {
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickFilter(selectedDestination, selectedDuration);
    const toursElement = document.getElementById('tours');
    if (toursElement) {
      toursElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-[#FDFCF8] py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500 dark:bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 sm:space-y-8">
        {/* Main Bento Grid Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Bento Tile 1: Massive Hero Visual Card (Col-span 12 on mobile, 8 on desktop) */}
          <div className="md:col-span-8 bg-white dark:bg-[#161C24] rounded-3xl overflow-hidden relative border border-stone-200 dark:border-white/10 flex flex-col justify-between min-h-[460px] sm:min-h-[520px] group shadow-2xl">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85"
                alt="Cappadocia Sunrise Hot Air Balloons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-[#0A0E14]/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E14]/80 via-transparent to-transparent" />
            </div>

            {/* Top Badges inside Hero Card */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] text-xs font-extrabold uppercase tracking-wider shadow-lg">
                  Boutique Experience
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-stone-900 dark:text-white text-xs font-semibold border border-stone-200 dark:border-white/15">
                  100% Private Tours
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-50 dark:bg-[#0A0E14]/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 dark:border-white/10 text-xs text-amber-600 dark:text-[#D4AF37] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span>5.0 (450+ Verified Reviews)</span>
              </div>
            </div>

            {/* Bottom Content inside Hero Card */}
            <div className="relative z-10 p-6 sm:p-8 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-amber-600 dark:text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
                <span>TÜRSAB Licensed Operator #15764-A</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif-luxury text-stone-900 dark:text-white tracking-tight leading-[1.1]">
                Sultans, Canyons <br />
                <span className="text-amber-600 dark:text-[#D4AF37] italic">& Sunsets of Turkey</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed max-w-xl">
                Experience gilded Ottoman palaces in Istanbul, fairy-tale Cappadocia cave suites, and the turquoise waters of Bodrum with private scholar historians and VIP Mercedes chauffeurs.
              </p>

              {/* Action Buttons in Hero Tile */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  id="hero-explore-tours-btn"
                  onClick={() => {
                    const el = document.getElementById('tours');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Signature Itineraries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="hero-ai-planner-btn"
                  onClick={onOpenCustomPlanner}
                  className="px-5 py-3 rounded-xl bg-white dark:bg-[#161C24]/80 hover:bg-stone-50 dark:hover:bg-[#161C24] border border-stone-200 dark:border-white/20 text-stone-900 dark:text-[#FDFCF8] font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
                  <span>Design Custom Trip with AI</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column Bento Tiles (Col-span 12 on mobile, 4 on desktop) */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            
            {/* Bento Tile 2: Gold Highlight Card */}
            <div className="bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-50 dark:bg-[#0A0E14]/15 text-stone-900 dark:text-[#0A0E14] text-[10px] font-extrabold uppercase tracking-wider">
                    2026 Peak Season
                  </span>
                  <Sparkles className="w-4 h-4 text-stone-900 dark:text-[#0A0E14]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury leading-tight mb-2">
                  Spring & Autumn Priority Bookings
                </h3>
                <p className="text-xs text-stone-900 dark:text-[#0A0E14]/80 leading-relaxed">
                  Limited private slot allocations for Cappadocia sunrise balloon flights and Bosphorus sunset yachts. 100% weather safety refund guarantee.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#0A0E14]/15 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider">Lock Best Rates</span>
                <button
                  type="button"
                  onClick={() => onOpenInquiryModal('Spring/Autumn Season Priority Booking')}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-50 dark:bg-[#0A0E14] text-amber-600 dark:text-[#D4AF37] font-bold text-xs hover:bg-stone-50 dark:hover:bg-[#161C24] transition-colors cursor-pointer"
                >
                  Check Dates
                </button>
              </div>
            </div>

            {/* Bento Tile 3: Cappadocia Hot Air Balloon Feature Card */}
            <div className="bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl hover:border-amber-600 dark:border-[#D4AF37]/40 transition-all group">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 flex items-center justify-center text-amber-600 dark:text-[#D4AF37] font-bold text-base shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-[#D4AF37] bg-amber-500 dark:bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-amber-600 dark:border-[#D4AF37]/20">
                  World’s #1 Flight
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold font-serif-luxury text-stone-900 dark:text-white mb-1 group-hover:text-amber-600 dark:text-[#D4AF37] transition-colors">
                  Cappadocia Sunrise Balloon
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  60-min sunrise drift over Love Valley, champagne landing ceremony, and civil aviation insurance.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 dark:text-stone-400">From </span>
                  <span className="text-base font-bold text-amber-600 dark:text-[#D4AF37] font-serif-luxury">
                    {formatPrice(280, activeCurrency)}
                  </span>
                  <span className="text-[10px] text-stone-500"> / pax</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('balloons');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:text-[#D4AF37] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Lower Bento Sub-Grid (3 Columns of Sleek Feature Tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Sub-Bento Tile A: Verified Reviews Rating */}
          <div className="bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:border-stone-200 dark:border-white/15 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <span>5.0 / 5.0 Star Rating</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded">Verified</span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                Based on 450+ private family & couple journeys in Turkey.
              </p>
            </div>
          </div>

          {/* Sub-Bento Tile B: Ephesus Private Scholar Guide */}
          <div className="bg-white dark:bg-[#161C24] border border-amber-600 dark:border-[#D4AF37]/20 p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-amber-600 dark:border-[#D4AF37]/40 transition-all">
            <div className="space-y-0.5">
              <div className="text-[10px] text-amber-600 dark:text-[#D4AF37] font-bold uppercase tracking-wider">
                Trending Excursion
              </div>
              <div className="text-sm font-bold text-stone-900 dark:text-white font-serif-luxury">
                Ephesus & Terraced Houses
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                Private Historian &bull; Skip-the-Line
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenInquiryModal('Ephesus Private Scholar Tour')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-[#212936] hover:bg-amber-500 dark:hover:bg-[#D4AF37] hover:text-stone-900 dark:hover:text-[#0A0E14] text-xs font-bold text-stone-800 dark:text-stone-200 transition-all cursor-pointer shrink-0 border border-stone-200 dark:border-white/10"
            >
              Inquire
            </button>
          </div>

          {/* Sub-Bento Tile C: 24/7 WhatsApp VIP Concierge */}
          <div className="bg-[#1A232E] border border-stone-200 dark:border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 dark:text-white">24/7 On-Ground Concierge</div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">+90 544 836 28 45 (WhatsApp)</div>
              </div>
            </div>
            <a
              href="https://wa.me/905448362845?text=Hello%2C%20I%20am%20interested%20in%20a%20private%20tour%20with%20Signature%20Turkey%20Tours"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shrink-0"
            >
              Chat Now
            </a>
          </div>

        </div>

        {/* Bento Quick Tour Finder / Filter Bar Tile */}
        <div className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl">
          <div className="text-xs font-bold text-amber-600 dark:text-[#D4AF37] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
            <span>Interactive Private Tour Finder</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Destination Selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
                <span>Destinations</span>
              </label>
              <select
                id="hero-dest-filter"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37] font-medium"
              >
                <option value="All">All Turkey Destinations</option>
                <option value="Istanbul">Istanbul (Imperial & Bosphorus)</option>
                <option value="Cappadocia">Cappadocia (Cave Suites & Balloon)</option>
                <option value="Ephesus">Ephesus & Aegean Ruins</option>
                <option value="Pamukkale">Pamukkale & Hierapolis</option>
                <option value="Antalya">Antalya & Mediterranean</option>
                <option value="Bodrum">Bodrum & Turquoise Gulet</option>
                <option value="Göbeklitepe">Göbeklitepe & Mesopotamia</option>
              </select>
            </div>

            {/* Duration Selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
                <span>Trip Duration</span>
              </label>
              <select
                id="hero-duration-filter"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37] font-medium"
              >
                <option value="All">Any Duration</option>
                <option value="3-5">3 – 5 Days (Quick Escapes)</option>
                <option value="7-10">7 – 10 Days (Highlights & Classic)</option>
                <option value="12-21">12 – 21 Days (Grand In-Depth Odyssey)</option>
              </select>
            </div>

            {/* Travel Style */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
                <span>Service Guarantee</span>
              </label>
              <div className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 rounded-xl px-3 py-2.5 flex items-center justify-between font-medium">
                <span>Private Guide & Chauffeur</span>
                <span className="text-amber-600 dark:text-[#D4AF37] text-[10px] font-bold">100% Private</span>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                id="hero-search-submit-btn"
                className="w-full bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Itineraries</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
