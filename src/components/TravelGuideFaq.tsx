import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Sun, 
  ShieldCheck, 
  Sparkles,
  Plane,
  CheckCircle2
} from 'lucide-react';
import { FAQS_DATA } from '../data/faqsData';

export const TravelGuideFaq: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedNationality, setSelectedNationality] = useState<string>('USA');

  const categories = ['All', 'Booking & Tiers', 'Cappadocia Ballooning', 'Visas & Logistics', 'Dining & Culture'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS_DATA
    : FAQS_DATA.filter((f) => f.category === activeCategory);

  const visaInfoMap: Record<string, { status: string; details: string; duration: string }> = {
    USA: {
      status: 'Visa-Free Entry (Effective Jan 2024)',
      details: 'US passport holders can enter Turkey without an e-Visa for tourist stays up to 90 days in any 180-day period. Passport must have at least 6 months validity.',
      duration: '90 Days Visa-Free',
    },
    UK: {
      status: 'Visa-Free Entry',
      details: 'British citizens can enter Turkey visa-free for tourism purposes up to 90 days in any 180-day period.',
      duration: '90 Days Visa-Free',
    },
    Canada: {
      status: 'Visa-Free Entry (Effective Jan 2024)',
      details: 'Canadian passport holders enjoy 90 days visa-free tourism entry without needing an e-Visa.',
      duration: '90 Days Visa-Free',
    },
    EU: {
      status: 'Visa-Free Entry',
      details: 'Citizens of European Union member countries (Germany, France, Italy, Spain, Netherlands, etc.) enter visa-free for up to 90 days.',
      duration: '90 Days Visa-Free',
    },
    Australia: {
      status: 'Electronic Visa (e-Visa) Required',
      details: 'Australian citizens can easily apply online for an official Turkish e-Visa at evisa.gov.tr prior to arrival ($60 USD). Quick 3-minute approval.',
      duration: '90 Days Multiple Entry',
    },
  };

  const currentVisa = visaInfoMap[selectedNationality] || visaInfoMap['USA'];

  return (
    <section id="guide" className="py-16 md:py-24 bg-white dark:bg-stone-900 text-stone-900 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Essential Travel Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Turkey Travel Guide & FAQs
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Everything you need to prepare for a seamless private vacation in Turkey: visa regulations, best seasons to visit, what to pack, and tour policies.
          </p>
        </div>

        {/* 2-Column Grid: Visa Checker & Packing on Left, FAQs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Quick Visa Checker & Packing Guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Visa Checker Widget */}
            <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">
                <Plane className="w-4 h-4" />
                <span>Instant Turkey Visa Requirement Checker</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-stone-500 dark:text-stone-400 block mb-1.5 font-medium">
                    Select Your Passport / Nationality:
                  </label>
                  <select
                    value={selectedNationality}
                    onChange={(e) => setSelectedNationality(e.target.value)}
                    className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="USA">United States (USA)</option>
                    <option value="UK">United Kingdom (UK)</option>
                    <option value="Canada">Canada</option>
                    <option value="EU">European Union (EU)</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div className="bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 dark:text-white">{currentVisa.status}</span>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800">
                      {currentVisa.duration}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {currentVisa.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Packing & Seasonality Card */}
            <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
                <Sun className="w-4 h-4" />
                <span>Best Times to Visit & Packing</span>
              </div>

              <div className="space-y-3 text-stone-600 dark:text-stone-300">
                <div>
                  <strong className="text-stone-900 dark:text-white block mb-0.5">Spring (April – June) & Autumn (Sept – Nov):</strong>
                  <span>Ideal weather (20°C–26°C / 68°F–78°F). Perfect for walking ancient ruins, ballooning, and Bosphorus cruises.</span>
                </div>

                <div>
                  <strong className="text-stone-900 dark:text-white block mb-0.5">Summer (July – August):</strong>
                  <span>Sun-drenched Mediterranean sailing in Bodrum/Gocek; warm in central Anatolia with vibrant evening life.</span>
                </div>

                <div>
                  <strong className="text-stone-900 dark:text-white block mb-0.5">What to Pack:</strong>
                  <span>Comfortable walking shoes with grip for marble ruins, lightweight layers, sun protection, and slip-on shoes for mosque entries.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Category Filter & FAQs Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-white dark:bg-stone-950 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 text-sm font-bold shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-900 mt-1 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
