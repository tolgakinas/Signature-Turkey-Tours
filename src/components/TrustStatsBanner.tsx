import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Coins, 
  Clock, 
  Award,
  Plane,
  HeartHandshake
} from 'lucide-react';

export const TrustStatsBanner: React.FC = () => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: 'TÜRSAB Licensed & Bonded',
      desc: 'Official License #15764-A with full civil liability & customer protection',
    },
    {
      icon: UserCheck,
      title: '100% Private Scholar Guides',
      desc: 'Dedicated licensed master historians traveling exclusively with your party',
    },
    {
      icon: Sparkles,
      title: 'Guaranteed Sunrise Ballooning',
      desc: 'Direct priority slot reservations with 100% weather safety guarantee',
    },
    {
      icon: Coins,
      title: 'Zero Hidden Fees & Pre-Tipping',
      desc: 'Transparent pricing with pre-paid porterage, lunches & admissions included',
    },
    {
      icon: Clock,
      title: '2-Hour Bespoke Turnaround',
      desc: '24/7 dedicated on-ground WhatsApp concierge assistance in Turkey',
    },
  ];

  return (
    <section className="bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-[#FDFCF8] py-8 border-y border-stone-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#161C24] p-4 rounded-2xl border border-stone-200 dark:border-white/5 hover:border-amber-600 dark:border-[#D4AF37]/30 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 dark:bg-[#D4AF37]/10 border border-amber-600 dark:border-[#D4AF37]/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-[#D4AF37] group-hover:bg-amber-500 dark:hover:bg-[#D4AF37]/20 group-hover:scale-105 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white leading-snug group-hover:text-amber-600 dark:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

