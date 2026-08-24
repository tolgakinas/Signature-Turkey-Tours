import React, { useState } from 'react';
import {
  Sparkles,
  DollarSign,
  Copy,
  Check,
  Send,
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  Wind,
  Compass,
  FileText,
  Clock,
  Printer
} from 'lucide-react';
import { AccommodationTierType } from '../../types';

interface AdminQuickQuoteBuilderProps {
  onShowToast: (msg: string) => void;
  onLeadCreated: () => void;
}

export const AdminQuickQuoteBuilder: React.FC<AdminQuickQuoteBuilderProps> = ({
  onShowToast,
  onLeadCreated,
}) => {
  const [clientName, setClientName] = useState('Lady Sophia Kensington');
  const [clientEmail, setClientEmail] = useState('sophia.kensington@london.co.uk');
  const [clientPhone, setClientPhone] = useState('+44 7700 900555');
  const [country, setCountry] = useState('United Kingdom');
  const [travelDate, setTravelDate] = useState('2026-09-20');
  const [durationDays, setDurationDays] = useState(10);
  const [travelersCount, setTravelersCount] = useState(2);
  const [tier, setTier] = useState<AccommodationTierType>('luxury');

  // Selected Destinations
  const [destinations, setDestinations] = useState<string[]>([
    'Istanbul',
    'Cappadocia',
    'Ephesus',
    'Pamukkale'
  ]);

  // VIP Addons
  const [balloonFlight, setBalloonFlight] = useState(true);
  const [bosphorusYacht, setBosphorusYacht] = useState(true);
  const [hamamRitual, setHamamRitual] = useState(true);
  const [domesticFlightsIncluded, setDomesticFlightsIncluded] = useState(true);
  const [copied, setCopied] = useState(false);

  // Price Calculation Math
  const baseRatePerDayPerPax = tier === 'luxury' ? 620 : tier === 'comfort' ? 420 : 310;
  const baseTourTotal = baseRatePerDayPerPax * durationDays * travelersCount;

  const balloonCost = balloonFlight ? 340 * travelersCount : 0;
  const yachtCost = bosphorusYacht ? 750 : 0; // Private yacht flat charter
  const hamamCost = hamamRitual ? 160 * travelersCount : 0;
  const domesticFlightsCost = domesticFlightsIncluded ? 280 * travelersCount : 0;

  const grandTotalUSD = baseTourTotal + balloonCost + yachtCost + hamamCost + domesticFlightsCost;
  const perPersonUSD = Math.round(grandTotalUSD / travelersCount);
  const depositRequiredUSD = Math.round(grandTotalUSD * 0.30); // 30% deposit

  const toggleDestination = (dest: string) => {
    if (destinations.includes(dest)) {
      if (destinations.length > 1) {
        setDestinations(destinations.filter(d => d !== dest));
      }
    } else {
      setDestinations([...destinations, dest]);
    }
  };

  const quotationText = `✦ SIGNATURE TURKEY TOURS — BESPOKE QUOTATION ✦
TÜRSAB Licensed Private Luxury Tour Operator (License #15764-A)
--------------------------------------------------
Valued Guest: ${clientName} (${country})
Tour Reference: STT-${Date.now().toString(36).toUpperCase().slice(0, 6)}
Proposed Travel Date: ${travelDate}
Duration: ${durationDays} Days / ${durationDays - 1} Nights
Party Size: ${travelersCount} Travelers (Private Tour)
Accommodation Tier: ${tier.toUpperCase()} (Hand-Curated Luxury Palaces & Cave Suites)
Destinations: ${destinations.join(' → ')}

INCLUDED BESPOKE PRIVILEGES:
✓ Private dedicated English-speaking historian scholar guide throughout
✓ Private Mercedes-Benz VIP Sprinter transfers & chauffeur service
✓ VIP Skip-the-line admissions to all monuments & palaces
✓ Daily gourmet breakfast + curated Anatolian lunches during excursions
${balloonFlight ? '✓ Sunrise Deluxe Cappadocia Hot Air Balloon Flight with Champagne' : ''}
${bosphorusYacht ? '✓ Private 2-Hour Sunset Cruise on the Bosphorus Strait aboard Motor Yacht' : ''}
${hamamRitual ? '✓ Historic Ottoman Sultan Hamam & Wellness Ritual in Istanbul' : ''}
${domesticFlightsIncluded ? '✓ All Internal Domestic Flights with baggage allowance included' : ''}
✓ 24/7 On-ground WhatsApp concierge assistance in Turkey

INVESTMENT SUMMARY:
• Total Private Itinerary: $${grandTotalUSD.toLocaleString()} USD (for ${travelersCount} guests)
• Per Person Rate: $${perPersonUSD.toLocaleString()} USD
• 30% Security Deposit to Confirm: $${depositRequiredUSD.toLocaleString()} USD
• Balance due 30 days prior to arrival.

Direct Concierge: info@signatureturkeytours.com | WhatsApp: +90 544 836 28 45`;

  const handleCopy = () => {
    navigator.clipboard.writeText(quotationText);
    setCopied(true);
    onShowToast('Quotation text copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveAsLead = async () => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: clientName,
          email: clientEmail,
          phoneOrWhatsApp: clientPhone,
          country,
          tourName: `${durationDays}-Day Bespoke Private Turkish Journey`,
          travelDate,
          durationDays,
          travelersCount,
          accommodationTier: tier,
          balloonAddon: balloonFlight,
          bosphorusYachtAddon: bosphorusYacht,
          destinationsInterested: destinations,
          specialRequests: 'Generated via Instant VIP Quote Tool.',
          estimatedBudgetPerPerson: perPersonUSD,
          totalQuoteUSD: grandTotalUSD,
          status: 'quoted',
          assignedAgent: 'Aylin Demir (Senior Specialist)',
          notes: `Itemized quote $${grandTotalUSD} sent. Deposit required: $${depositRequiredUSD}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onShowToast(`Quotation converted into active booking lead #${data.lead.id}!`);
        onLeadCreated();
      }
    } catch (err) {
      onShowToast('Failed to convert quote to lead');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Instant VIP Quote &amp; Itinerary Creator</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                Staff Yield Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate accurate custom quotations with itemized hotel tiers, balloon slots, private yachts, and instant WhatsApp dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Quote Text'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAsLead}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Save as Booking Lead</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5 text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            1. Client &amp; Travel Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Guest Full Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Origin Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">WhatsApp / Phone</label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Travel Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Duration (Days)</label>
              <input
                type="number"
                min={3}
                max={28}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Party Size (Pax)</label>
              <input
                type="number"
                min={1}
                max={20}
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          {/* Accommodation Tier Picker */}
          <div className="space-y-2 pt-2">
            <label className="font-bold text-slate-800 block">2. Accommodation Tier Standard</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'classic', label: 'Classic Boutique', price: '$310/day', desc: 'Curated 4-Star Heritage' },
                { id: 'comfort', label: 'Comfort Superior', price: '$420/day', desc: '5-Star Luxury & Superior Caves' },
                { id: 'luxury', label: 'Luxury Ottoman', price: '$620/day', desc: 'Ciragan/Four Seasons & Royal Caves' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id as AccommodationTierType)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    tier === t.id
                      ? 'border-amber-500 bg-amber-50/70 shadow-xs ring-1 ring-amber-400'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{t.label}</div>
                  <div className="text-[10px] font-mono text-amber-800 font-semibold">{t.price}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Destinations Multi-select */}
          <div className="space-y-2 pt-2">
            <label className="font-bold text-slate-800 block">3. Destinations Route</label>
            <div className="flex flex-wrap gap-2">
              {['Istanbul', 'Cappadocia', 'Ephesus', 'Pamukkale', 'Antalya', 'Bodrum', 'Fethiye', 'Göbeklitepe'].map((d) => {
                const selected = destinations.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDestination(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selected
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {selected ? `✓ ${d}` : `+ ${d}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIP Add-ons Checkboxes */}
          <div className="space-y-2 pt-2">
            <label className="font-bold text-slate-800 block">4. VIP Inclusions &amp; Experiences</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <span className="font-medium text-slate-800">Deluxe Cappadocia Balloon Flight (+$340/pax)</span>
                <input
                  type="checkbox"
                  checked={balloonFlight}
                  onChange={(e) => setBalloonFlight(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <span className="font-medium text-slate-800">Private Bosphorus Yacht Cruise (+$750)</span>
                <input
                  type="checkbox"
                  checked={bosphorusYacht}
                  onChange={(e) => setBosphorusYacht(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <span className="font-medium text-slate-800">Ottoman Hamam Ritual (+$160/pax)</span>
                <input
                  type="checkbox"
                  checked={hamamRitual}
                  onChange={(e) => setHamamRitual(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <span className="font-medium text-slate-800">All Domestic Flight Tickets (+$280/pax)</span>
                <input
                  type="checkbox"
                  checked={domesticFlightsIncluded}
                  onChange={(e) => setDomesticFlightsIncluded(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Live Quote Summary Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                  OFFICIAL PROPOSAL
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white mt-0.5">{clientName}</h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                ✦
              </div>
            </div>

            {/* Pricing Breakdown Lines */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Base Private Tour ({durationDays} Days, {travelersCount} Pax):</span>
                <span className="font-mono text-stone-900 dark:text-white">${baseTourTotal.toLocaleString()}</span>
              </div>
              {balloonFlight && (
                <div className="flex justify-between text-amber-700 dark:text-amber-300">
                  <span>Hot Air Balloon ({travelersCount} seats):</span>
                  <span className="font-mono">+${balloonCost.toLocaleString()}</span>
                </div>
              )}
              {bosphorusYacht && (
                <div className="flex justify-between text-amber-700 dark:text-amber-300">
                  <span>Private Bosphorus Yacht Charter:</span>
                  <span className="font-mono">+${yachtCost.toLocaleString()}</span>
                </div>
              )}
              {hamamRitual && (
                <div className="flex justify-between text-amber-700 dark:text-amber-300">
                  <span>Ottoman Hamam Ritual ({travelersCount} pax):</span>
                  <span className="font-mono">+${hamamCost.toLocaleString()}</span>
                </div>
              )}
              {domesticFlightsIncluded && (
                <div className="flex justify-between text-slate-300">
                  <span>Domestic Turkish Airlines Flights:</span>
                  <span className="font-mono">+${domesticFlightsCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl p-4 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Investment:</span>
                <span className="text-2xl font-black text-amber-700 dark:text-amber-300 tracking-tight font-mono">
                  ${grandTotalUSD.toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Per Person Rate:</span>
                <span className="text-stone-900 dark:text-white font-bold font-mono">${perPersonUSD.toLocaleString()} / person</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-700 dark:text-emerald-400 pt-1 border-t border-stone-200 dark:border-white/10">
                <span>30% Deposit to Confirm:</span>
                <span className="font-bold font-mono">${depositRequiredUSD.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Quick Dispatch Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Quotation Text Copied' : 'Copy Formatted WhatsApp / Email Text'}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAsLead}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-stone-200 dark:border-white/20 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Save to Booking Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
