import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Sun, 
  Wine, 
  Award, 
  Check, 
  HelpCircle, 
  Plane,
  ChevronRight
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface BalloonGuideSectionProps {
  activeCurrency: CurrencyCode;
  onOpenInquiry: (tourTitle?: string) => void;
}

export const BalloonGuideSection: React.FC<BalloonGuideSectionProps> = ({
  activeCurrency,
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'safety' | 'baskets'>('timeline');

  const balloonTimeline = [
    {
      time: '04:45 – 05:30 AM',
      title: 'VIP Cave Hotel Pickup & Light Breakfast',
      desc: 'Your private Mercedes transfers you to the launch lounge. Enjoy warm Turkish pastries, freshly brewed coffee, and tea while flight pilots analyze real-time wind and atmospheric readings with civil aviation.',
    },
    {
      time: '05:45 – 06:15 AM',
      title: 'Inflation & Safety Briefing at Launch Field',
      desc: 'Watch massive hot air balloons inflate under giant hot-air burners against the twilight sky. Your licensed chief flight captain delivers a comprehensive passenger safety briefing.',
    },
    {
      time: '06:15 – 07:15 AM',
      title: 'Sunrise Flight Over Fairy Chimneys & Valleys',
      desc: 'Ascend gently between 1,000 and 3,000 feet as the dawn sun bathes Love Valley, Pigeon Valley, and Uchisar Castle in glowing amber hues. Drift within feet of surreal volcanic rock formations.',
    },
    {
      time: '07:15 – 07:45 AM',
      title: 'Traditional Champagne Landing Celebration',
      desc: 'Celebrate your safe landing with a 240-year-old hot air ballooning tradition: popping chilled champagne (or sparkling juice) and receiving your personalized commemorative flight medal & certificate.',
    },
    {
      time: '08:15 AM',
      title: 'Return to Hotel in Time for Full Turkish Breakfast',
      desc: 'Return to your luxury cave hotel terrace in time to savor a leisurely traditional Turkish breakfast (Kahvaltı) while other balloons finish their descent.',
    },
  ];

  return (
    <section id="balloons" className="py-16 md:py-24 bg-white dark:bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>The World’s #1 Bucket-List Adventure</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Cappadocia Sunrise Hot Air Ballooning
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Everything you need to know about flying over Cappadocia’s fairy chimneys with our licensed partner pilots, guaranteed slot allocations, and 100% weather safety refund protection.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-700'
              }`}
            >
              Sunrise Flight Timeline
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'safety'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-700'
              }`}
            >
              100% Weather Refund Guarantee
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('baskets')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'baskets'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-700'
              }`}
            >
              Basket Sizes & Options
            </button>
          </div>
        </div>

        {/* TAB CONTENT 1: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              {balloonTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/80 border border-stone-200 dark:border-stone-800 p-4 rounded-xl flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{item.time}</div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">{item.title}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=85"
                alt="Cappadocia sunrise hot air balloons floating over fairy chimneys"
                className="w-full h-full object-cover min-h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-stone-900/90 backdrop-blur-md p-4 rounded-xl border border-stone-300 dark:border-stone-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Signature Guarantee</div>
                    <div className="text-sm font-bold text-stone-900 dark:text-white">All flights include Civil Aviation Insurance & Champagne Toast</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry('Cappadocia Sunrise Hot Air Balloon Flight')}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shrink-0 cursor-pointer"
                  >
                    Reserve Flight
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: WEATHER REFUND GUARANTEE */}
        {activeTab === 'safety' && (
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                  100% Civil Aviation Weather Cancellation & Full Refund Policy
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">Zero financial risk for Signature Turkey Tours guests</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              In Cappadocia, passenger safety is paramount. The Turkish Directorate General of Civil Aviation (SHGM) operates a dedicated radar & wind monitoring station in Göreme. Every morning at 05:00 AM, they issue a green flag (safe to fly) or red flag (grounded due to high wind speed or heavy fog).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">1. Priority Rebooking for Morning #2</div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  If the flight is cancelled on your first morning in Cappadocia, our operations team immediately transfers your reservation to the subsequent morning with top priority.
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-1">2. 100% Immediate Full Refund</div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  If inclement weather persists during your entire stay and prevents taking off, you will receive an immediate 100% full refund for the balloon flight with zero cancellation fees.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: BASKET SIZES */}
        {activeTab === 'baskets' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Standard Comfort Basket */}
            <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Standard Small-Group</div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white font-serif-luxury">Comfort Basket (16–20 Pax)</h4>
                <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-serif-luxury mt-2">
                  {formatPrice(280, activeCurrency)} <span className="text-xs text-stone-500 dark:text-stone-400 font-normal">/ person</span>
                </div>
                <ul className="text-xs text-stone-500 dark:text-stone-400 space-y-2 mt-4">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 60-Minute sunrise flight</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 4 Compartment basket (spacious)</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Champagne landing celebration</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> VIP cave hotel transfers</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Cappadocia Comfort Basket Balloon')}
                className="w-full mt-6 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Inquire Comfort
              </button>
            </div>

            {/* Deluxe Small Basket */}
            <div className="bg-white dark:bg-stone-950 border-2 border-amber-500 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">Deluxe Intimate</div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white font-serif-luxury">Deluxe Basket (10–12 Pax)</h4>
                <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-serif-luxury mt-2">
                  {formatPrice(340, activeCurrency)} <span className="text-xs text-stone-500 dark:text-stone-400 font-normal">/ person</span>
                </div>
                <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2 mt-4">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 65–75 Minute sunrise flight</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Maximum 2-3 guests per compartment</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Unobstructed 360° photo vantage</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Premium champagne + souvenir medal</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Cappadocia Deluxe Intimate Balloon')}
                className="w-full mt-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Inquire Deluxe
              </button>
            </div>

            {/* Private VIP Basket */}
            <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Exclusive VIP</div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white font-serif-luxury">Private Charter (2–4 Pax)</h4>
                <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-serif-luxury mt-2">
                  {formatPrice(1800, activeCurrency)} <span className="text-xs text-stone-500 dark:text-stone-400 font-normal">/ flight</span>
                </div>
                <ul className="text-xs text-stone-500 dark:text-stone-400 space-y-2 mt-4">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Entire balloon exclusive to your party</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Ideal for proposals, honeymoon & anniversary</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Moët & Chandon champagne & strawberries</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Private Mercedes-Maybach transfer</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Cappadocia Private VIP Balloon Charter')}
                className="w-full mt-6 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Inquire Private VIP
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
