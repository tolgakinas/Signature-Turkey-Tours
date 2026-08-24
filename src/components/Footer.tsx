import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Sparkles, 
  Heart, 
  Clock,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenCustomPlanner: () => void;
  onOpenInquiryModal: () => void;
  onOpenConcierge: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCustomPlanner,
  onOpenInquiryModal,
  onOpenConcierge,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border-t border-stone-200 dark:border-stone-800 text-xs">
      {/* Top Banner with Newsletter / Brochure */}
      <div className="bg-white dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary 2026 Turkey Private Travel Lookbook</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
              Download the Signature Turkey Travel Guide & Catalog
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xl">
              Includes high-res photography of cave suites, secret Bosphorus dining spots, and private yacht route charts.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-white px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-amber-400 w-full sm:w-72"
            />
            <button
              type="button"
              onClick={() => alert('Thank you! Your complimentary 2026 Turkey Private Travel Lookbook has been sent to your email.')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 transition-all cursor-pointer shadow-md"
            >
              Get Free Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Offices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Brand & TÜRSAB Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold text-lg border border-amber-300">
              ✦
            </div>
            <div>
              <div className="font-display-royal font-bold text-amber-700 dark:text-amber-300 tracking-widest text-lg">
                SIGNATURE
              </div>
              <div className="text-[10px] tracking-[0.25em] text-stone-500 dark:text-stone-400 uppercase">
                TURKEY TOURS &bull; BESPOKE LUXURY
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
            Signature Turkey Tours is the premier licensed boutique travel atelier for bespoke, 100% private journeys across Istanbul, Cappadocia, Ephesus, Pamukkale, Antalya, and the Turkish Riviera.
          </p>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-[11px]">
              <div className="font-bold text-stone-900 dark:text-white">Association of Turkish Travel Agencies (TÜRSAB)</div>
              <div className="text-stone-500 dark:text-stone-400">Class 'A' Licensed Tour Operator #15764-A</div>
            </div>
          </div>
        </div>

        {/* Col 2: Signature Itineraries */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
            Signature Itineraries
          </h4>
          <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
            <li><a href="#tours" className="hover:text-amber-700 dark:text-amber-300 transition-colors">10-Day Classic Signature Turkey</a></li>
            <li><a href="#tours" className="hover:text-amber-700 dark:text-amber-300 transition-colors">14-Day Grand Anatolian Odyssey</a></li>
            <li><a href="#tours" className="hover:text-amber-700 dark:text-amber-300 transition-colors">7-Day Highlights of Turkey</a></li>
            <li><a href="#tours" className="hover:text-amber-700 dark:text-amber-300 transition-colors">8-Day Turquoise Coast Gulet Cruise</a></li>
            <li><a href="#custom-planner" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1">Tailor Custom Itinerary</a></li>
          </ul>
        </div>

        {/* Col 3: Signature Experiences */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
            Signature Experiences
          </h4>
          <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
            <li><a href="#balloons" className="hover:text-amber-700 dark:text-amber-300 transition-colors">Cappadocia Sunrise Balloon Flight</a></li>
            <li><a href="#experiences" className="hover:text-amber-700 dark:text-amber-300 transition-colors">Private Bosphorus Yacht Charter</a></li>
            <li><a href="#experiences" className="hover:text-amber-700 dark:text-amber-300 transition-colors">Ottoman Marble Hammam Spa</a></li>
            <li><a href="#experiences" className="hover:text-amber-700 dark:text-amber-300 transition-colors">Two-Continent Culinary Safari</a></li>
            <li><a href="#experiences" className="hover:text-amber-700 dark:text-amber-300 transition-colors">Whirling Dervishes Sema Ceremony</a></li>
          </ul>
        </div>

        {/* Col 4: On-Ground Offices & Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
            Headquarters & Offices
          </h4>
          <div className="space-y-2.5 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Istanbul HQ:</strong> Divanyolu Cad. No: 48, Sultanahmet, Fatih, Istanbul</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Cappadocia Office:</strong> Bilal Köyü Yolu, Göreme, Nevşehir</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>+90 544 836 28 45 (24/7 WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>concierge@signatureturkeytours.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-stone-200 dark:border-stone-800/80 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 dark:text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Signature Turkey Tours. All rights reserved. Registered Turkish Ministry of Culture & Tourism Tour Operator.
          </div>
          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400">
            <span>TÜRSAB Member #15764-A</span>
            <span>&bull;</span>
            <span>Terms of Service</span>
            <span>&bull;</span>
            <span>Privacy Policy</span>
            {onOpenAdmin && (
              <>
                <span>&bull;</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:text-amber-300 font-bold underline cursor-pointer"
                >
                  Operations Admin Portal
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
