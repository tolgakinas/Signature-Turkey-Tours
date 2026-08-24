import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Users,
  Globe,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Lock,
  Save
} from 'lucide-react';

interface AdminSettingsComplianceProps {
  onShowToast: (msg: string) => void;
}

export const AdminSettingsCompliance: React.FC<AdminSettingsComplianceProps> = ({
  onShowToast,
}) => {
  const [exchangeRates, setExchangeRates] = useState({
    EUR: 0.92,
    GBP: 0.79,
    AUD: 1.54,
    CAD: 1.38,
    TRY: 34.20,
  });

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Currency multipliers saved.');
  };

  return (
    <div className="space-y-6">
      {/* TÜRSAB Certification Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-xl">
              ✦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Official Regulatory &amp; TÜRSAB Compliance</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Active &bull; Good Standing
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Association of Turkish Travel Agencies (TÜRSAB) Certified A-Group Private Tour Operator
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="text-slate-400 font-semibold uppercase text-[10px]">TÜRSAB License Number</div>
            <div className="font-bold text-slate-900 text-sm font-mono">15764-A</div>
            <div className="text-[10px] text-emerald-700 font-semibold">Verified A-Group Operator</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Ministry of Culture &amp; Tourism</div>
            <div className="font-bold text-slate-900 text-sm">Republic of Türkiye Reg.</div>
            <div className="text-[10px] text-slate-500">Istanbul &amp; Cappadocia Licensed</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="text-slate-400 font-semibold uppercase text-[10px]">Guest Protection Insurance</div>
            <div className="font-bold text-slate-900 text-sm">Allianz Global Corporate</div>
            <div className="text-[10px] text-emerald-700 font-semibold">€2,000,000 Comprehensive Cover</div>
          </div>
        </div>
      </div>

      {/* Operations Team & Curators Roster */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Lead Travel Curators &amp; Operations Staff</h3>
            <p className="text-xs text-slate-500">Dedicated coordinators handling WhatsApp concierge &amp; private logistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { name: 'Aylin Demir', role: 'Senior Private Specialist', email: 'aylin@signatureturkeytours.com', phone: '+90 544 836 28 45', initials: 'AD', activeLeads: 8 },
            { name: 'Emre Kaya', role: 'Logistics & Flight Director', email: 'emre@signatureturkeytours.com', phone: '+90 532 890 2411', initials: 'EK', activeLeads: 5 },
            { name: 'Selin Ozturk', role: 'Historian Guides Lead', email: 'selin@signatureturkeytours.com', phone: '+90 532 890 2412', initials: 'SO', activeLeads: 4 },
            { name: 'Mehmet Yilmaz', role: 'Riviera & Gulet Coordinator', email: 'mehmet@signatureturkeytours.com', phone: '+90 532 890 2413', initials: 'MY', activeLeads: 3 },
          ].map((staff) => (
            <div key={staff.name} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  {staff.initials}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{staff.name}</div>
                  <div className="text-[10px] text-slate-500">{staff.role}</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-200">
                <div>{staff.email}</div>
                <div className="font-mono text-emerald-700 font-semibold">{staff.phone}</div>
              </div>

              <div className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block">
                {staff.activeLeads} active client files
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Exchange Multipliers */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Currency Multipliers (Relative to 1.00 USD)</h3>
          <p className="text-xs text-slate-500">Live dynamic pricing conversions shown on public website</p>
        </div>

        <form onSubmit={handleSaveRates} className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">EUR (€)</label>
            <input
              type="number"
              step="0.01"
              value={exchangeRates.EUR}
              onChange={(e) => setExchangeRates({ ...exchangeRates, EUR: Number(e.target.value) })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">GBP (£)</label>
            <input
              type="number"
              step="0.01"
              value={exchangeRates.GBP}
              onChange={(e) => setExchangeRates({ ...exchangeRates, GBP: Number(e.target.value) })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">AUD (A$)</label>
            <input
              type="number"
              step="0.01"
              value={exchangeRates.AUD}
              onChange={(e) => setExchangeRates({ ...exchangeRates, AUD: Number(e.target.value) })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">CAD (C$)</label>
            <input
              type="number"
              step="0.01"
              value={exchangeRates.CAD}
              onChange={(e) => setExchangeRates({ ...exchangeRates, CAD: Number(e.target.value) })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">TRY (₺)</label>
            <input
              type="number"
              step="0.1"
              value={exchangeRates.TRY}
              onChange={(e) => setExchangeRates({ ...exchangeRates, TRY: Number(e.target.value) })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
            />
          </div>

          <div className="col-span-2 sm:col-span-5 flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Exchange Rates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
