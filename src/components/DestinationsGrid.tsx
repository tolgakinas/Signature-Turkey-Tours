import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  ArrowRight,
  Sun
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { Destination } from '../types';

interface DestinationsGridProps {
  onFilterByDestination: (destName: string) => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  onFilterByDestination,
}) => {
  const [selectedDestModal, setSelectedDestModal] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-16 md:py-24 bg-white dark:bg-stone-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Timeless Landscapes & Ancient Wonders</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Iconic Turkish Destinations
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            From the imperial minarets of Istanbul to the volcanic canyons of Cappadocia and the sunken Lycian ruins of the Turquoise Coast, discover Turkey’s most enchanting regions.
          </p>
        </div>

        {/* Grid of Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS_DATA.map((dest) => (
            <div
              key={dest.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden bg-white dark:bg-stone-950">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white dark:bg-stone-900/80 backdrop-blur-md text-amber-700 dark:text-amber-300 text-xs font-bold uppercase border border-stone-300 dark:border-stone-700">
                  {dest.turkishName}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                    {dest.name}
                  </h3>
                  <div className="text-xs text-stone-600 dark:text-stone-300 line-clamp-1 mt-0.5">
                    {dest.tagline}
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                  <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Top Attractions:</div>
                  <div className="flex flex-wrap gap-1">
                    {dest.topSights.slice(0, 3).map((sight, i) => (
                      <span key={i} className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[11px] text-stone-600 dark:text-stone-300">
                        {sight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-200 dark:border-stone-800">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Stay: {dest.recommendedStay}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onFilterByDestination(dest.name)}
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Tours</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
