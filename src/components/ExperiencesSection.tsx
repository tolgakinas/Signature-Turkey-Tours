import React from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Check, 
  Plus, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/experiencesData';
import { CurrencyCode, SignatureExperience } from '../types';
import { formatPrice } from '../utils/currency';

interface ExperiencesSectionProps {
  activeCurrency: CurrencyCode;
  onAddExperienceToInquiry: (exp: SignatureExperience) => void;
  experiences?: SignatureExperience[];
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  activeCurrency,
  onAddExperienceToInquiry,
  experiences: propExperiences,
}) => {
  const experiences = propExperiences || EXPERIENCES_DATA;
  return (
    <section id="experiences" className="py-16 md:py-24 bg-white dark:bg-stone-900 text-stone-900 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Bespoke Enhancements & Masterclasses</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Signature Turkish Experiences
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Elevate any private tour itinerary with curated, authentic experiences designed to immerse you into Turkish culture, gourmet culinary heritage, and ancient history.
          </p>
        </div>

        {/* Grid of Experiences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all shadow-lg"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-white dark:bg-stone-900">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[11px] font-bold uppercase tracking-wider">
                    {exp.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span>{exp.location}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold font-serif-luxury text-stone-900 dark:text-white group-hover:text-amber-700 dark:text-amber-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    <div className="text-[10px] font-bold uppercase text-stone-500 tracking-wider">
                      Includes:
                    </div>
                    {exp.included.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-200 dark:border-stone-800/80 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">From</div>
                  <div className="text-lg font-bold text-amber-600 dark:text-amber-400 font-serif-luxury">
                    {formatPrice(exp.priceUSD, activeCurrency)}
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 font-normal ml-1">/ person</span>
                  </div>
                </div>

                <button
                  type="button"
                  id={`add-exp-${exp.id}`}
                  onClick={() => onAddExperienceToInquiry(exp)}
                  className="px-3.5 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-800 dark:text-stone-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
