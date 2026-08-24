import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  BedDouble, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { TIER_COMPARISONS } from '../data/pricingTiers';

export const AccommodationTiersSection: React.FC = () => {
  return (
    <section id="tiers" className="py-16 md:py-24 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <BedDouble className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Curated Turkish Accommodations</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Our 3 Signature Accommodation Tiers
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Every traveler has unique preferences. Whether you prefer charming historical boutiques, restored deluxe cave suites carved into volcanic stone, or opulent Ottoman sultan palaces on the Bosphorus, we have the perfect stay.
          </p>
        </div>

        {/* 3 Tier Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Classic Tier */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="Classic Turkish Boutique Hotel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase">
                Classic 4-Star
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif-luxury text-stone-900 dark:text-white mb-1">
                  Handpicked Boutique Heritage
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                  Charming Ottoman wooden mansions, central Old City boutique hotels, and authentic stone-arched cave rooms with warm Turkish hospitality.
                </p>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2">Featured Properties:</div>
                <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
                  <div>&bull; Sirkeci Mansion & White House (Istanbul)</div>
                  <div>&bull; Dere Suites Cave Hotel (Cappadocia)</div>
                  <div>&bull; Ilayda Avantgarde (Aegean Coast)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comfort Tier (Highlighted) */}
          <div className="bg-white dark:bg-stone-950 border-2 border-amber-500 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-lg uppercase tracking-wider z-10">
              Most Popular Choice (78% of Guests)
            </div>
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                alt="Deluxe Cappadocia Cave Suite"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-amber-500 text-stone-950 text-xs font-bold uppercase">
                Comfort Deluxe
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif-luxury text-amber-700 dark:text-amber-300 mb-1">
                  Superior Boutiques & Deluxe Cave Suites
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  Carved volcanic stone suites with private terraces, under-floor heating, and 5-star sea-view balconies along the Aegean and Mediterranean.
                </p>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2">Featured Properties:</div>
                <div className="text-xs text-stone-800 dark:text-stone-200 space-y-1">
                  <div>&bull; Kayakapı Premium Caves / Argos (Cappadocia)</div>
                  <div>&bull; Ajwa Sultanahmet & Celine Hotel (Istanbul)</div>
                  <div>&bull; Korumar Ephesus Beach Resort (Aegean)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Sultan Tier */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Sultan Ottoman Palace Hotel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white dark:bg-stone-900/90 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase border border-amber-500/40">
                Luxury Sultan
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif-luxury text-stone-900 dark:text-white mb-1">
                  Ottoman Palaces & Relais & Châteaux
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                  World-renowned icon properties, private sultan suites overlooking the Bosphorus strait, and museum cave suites filled with registered antiquities.
                </p>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2">Featured Properties:</div>
                <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
                  <div>&bull; Çırağan Palace Kempinski & Four Seasons (Istanbul)</div>
                  <div>&bull; Museum Hotel Relais & Châteaux (Cappadocia)</div>
                  <div>&bull; Six Senses Kaplankaya / Bodrum Luxury Resort</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Side-by-Side Comparison Table */}
        <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-xl">
          <div className="text-sm font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4">
            Side-by-Side Tier Comparison Matrix
          </div>
          <table className="w-full text-left text-xs text-stone-600 dark:text-stone-300 min-w-[650px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 font-semibold uppercase text-[11px]">
                <th className="py-3 pr-4 w-1/4">Feature</th>
                <th className="py-3 px-4 w-1/4 text-stone-800 dark:text-stone-200">Classic Tier</th>
                <th className="py-3 px-4 w-1/4 text-amber-600 dark:text-amber-400 font-bold bg-amber-950/20 rounded-t">Comfort Tier (Recommended)</th>
                <th className="py-3 pl-4 w-1/4 text-amber-700 dark:text-amber-300">Luxury Sultan Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {TIER_COMPARISONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                  <td className="py-3 pr-4 font-bold text-stone-800 dark:text-stone-200">{row.name}</td>
                  <td className="py-3 px-4 text-stone-500 dark:text-stone-400">{row.classic}</td>
                  <td className="py-3 px-4 text-stone-800 dark:text-stone-200 font-medium bg-amber-950/10">{row.comfort}</td>
                  <td className="py-3 pl-4 text-amber-300/90">{row.luxury}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
