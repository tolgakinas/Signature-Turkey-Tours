import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Compass, 
  Users, 
  Check, 
  Send, 
  Loader2, 
  Clock, 
  Utensils, 
  Plane, 
  Car, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  FileText
} from 'lucide-react';
import { CurrencyCode, AccommodationTierType, AICustomItineraryResult } from '../types';
import { formatPrice } from '../utils/currency';
import confetti from 'canvas-confetti';

interface CustomItineraryBuilderProps {
  activeCurrency: CurrencyCode;
  onOpenInquiryWithCustomPlan: (customPlan: AICustomItineraryResult, tier: AccommodationTierType, travelers: number) => void;
}

export const CustomItineraryBuilder: React.FC<CustomItineraryBuilderProps> = ({
  activeCurrency,
  onOpenInquiryWithCustomPlan,
}) => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Istanbul',
    'Cappadocia',
    'Ephesus',
    'Pamukkale',
  ]);
  const [durationDays, setDurationDays] = useState<number>(10);
  const [travelStyle, setTravelStyle] = useState<AccommodationTierType>('comfort');
  const [month, setMonth] = useState<string>('May (Spring Flowers)');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [pace, setPace] = useState<string>('Moderate & Balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Sunrise Hot Air Ballooning',
    'Private Bosphorus Yacht',
    'Authentic Culinary & Wine',
  ]);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<AICustomItineraryResult | null>(null);

  const availableDestinations = [
    'Istanbul',
    'Cappadocia',
    'Ephesus & Sirince',
    'Pamukkale & Hierapolis',
    'Antalya & Mediterranean',
    'Bodrum & Turquoise Coast',
    'Göbeklitepe & Gaziantep',
    'Gallipoli & Troy',
    'Black Sea (Trabzon & Sumela)',
  ];

  const availableInterests = [
    'Sunrise Hot Air Ballooning',
    'Private Bosphorus Yacht',
    'Authentic Culinary & Wine',
    'Archaeology & Ancient Ruins',
    'Turkish Bath / Hammam Spa',
    'Whirling Dervishes Ceremony',
    'Pottery & Ceramic Workshops',
    'Hiking & Natural Canyons',
    'Photography & Golden Hour Spots',
  ];

  const toggleDestination = (dest: string) => {
    if (selectedDestinations.includes(dest)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations: selectedDestinations,
          durationDays,
          travelStyle,
          month,
          travelersCount,
          interests: selectedInterests,
          pace,
          specialRequests,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setGeneratedPlan(json.data);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } else {
        setError('Could not generate custom plan. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom-planner" className="py-16 md:py-24 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>AI-Powered Tailor-Made Turkey Travel Specialist</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Design Your Bespoke Turkish Itinerary
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Customize your dream journey across Turkey in seconds. Our AI Travel Curator, trained on hundreds of 5-star private itineraries, designs your personalized day-by-day plan with transparent cost estimates.
          </p>
        </div>

        {/* Builder Layout: Input Form on Left, Generated Plan on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Parameters Form */}
          <div className="lg:col-span-5 bg-stone-950/90 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
            <form onSubmit={handleGenerateItinerary} className="space-y-5">
              {/* Destinations Multi-Select */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2 flex items-center justify-between">
                  <span>1. Choose Destinations ({selectedDestinations.length} selected)</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableDestinations.map((dest) => {
                    const isSelected = selectedDestinations.includes(dest);
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => toggleDestination(dest)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-stone-950" />}
                        <span>{dest}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration & Month Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2">
                    2. Duration (Days)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={3}
                      max={21}
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full accent-amber-400 bg-stone-100 dark:bg-stone-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-300 bg-white dark:bg-stone-900 px-2 py-1 rounded border border-stone-200 dark:border-stone-800 min-w-[3.5rem] text-center">
                      {durationDays}d
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2">
                    3. Travel Season / Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="April - May (Spring Flowers)">April – May (Spring)</option>
                    <option value="June - August (Summer & Riviera)">June – August (Summer)</option>
                    <option value="September - October (Autumn Golden)">September – October (Autumn)</option>
                    <option value="November - March (Winter Fairy-tale)">November – March (Winter)</option>
                  </select>
                </div>
              </div>

              {/* Travel Style / Hotel Tier */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2">
                  4. Accommodation Tier & Travel Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTravelStyle('classic')}
                    className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                      travelStyle === 'classic'
                        ? 'border-amber-400 bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Classic</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">4★ Boutique</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTravelStyle('comfort')}
                    className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                      travelStyle === 'comfort'
                        ? 'border-amber-400 bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Comfort</div>
                    <div className="text-[10px] text-amber-400/80">Deluxe Cave Suite</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTravelStyle('luxury')}
                    className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                      travelStyle === 'luxury'
                        ? 'border-amber-400 bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Luxury Sultan</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">Palace & Relais</div>
                  </button>
                </div>
              </div>

              {/* Number of Travelers & Pace */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2">
                    5. Party Size
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value={1}>1 Traveler (Solo)</option>
                    <option value={2}>2 Travelers (Couple / Friends)</option>
                    <option value={3}>3 Travelers</option>
                    <option value={4}>4 Travelers (5% Group Discount)</option>
                    <option value={6}>6 Travelers (10% Group Discount)</option>
                    <option value={8}>8+ Travelers (15% Group Discount)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2">
                    6. Travel Pace
                  </label>
                  <select
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Relaxed & Spacious">Relaxed (Ample free time)</option>
                    <option value="Moderate & Balanced">Moderate (Balanced)</option>
                    <option value="Active & Comprehensive">Active (See everything)</option>
                  </select>
                </div>
              </div>

              {/* Special Experiences Multi-Select */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-2">
                  7. Special Interests & Bucket-List Experiences
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableInterests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/50'
                            : 'bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider block mb-1">
                  8. Any Dietary or Special Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian dining, celebrating 25th anniversary, ground floor room"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit / Generate Button */}
              <button
                type="submit"
                id="generate-ai-itinerary-btn"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Curating Your Turkey Journey with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom Itinerary Now</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Generated Itinerary Output Display */}
          <div className="lg:col-span-7 bg-stone-950/90 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xl">
            {error && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs mb-4">
                {error}
              </div>
            )}

            {!generatedPlan && !loading && (
              <div className="py-16 text-center text-stone-500 dark:text-stone-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-stone-800 dark:text-stone-200">
                  Your Bespoke Turkey Tour Will Appear Here
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                  Select your preferred destinations, travel style, and interests on the left, then click <strong className="text-amber-700 dark:text-amber-300">Generate Custom Itinerary Now</strong> to build a personalized private journey.
                </p>
              </div>
            )}

            {loading && (
              <div className="py-20 text-center text-stone-600 dark:text-stone-300 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-amber-600 dark:text-amber-400 mx-auto" />
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif-luxury">
                  AI Travel Specialist Is Curating Your Turkey Itinerary...
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                  Calculating optimal flight routes, matching boutique cave suites, and organizing private Mercedes transfers...
                </p>
              </div>
            )}

            {generatedPlan && !loading && (
              <div className="space-y-6">
                {/* Result Header */}
                <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950">
                      Bespoke Tailor-Made Proposal
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      Season: {generatedPlan.recommendedMonths}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-amber-200">
                    {generatedPlan.tourTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 italic">
                    {generatedPlan.tagline}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-3 leading-relaxed">
                    {generatedPlan.summary}
                  </p>
                </div>

                {/* Pricing Estimate Card */}
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className={`p-2.5 rounded-lg border ${travelStyle === 'classic' ? 'bg-amber-500/10 border-amber-400 text-amber-700 dark:text-amber-300' : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400'}`}>
                    <div className="text-[10px] uppercase font-bold tracking-wider">Classic 4★</div>
                    <div className="text-base font-bold text-stone-900 dark:text-white mt-1">
                      {formatPrice(generatedPlan.estimatedPriceUSD.classic, activeCurrency)}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">/ person</div>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${travelStyle === 'comfort' ? 'bg-amber-500/20 border-amber-400 text-amber-700 dark:text-amber-300 font-bold' : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400'}`}>
                    <div className="text-[10px] uppercase font-bold tracking-wider">Comfort Cave Suite</div>
                    <div className="text-base font-bold text-amber-700 dark:text-amber-300 mt-1">
                      {formatPrice(generatedPlan.estimatedPriceUSD.comfort, activeCurrency)}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">/ person</div>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${travelStyle === 'luxury' ? 'bg-amber-500/10 border-amber-400 text-amber-700 dark:text-amber-300' : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400'}`}>
                    <div className="text-[10px] uppercase font-bold tracking-wider">Luxury Sultan</div>
                    <div className="text-base font-bold text-stone-900 dark:text-white mt-1">
                      {formatPrice(generatedPlan.estimatedPriceUSD.luxury, activeCurrency)}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">/ person</div>
                  </div>
                </div>

                {/* Key Experiences List */}
                <div className="bg-white dark:bg-stone-900/60 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                    Key Custom Inclusions:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300">
                    {generatedPlan.highlightExperiences.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day-by-Day Timeline */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  <div className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
                    Day-by-Day Breakdown ({generatedPlan.itineraryDays.length} Days):
                  </div>

                  {generatedPlan.itineraryDays.map((day) => (
                    <div key={day.day} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3.5 rounded-xl text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs shrink-0">
                            D{day.day}
                          </span>
                          <span className="font-bold text-stone-800 dark:text-stone-200">{day.location}: {day.title}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                          {day.includedMeals?.join(', ') || 'Breakfast'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-500 dark:text-stone-400 pt-1 border-t border-stone-200 dark:border-stone-800">
                        <div><strong className="text-stone-600 dark:text-stone-300">Morning:</strong> {day.morning}</div>
                        <div><strong className="text-stone-600 dark:text-stone-300">Afternoon:</strong> {day.afternoon}</div>
                        <div><strong className="text-stone-600 dark:text-stone-300">Evening:</strong> {day.evening}</div>
                      </div>

                      {day.insiderTip && (
                        <div className="text-[11px] text-amber-300/90 pt-1">
                          <strong>Tip:</strong> {day.insiderTip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleGenerateItinerary}
                    className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-white px-3 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Regenerate Plan</span>
                  </button>

                  <button
                    type="button"
                    id="book-ai-custom-plan-btn"
                    onClick={() => onOpenInquiryWithCustomPlan(generatedPlan, travelStyle, travelersCount)}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Official Quotation with This Plan</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
