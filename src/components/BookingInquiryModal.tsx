import React, { useState } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  User, 
  Globe, 
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { AccommodationTierType, CurrencyCode } from '../types';
import { TOURS_DATA } from '../data/toursData';
import confetti from 'canvas-confetti';

interface BookingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTourTitle?: string;
  initialTier?: AccommodationTierType;
  initialTravelers?: number;
  initialCustomDetails?: string;
}

export const BookingInquiryModal: React.FC<BookingInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTourTitle,
  initialTier = 'comfort',
  initialTravelers = 2,
  initialCustomDetails = '',
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [selectedTour, setSelectedTour] = useState(initialTourTitle || TOURS_DATA[0].title);
  const [selectedTier, setSelectedTier] = useState<AccommodationTierType>(initialTier);
  const [travelersCount, setTravelersCount] = useState<number>(initialTravelers);
  const [estimatedDate, setEstimatedDate] = useState('');
  const [balloonAddon, setBalloonAddon] = useState(true);
  const [yachtAddon, setYachtAddon] = useState(false);
  const [notes, setNotes] = useState(initialCustomDetails);

  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const specialRequestsCombined = [
      notes,
      balloonAddon ? 'Include Sunrise Hot Air Balloon' : '',
      yachtAddon ? 'Include Private Sunset Bosphorus Yacht' : '',
    ].filter(Boolean).join(' | ');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          country,
          tourPackageTitle: selectedTour,
          accommodationTier: selectedTier,
          travelersCount,
          estimatedDate,
          specialRequests: specialRequestsCombined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedInquiryId(data.inquiryId || `STT-${Math.floor(100000 + Math.random() * 900000)}`);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMsg('Could not submit inquiry. Please try again or message via WhatsApp.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-[#FDFCF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-white p-5 sm:p-6 shrink-0 border-b border-stone-200 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white transition-colors cursor-pointer border border-stone-200 dark:border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14]">
              Free Bespoke Quote & Itinerary Proposal
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
            Tailor Your Private Turkey Journey
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-light">
            Our Istanbul-based travel concierge will prepare a customized day-by-day proposal within 2 hours.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-stone-50 dark:bg-[#0A0E14]">
          {submittedInquiryId ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                Teşekkür Ederiz! We Have Received Your Request.
              </h3>

              <div className="bg-white dark:bg-[#161C24] p-4 rounded-2xl border border-stone-200 dark:border-white/10 max-w-md mx-auto text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <div className="text-stone-500 dark:text-stone-400">Inquiry Reference Number:</div>
                <div className="text-base font-bold font-mono text-amber-600 dark:text-[#D4AF37] bg-stone-50 dark:bg-[#0A0E14] py-1.5 rounded-xl border border-amber-600 dark:border-[#D4AF37]/30">
                  {submittedInquiryId}
                </div>
                <p className="font-light">
                  A formal quote and detailed day-by-day PDF proposal will be sent to <strong className="text-stone-900 dark:text-white">{email}</strong> within 2 hours.
                </p>
              </div>

              {/* Direct WhatsApp Connect */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/905448362845?text=Hello%2C%20I%20just%20submitted%20inquiry%20${submittedInquiryId}%20for%20${encodeURIComponent(selectedTour)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp (+90 544 836 28 45)</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-600 dark:text-stone-300 font-bold text-xs transition-colors border border-stone-200 dark:border-white/10"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 text-rose-200 text-xs border border-rose-800">
                  {errorMsg}
                </div>
              )}

              {/* Tour Selection */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Selected Itinerary / Base Package:
                </label>
                <select
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                  className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37] font-medium"
                >
                  {TOURS_DATA.map((t) => (
                    <option key={t.id} value={t.title} className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">
                      {t.title} ({t.durationDays} Days)
                    </option>
                  ))}
                  <option value="Custom Bespoke Itinerary" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Custom Bespoke Itinerary (Tailor from Scratch)</option>
                </select>
              </div>

              {/* Tier & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Preferred Hotel Tier:
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value as AccommodationTierType)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37] font-medium"
                  >
                    <option value="classic" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Classic 4-Star Boutique</option>
                    <option value="comfort" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Comfort Superior & Deluxe Cave Suite</option>
                    <option value="luxury" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Luxury Sultan (Ottoman Palaces & Relais)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Number of Travelers:
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37] font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num} className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">
                        {num} {num === 1 ? 'Traveler (Solo)' : 'Travelers (Private Group)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200 dark:border-white/10">
                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 555 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Estimated Travel Month / Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. May 2026 or Sept 15-28"
                    value={estimatedDate}
                    onChange={(e) => setEstimatedDate(e.target.value)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Bucket List Add-ons */}
              <div className="bg-white dark:bg-[#161C24] p-3.5 rounded-2xl border border-stone-200 dark:border-white/5 space-y-2">
                <div className="text-xs font-bold text-stone-800 dark:text-stone-200">Optional Signature Add-ons:</div>
                <div className="flex flex-wrap gap-4 text-xs text-stone-600 dark:text-stone-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={balloonAddon}
                      onChange={(e) => setBalloonAddon(e.target.checked)}
                      className="accent-[#D4AF37] w-4 h-4 rounded"
                    />
                    <span>Cappadocia Sunrise Hot Air Balloon</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={yachtAddon}
                      onChange={(e) => setYachtAddon(e.target.checked)}
                      className="accent-[#D4AF37] w-4 h-4 rounded"
                    />
                    <span>Private Sunset Bosphorus Yacht</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Special Requests / Dietary / Occasion (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Honeymoon trip, vegetarian meals, requesting room with Cappadocia hot air balloon view"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-inquiry-btn"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Your Request to Concierge Team...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry & Receive Bespoke Proposal</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>No obligation &bull; 100% Privacy Protected &bull; TÜRSAB #15764-A</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
