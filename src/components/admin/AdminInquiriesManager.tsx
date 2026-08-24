import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  Users,
  Sparkles,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  X,
  ExternalLink,
  Send,
  FileText,
  UserCheck,
  CreditCard,
  Building,
  Plane,
  HeartHandshake
} from 'lucide-react';
import { AdminInquiryLead, InquiryStatus, PaymentStatus, AccommodationTierType } from '../../types';

interface AdminInquiriesManagerProps {
  inquiries: AdminInquiryLead[];
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
  selectedLead: AdminInquiryLead | null;
  onClearSelectedLead: () => void;
  newLeadModalOpen: boolean;
  onCloseNewLeadModal: () => void;
  onOpenNewLeadModal: () => void;
}

const AGENTS = [
  'Aylin Demir (Senior Specialist)',
  'Emre Kaya (Logistics Director)',
  'Selin Ozturk (Private Guide Lead)',
  'Mehmet Yilmaz (Riviera Lead)',
  'Unassigned'
];

export const AdminInquiriesManager: React.FC<AdminInquiriesManagerProps> = ({
  inquiries,
  onRefresh,
  onShowToast,
  selectedLead,
  onClearSelectedLead,
  newLeadModalOpen,
  onCloseNewLeadModal,
  onOpenNewLeadModal,
}) => {
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [currentLead, setCurrentLead] = useState<AdminInquiryLead | null>(selectedLead);
  const [isSaving, setIsSaving] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    email: '',
    phoneOrWhatsApp: '',
    country: 'United States',
    tourName: '10-Day Classic Signature Turkey Tour',
    tourId: '10-day-classic',
    travelDate: '2026-10-15',
    durationDays: 10,
    travelersCount: 2,
    accommodationTier: 'luxury' as AccommodationTierType,
    balloonAddon: true,
    bosphorusYachtAddon: true,
    destinationsInterested: ['Istanbul', 'Cappadocia', 'Ephesus', 'Pamukkale'],
    specialRequests: '',
    estimatedBudgetPerPerson: 6900,
    assignedAgent: 'Aylin Demir (Senior Specialist)',
    notes: 'Phone inquiry lead created by staff.',
  });

  useEffect(() => {
    if (selectedLead) {
      setCurrentLead(selectedLead);
    }
  }, [selectedLead]);

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = activeStatusFilter === 'all' || inq.status === activeStatusFilter;
    const matchesTier = tierFilter === 'all' || inq.accommodationTier === tierFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.tourName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesTier && matchesSearch;
  });

  // Handle lead field updates
  const handleUpdateLeadStatus = async (leadId: string, updates: Partial<AdminInquiryLead>) => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/admin/inquiries/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        onShowToast(`Lead #${leadId} updated successfully.`);
        if (currentLead && currentLead.id === leadId) {
          setCurrentLead(data.lead);
        }
        onRefresh();
      } else {
        onShowToast(`Update failed: ${data.error}`);
      }
    } catch (err) {
      onShowToast('Failed to update lead');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete lead #${leadId}?`)) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${leadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onShowToast(`Lead #${leadId} deleted.`);
        if (currentLead && currentLead.id === leadId) {
          setCurrentLead(null);
          onClearSelectedLead();
        }
        onRefresh();
      }
    } catch (err) {
      onShowToast('Failed to delete lead');
    }
  };

  // Create new manual lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (data.success) {
        onShowToast(`New VIP booking lead #${data.lead.id} created!`);
        onCloseNewLeadModal();
        onRefresh();
        setCurrentLead(data.lead);
      }
    } catch (err) {
      onShowToast('Failed to create booking lead');
    }
  };

  // Dispatch quote simulation
  const handleDispatchQuote = async (channel: 'WhatsApp' | 'Email') => {
    if (!currentLead) return;
    try {
      const res = await fetch('/api/admin/dispatch-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: currentLead.id,
          channel,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onShowToast(data.message);
        handleUpdateLeadStatus(currentLead.id, { status: 'quoted' });
      }
    } catch (err) {
      onShowToast('Failed to dispatch quote');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID,Full Name,Email,Phone,Country,Tour Name,Travel Date,Travelers,Tier,Budget USD,Total Quote USD,Status,Payment Status,Assigned Agent'];
    const rows = inquiries.map(i => 
      `"${i.id}","${i.fullName}","${i.email}","${i.phoneOrWhatsApp}","${i.country}","${i.tourName}","${i.travelDate}","${i.travelersCount}","${i.accommodationTier}","${i.estimatedBudgetPerPerson}","${i.totalQuoteUSD}","${i.status}","${i.paymentStatus}","${i.assignedAgent}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Signature_Turkey_Tours_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported inquiries to CSV.');
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">New Lead</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">Contacted</span>;
      case 'quoted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Quoted</span>;
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Confirmed</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">Cancelled</span>;
    }
  };

  const statusCounts = {
    all: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    quoted: inquiries.filter(i => i.status === 'quoted').length,
    confirmed: inquiries.filter(i => i.status === 'confirmed').length,
    completed: inquiries.filter(i => i.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Guest Inquiries &amp; Booking Pipeline</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage incoming traveler requests, customize private quotes, and coordinate bookings.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onOpenNewLeadModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Lead</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100 text-xs">
          {[
            { id: 'all', label: 'All Inquiries', count: statusCounts.all },
            { id: 'new', label: 'New Leads', count: statusCounts.new, color: 'text-rose-600 font-bold' },
            { id: 'contacted', label: 'Contacted', count: statusCounts.contacted },
            { id: 'quoted', label: 'Quoted', count: statusCounts.quoted },
            { id: 'confirmed', label: 'Confirmed', count: statusCounts.confirmed, color: 'text-emerald-700 font-bold' },
            { id: 'completed', label: 'Completed', count: statusCounts.completed },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeStatusFilter === tab.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeStatusFilter === tab.id ? 'bg-slate-700 text-amber-700 dark:text-amber-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Secondary Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by guest name, email, country, tour or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium text-slate-700"
            >
              <option value="all">All Accommodation Tiers</option>
              <option value="luxury">Luxury (Palace &amp; Cave Suites)</option>
              <option value="comfort">Comfort (Superior Heritage)</option>
              <option value="classic">Classic (4-Star Boutique)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Table (or Drawer on side if lead selected) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table (Spans 3 cols or 2 cols when drawer open) */}
        <div className={`${currentLead ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Guest &amp; Country</th>
                  <th className="py-3 px-4">Tour &amp; Tier</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Total Quote</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Agent</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No booking inquiries found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => {
                    const isSelected = currentLead?.id === inq.id;
                    return (
                      <tr
                        key={inq.id}
                        onClick={() => setCurrentLead(inq)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {inq.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{inq.fullName}</div>
                          <div className="text-[11px] text-slate-500">{inq.country} &bull; {inq.travelersCount} Travelers</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="line-clamp-1 max-w-[180px] font-medium text-slate-800">{inq.tourName}</div>
                          <span className="text-[10px] font-bold uppercase text-amber-700">
                            {inq.accommodationTier}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {inq.travelDate}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                          ${inq.totalQuoteUSD?.toLocaleString() || inq.estimatedBudgetPerPerson?.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {getStatusBadge(inq.status)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 text-[11px] whitespace-nowrap">
                          {inq.assignedAgent.split(' ')[0]}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentLead(inq);
                            }}
                            className="text-amber-600 hover:text-amber-800 font-bold inline-flex items-center gap-0.5 text-xs"
                          >
                            <span>Manage</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Details Drawer / Slide-Over (Right Col) */}
        {currentLead && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-6 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {currentLead.id}
                  </span>
                  {getStatusBadge(currentLead.status)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{currentLead.fullName}</h3>
                <p className="text-xs text-slate-500">{currentLead.country}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentLead(null);
                  onClearSelectedLead();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Email</div>
                <a href={`mailto:${currentLead.email}`} className="text-slate-800 hover:text-amber-700 font-medium truncate block">
                  {currentLead.email}
                </a>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">WhatsApp / Phone</div>
                <a
                  href={`https://wa.me/${currentLead.phoneOrWhatsApp?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-bold truncate block"
                >
                  {currentLead.phoneOrWhatsApp || 'Not provided'}
                </a>
              </div>
            </div>

            {/* Tour & Party Specs */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Journey Specifications</h4>
              <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tour Package:</span>
                  <span className="font-bold text-slate-900 text-right">{currentLead.tourName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Accommodation Tier:</span>
                  <span className="font-bold text-amber-700 uppercase">{currentLead.accommodationTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Start Date &amp; Duration:</span>
                  <span className="font-medium text-slate-800">{currentLead.travelDate} ({currentLead.durationDays} Days)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travelers:</span>
                  <span className="font-medium text-slate-800">{currentLead.travelersCount} Persons ({currentLead.adultsCount} Adults, {currentLead.childrenCount} Children)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hot Air Balloon Flight:</span>
                  <span className={`font-bold ${currentLead.balloonAddon ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {currentLead.balloonAddon ? '✓ VIP Included' : 'Not requested'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Private Bosphorus Yacht:</span>
                  <span className={`font-bold ${currentLead.bosphorusYachtAddon ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {currentLead.bosphorusYachtAddon ? '✓ VIP Included' : 'Not requested'}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Dietary & Notes */}
            {currentLead.specialRequests && (
              <div className="text-xs">
                <h4 className="font-bold text-slate-900 mb-1">Guest Special Requests:</h4>
                <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-slate-800 italic leading-relaxed">
                  "{currentLead.specialRequests}"
                </div>
              </div>
            )}

            {/* Status & Agent Assignment Controls */}
            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">Lead Operations</h4>
              
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Pipeline Status</label>
                <select
                  value={currentLead.status}
                  onChange={(e) => handleUpdateLeadStatus(currentLead.id, { status: e.target.value as InquiryStatus })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500"
                >
                  <option value="new">🔴 New Lead</option>
                  <option value="contacted">🔵 Contacted</option>
                  <option value="quoted">🟡 Quoted (Proposal Sent)</option>
                  <option value="confirmed">🟢 Confirmed (Deposit Paid)</option>
                  <option value="completed">🟣 Completed Tour</option>
                  <option value="cancelled">⚪ Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Assigned Travel Specialist</label>
                <select
                  value={currentLead.assignedAgent}
                  onChange={(e) => handleUpdateLeadStatus(currentLead.id, { assignedAgent: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-amber-500"
                >
                  {AGENTS.map(agent => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>

              {/* Pricing & Deposit */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Total Quote (USD)</label>
                  <input
                    type="number"
                    value={currentLead.totalQuoteUSD || 0}
                    onChange={(e) => handleUpdateLeadStatus(currentLead.id, { totalQuoteUSD: Number(e.target.value) })}
                    className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Deposit Paid (USD)</label>
                  <input
                    type="number"
                    value={currentLead.depositPaidUSD || 0}
                    onChange={(e) => handleUpdateLeadStatus(currentLead.id, { depositPaidUSD: Number(e.target.value) })}
                    className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* Quick Dispatch Actions */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Dispatch Proposal</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDispatchQuote('WhatsApp')}
                  className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDispatchQuote('Email')}
                  className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Email PDF Quote</span>
                </button>
              </div>
            </div>

            {/* Delete Lead Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleDeleteLead(currentLead.id)}
                className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead Record</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create New Lead Modal */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create New VIP Booking Lead</h3>
                <p className="text-xs text-slate-500">Record a phone call, WhatsApp lead, or partner referral</p>
              </div>
              <button
                type="button"
                onClick={onCloseNewLeadModal}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord & Lady Hamilton"
                    value={newLeadForm.fullName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    placeholder="+1 555 123 4567"
                    value={newLeadForm.phoneOrWhatsApp}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phoneOrWhatsApp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Origin Country</label>
                  <input
                    type="text"
                    placeholder="United States, UK, Australia..."
                    value={newLeadForm.country}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={newLeadForm.travelDate}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, travelDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Travelers Count</label>
                  <input
                    type="number"
                    min={1}
                    value={newLeadForm.travelersCount}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, travelersCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Accommodation Tier</label>
                  <select
                    value={newLeadForm.accommodationTier}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, accommodationTier: e.target.value as AccommodationTierType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 font-semibold"
                  >
                    <option value="luxury">Luxury Palace &amp; Cave</option>
                    <option value="comfort">Comfort Superior</option>
                    <option value="classic">Classic Boutique</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLeadForm.balloonAddon}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, balloonAddon: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700">Hot Air Balloon Flight</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLeadForm.bosphorusYachtAddon}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, bosphorusYachtAddon: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700">Private Bosphorus Yacht</span>
                </label>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Special Notes / Dietary / Celebrations</label>
                <textarea
                  rows={2}
                  value={newLeadForm.specialRequests}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, specialRequests: e.target.value })}
                  placeholder="e.g. Honeymoon couple, prefers Bosphorus view room, vegan breakfast."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onCloseNewLeadModal}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  Save &amp; Generate Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
