import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Crown, 
  Compass, 
  Clock, 
  Award, 
  Users, 
  UserCheck, 
  Plane, 
  Car, 
  Check, 
  X as XIcon, 
  Star, 
  HeartHandshake, 
  Flame, 
  KeyRound,
  ChevronRight,
  BadgeCheck,
  Building2,
  CalendarCheck
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenInquiry?: () => void;
  onOpenCustomPlanner?: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({
  onOpenInquiry,
  onOpenCustomPlanner,
}) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'comparison' | 'guarantees'>('pillars');

  const valuePillars = [
    {
      id: 'private-pace',
      icon: Users,
      badge: 'Zero Strangers',
      title: '100% Private & Bespoke Pacing',
      subtitle: 'Your family or party only — never a coach bus with strangers',
      description: 'You dictate every morning start time, spend as long as you wish inside Hagia Sophia or Cappadocia valleys, and pause spontaneously at roadside pomegranate juice stalls. It is your vacation, sculpted to your pace.',
      metrics: '100% Private Group Guarantee',
      highlightColor: '#D4AF37'
    },
    {
      id: 'scholar-guides',
      icon: Crown,
      badge: 'Top 1% in Turkey',
      title: 'Licensed Scholar Historian Guides',
      subtitle: 'Government-certified Master’s & PhD level storytellers',
      description: 'Our handpicked guides are seasoned archaeologists and university lecturers who bring 2,500 years of Roman, Byzantine, and Ottoman history to life with gripping narratives, avoiding generic tourist scripts.',
      metrics: '15+ Years Avg. Experience',
      highlightColor: '#38BDF8'
    },
    {
      id: 'skip-the-line',
      icon: KeyRound,
      badge: 'VIP Privileges',
      title: 'VIP Skip-the-Line & Palace Access',
      subtitle: 'Bypass 2-hour tourist queues at every major monument',
      description: 'Walk straight past general admission lines at Hagia Sophia, Topkapi Palace Harem, Ephesus Terrace Houses, and the Basilica Cistern. Exclusive after-hours appointments and private Bosphorus yacht berths included.',
      metrics: '0 Minutes Wasted in Lines',
      highlightColor: '#A78BFA'
    },
    {
      id: 'luxury-transport',
      icon: Car,
      badge: 'Executive Fleet',
      title: 'Pristine Mercedes-Benz VIP Fleet',
      subtitle: 'Chilled beverages, high-speed Wi-Fi & master chauffeurs',
      description: 'Travel between imperial sights and scenic Aegean highways in luxury Mercedes Sprinter and Vito VIP vehicles equipped with plush reclining leather seating, onboard Wi-Fi, climate control, and certified defensive drivers.',
      metrics: '2024-2026 Model Mercedes Only',
      highlightColor: '#34D399'
    },
    {
      id: 'balloon-safety',
      icon: Flame,
      badge: 'Civil Aviation Certified',
      title: 'Guaranteed Sunrise Balloon Slots',
      subtitle: 'Pre-allocated prime takeoff vouchers with 100% weather safety refund',
      description: 'Never worry about sold-out Cappadocia balloon flights. We reserve top-tier multi-day backup vouchers with senior pilots. If high winds prevent flight, you receive a full transparent refund immediately.',
      metrics: '100% Safety Refund Guarantee',
      highlightColor: '#F59E0B'
    },
    {
      id: 'concierge-support',
      icon: HeartHandshake,
      badge: 'TÜRSAB #15764-A',
      title: '24/7 Istanbul Concierge & TÜRSAB Protection',
      subtitle: 'Dedicated real-time WhatsApp logistics team on the ground',
      description: 'From airport VIP meet-and-greet to seamless domestic flight check-ins, restaurant reservations, and luggage handling, your private English-speaking concierge is on call 24 hours a day across Turkey.',
      metrics: '< 5 Min Concierge Response Time',
      highlightColor: '#EC4899'
    },
  ];

  const comparisonData = [
    {
      feature: 'Group Composition',
      signature: '100% Private (Just you & your chosen companions)',
      massTours: '30–50 strangers on a shared coach bus',
    },
    {
      feature: 'Daily Schedule & Pacing',
      signature: 'Fully flexible; wake up when you want, stay longer anywhere',
      massTours: 'Strict rigid timetable with 6:00 AM mandatory roll calls',
    },
    {
      feature: 'Tour Guide Caliber',
      signature: 'Scholar historians (Master’s/PhD in Archaeology & Art History)',
      massTours: 'General tour escort handling crowd logistics',
    },
    {
      feature: 'Monument Entry Access',
      signature: 'VIP Fast-Track & pre-reserved Palace Harem / Terrace Houses',
      massTours: 'Waiting in long public lines; extra fees for inner rooms',
    },
    {
      feature: 'Vehicles & Transport',
      signature: 'Mercedes-Benz VIP Vito/Sprinter with leather, Wi-Fi & water',
      massTours: 'Standard commercial bus with tight legroom & no Wi-Fi',
    },
    {
      feature: 'Hotel Accommodations',
      signature: 'Authentic 4-5★ Luxury Cave Suites & Ottoman Waterfront Palaces',
      massTours: 'Generic corporate chain hotels far outside the historic centers',
    },
    {
      feature: 'Dining & Gastronomy',
      signature: 'Handpicked authentic regional dining & chef masterclasses',
      massTours: 'Mass tourist buffet halls with set generic menus',
    },
    {
      feature: 'Shopping Stops Policy',
      signature: 'Strict Zero-Pressure policy; visit real artisan studios only if requested',
      massTours: 'Mandatory 2-hour commission carpet/leather sales pitches',
    },
    {
      feature: 'On-Ground Support',
      signature: 'Dedicated 24/7 Istanbul WhatsApp Concierge + airport meet & greet',
      massTours: 'Call-center helpline with limited after-hours assistance',
    }
  ];

  const guarantees = [
    {
      title: '100% Financial Protection',
      desc: 'Officially licensed under TÜRSAB (Association of Turkish Travel Agencies) License #15764-A with comprehensive traveler protection bonds.',
      icon: ShieldCheck
    },
    {
      title: 'Fair Pricing & Price Transparency',
      desc: 'All domestic flight tickets, entrance fees, private vehicles, guide honorariums, and taxes are clearly broken down. Zero hidden surcharges.',
      icon: BadgeCheck
    },
    {
      title: 'Free Itinerary Customization',
      desc: 'Revise your proposed day-by-day plan as many times as you like before departure until every stop, hotel, and experience is 100% perfect.',
      icon: CalendarCheck
    },
    {
      title: 'Pre-Arranged Tipping Clarity',
      desc: 'Optional pre-paid tipping packages available so you never have to calculate driver and guide gratuities while on holiday.',
      icon: KeyRound
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-[#FDFCF8] relative border-t border-stone-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
            <span>The Signature Difference</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            We reject rushed cookie-cutter bus excursions. Every Signature Turkey journey is a handcrafted private masterpiece backed by premier scholar guides, luxury VIP Mercedes transport, and unmatched on-ground care.
          </p>

          {/* Sub-navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pillars'
                  ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-lg scale-105'
                  : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Core Value Pillars</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'comparison'
                  ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-lg scale-105'
                  : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Signature vs. Mass Bus Tours</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guarantees')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guarantees'
                  ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-lg scale-105'
                  : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Our Guarantees & TÜRSAB License</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Core Value Pillars (Bento Grid) */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {valuePillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl hover:border-amber-600 dark:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 flex items-center justify-center text-amber-600 dark:text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-600 dark:text-stone-300">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold font-serif-luxury text-stone-900 dark:text-white group-hover:text-amber-600 dark:text-[#D4AF37] transition-colors">
                        {pillar.title}
                      </h3>
                      <div className="text-xs text-amber-600 dark:text-[#D4AF37]/90 font-medium mt-1">
                        {pillar.subtitle}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Metric Pill */}
                  <div className="mt-6 pt-4 border-t border-stone-200 dark:border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">Standard:</span>
                    <span className="font-bold text-stone-900 dark:text-white bg-stone-50 dark:bg-[#0A0E14] px-2.5 py-1 rounded-lg border border-stone-200 dark:border-white/10">
                      {pillar.metrics}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Signature vs. Mass Bus Tours Side-by-Side Comparison */}
        {activeTab === 'comparison' && (
          <div className="bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-[#0A0E14] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                  Experience the Difference: Private Luxury vs. Mass Market
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
                  Why travelers who value their time and comfort choose Signature Turkey Tours.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                100% Private Advantage
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-white/10 bg-white dark:bg-[#161C24]/80 text-stone-500 dark:text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="p-4 sm:p-5 w-1/4">Feature / Experience</th>
                    <th className="p-4 sm:p-5 w-5/12 bg-amber-500 dark:bg-[#D4AF37]/10 text-amber-600 dark:text-[#D4AF37] font-bold">
                      <div className="flex items-center gap-1.5 text-xs font-serif-luxury text-stone-900 dark:text-white">
                        <Crown className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
                        <span>Signature Turkey Tours</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 w-1/3 text-stone-500 dark:text-stone-400">
                      Typical Group Bus Tour
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonData.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className={idx % 2 === 0 ? 'bg-white dark:bg-[#161C24]' : 'bg-[#131922]'}
                    >
                      <td className="p-4 sm:p-5 font-bold text-stone-800 dark:text-stone-200">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 bg-amber-500 dark:bg-[#D4AF37]/5 font-medium text-white border-l border-r border-amber-600 dark:border-[#D4AF37]/20">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.signature}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-stone-500 dark:text-stone-400 font-light">
                        <div className="flex items-start gap-2">
                          <XIcon className="w-4 h-4 text-rose-400/80 shrink-0 mt-0.5" />
                          <span>{row.massTours}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Guarantees & TÜRSAB License */}
        {activeTab === 'guarantees' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {guarantees.map((g, i) => {
              const GIcon = g.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-xl hover:border-amber-600 dark:border-[#D4AF37]/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-[#0A0E14] border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center shrink-0">
                    <GIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-stone-900 dark:text-white">
                      {g.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Bento Banner CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#161C24] via-[#1E2530] to-[#161C24] p-6 sm:p-8 rounded-3xl border border-amber-600 dark:border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>TÜRSAB Licensed Tour Operator #15764-A &bull; 100% Bonded Protection</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
              Ready to Design Your Custom Turkey Itinerary?
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-light max-w-xl">
              Tell our Istanbul travel concierge your travel dates and bucket-list wishes for a complimentary, zero-obligation custom proposal within 2 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenCustomPlanner && (
              <button
                type="button"
                onClick={onOpenCustomPlanner}
                className="px-5 py-3 rounded-xl bg-stone-50 dark:bg-[#0A0E14] hover:bg-[#1E2530] text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
                <span>AI Itinerary Generator</span>
              </button>
            )}

            {onOpenInquiry && (
              <button
                type="button"
                id="why-us-inquiry-btn"
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request Bespoke Proposal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
