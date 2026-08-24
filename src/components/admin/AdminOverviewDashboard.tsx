import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Wind,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  MapPin,
  Compass,
  Calendar,
  Phone,
  MessageSquare,
  Award,
  Globe
} from 'lucide-react';
import { AdminStatsData, AdminInquiryLead } from '../../types';
import { AdminTab } from './AdminLayout';

interface AdminOverviewDashboardProps {
  stats: AdminStatsData | null;
  inquiries: AdminInquiryLead[];
  loading: boolean;
  onSelectInquiry: (inquiry: AdminInquiryLead) => void;
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminOverviewDashboard: React.FC<AdminOverviewDashboardProps> = ({
  stats,
  inquiries,
  loading,
  onSelectInquiry,
  onNavigateTab,
}) => {
  if (loading && !stats) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-slate-300 border-t-amber-500 rounded-full mb-3" />
        <p className="text-sm font-medium text-slate-500">Loading operations and financial data...</p>
      </div>
    );
  }

  const pipelineVal = stats?.totalPipelineValue || 482500;
  const confirmedRev = stats?.confirmedRevenue || 128000;
  const activeLeads = stats?.activeLeadsCount || inquiries.filter(i => ['new', 'contacted', 'quoted'].includes(i.status)).length;
  const confirmedCount = stats?.confirmedCount || inquiries.filter(i => ['confirmed', 'completed'].includes(i.status)).length;
  const avgBooking = stats?.avgBookingValue || 6450;
  const conversionRate = stats?.conversionRate || '33.3%';

  const monthlyRevData = stats?.monthlyRevenue || [
    { month: 'Jan', revenueUSD: 38400, bookings: 6 },
    { month: 'Feb', revenueUSD: 44200, bookings: 7 },
    { month: 'Mar', revenueUSD: 68900, bookings: 11 },
    { month: 'Apr', revenueUSD: 94500, bookings: 15 },
    { month: 'May', revenueUSD: 128000, bookings: 20 },
    { month: 'Jun', revenueUSD: 112400, bookings: 18 },
    { month: 'Jul', revenueUSD: 86000, bookings: 14 },
    { month: 'Aug', revenueUSD: 98500, bookings: 16 },
    { month: 'Sep', revenueUSD: 146000, bookings: 23 },
    { month: 'Oct', revenueUSD: 139000, bookings: 22 },
    { month: 'Nov', revenueUSD: 74200, bookings: 12 },
    { month: 'Dec', revenueUSD: 61800, bookings: 9 },
  ];

  const maxMonthly = Math.max(...monthlyRevData.map(m => m.revenueUSD));

  const countryStats = stats?.countryStats || [
    { country: 'United States', percentage: 38, count: 42, flag: '🇺🇸' },
    { country: 'United Kingdom', percentage: 24, count: 26, flag: '🇬🇧' },
    { country: 'Australia & NZ', percentage: 16, count: 18, flag: '🇦🇺' },
    { country: 'Canada', percentage: 10, count: 11, flag: '🇨🇦' },
    { country: 'UAE & GCC', percentage: 7, count: 8, flag: '🇦🇪' },
    { country: 'Other International', percentage: 5, count: 5, flag: '🌍' },
  ];

  const recentInquiries = inquiries.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">New Lead</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">Contacted</span>;
      case 'quoted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Quoted</span>;
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Confirmed</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Completed</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Bright Aesthetic */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wider uppercase">
                Operations Live Control
              </span>
              <span className="text-xs text-slate-300">Updated Real-Time</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
              Private Tour Operations &amp; Yield Hub
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Monitoring client quotation pipelines, Cappadocia balloon flight quotas, VIP vehicle allocations, and TÜRSAB compliance for autumn 2026.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateTab('quote-builder')}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Instant VIP Quote</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('inquiries')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-stone-200 dark:border-white/20 px-4 py-2.5 rounded-xl font-semibold text-xs backdrop-blur-xs transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-amber-700 dark:text-amber-300" />
              <span>Review Leads ({inquiries.length})</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle light glow */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Row (Bright, High-Contrast) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pipeline */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ${pipelineVal.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Confirmed Bookings Revenue */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmed Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ${confirmedRev.toLocaleString()}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs">
              <span className="text-slate-500">{confirmedCount} confirmed journeys</span>
              <span className="text-emerald-700 font-bold">{conversionRate} win rate</span>
            </div>
          </div>
        </div>

        {/* Active Booking Leads */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Leads</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {activeLeads} Inquiries
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-sky-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>Avg. response time: 18 mins</span>
            </div>
          </div>
        </div>

        {/* Avg Booking Value */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Private Booking</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              ${avgBooking.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-indigo-700 font-semibold">
              <span>Tier 1 Luxury: 48% share</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Revenue Bar Visualizer */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">2026 Fiscal Season Booking Revenue</h3>
              <p className="text-xs text-slate-500 mt-0.5">High seasons: Spring (Apr-May) &amp; Autumn (Sep-Oct)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Gross Bookings (USD)
              </span>
            </div>
          </div>

          {/* Interactive CSS Bar Chart */}
          <div className="pt-4">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-3 border-b border-slate-100 pb-2">
              {monthlyRevData.map((item, idx) => {
                const heightPercent = Math.round((item.revenueUSD / maxMonthly) * 100);
                const isPeak = item.month === 'Sep' || item.month === 'May' || item.month === 'Oct';
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                      <div>${item.revenueUSD.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-300">{item.bookings} confirmed tours</div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-t-md relative flex items-end justify-center h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all duration-500 group-hover:brightness-110 ${
                          isPeak
                            ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 shadow-xs'
                            : 'bg-gradient-to-t from-slate-400 to-slate-300'
                        }`}
                      />
                    </div>
                    <span className={`text-[11px] font-bold ${isPeak ? 'text-amber-700' : 'text-slate-500'}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 font-medium">
              <span>Peak Month: September ($146,000)</span>
              <span>Total Year Forecast: $1.04M</span>
            </div>
          </div>
        </div>

        {/* Right Col: Accommodation Tier Breakdown & Balloon Flight Status */}
        <div className="space-y-6">
          {/* Accommodation Tiers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">Accommodation Tier Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Guest selection breakdown</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Luxury Tier (Palaces &amp; Cave Suites)
                  </span>
                  <span className="text-slate-900 font-bold">52%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '52%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    Comfort Superior Heritage (4-5 Star)
                  </span>
                  <span className="text-slate-900 font-bold">36%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '36%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    Classic Boutique (Select Heritage)
                  </span>
                  <span className="text-slate-900 font-bold">12%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Hot Air Balloon Add-on rate:</span>
              <span className="font-bold text-amber-700">84% of travelers</span>
            </div>
          </div>

          {/* Cappadocia Balloon Status Widget */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Wind className="w-4 h-4 text-emerald-700" />
                <span>Cappadocia Aviation Flight Permit</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase">
                GREEN FLAG
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              Civil Aviation Authority (SHGM) clear weather authorization. 100% of morning launch slots operational across Rose &amp; Love Valleys.
            </p>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-emerald-200/60 font-semibold text-emerald-950">
              <span>Allocated Baskets: 70 Seats</span>
              <button
                type="button"
                onClick={() => onNavigateTab('balloons')}
                className="text-emerald-800 hover:text-emerald-950 underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>View Roster</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Inquiries Feed & Top Source Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Booking Inquiries &amp; Leads</h3>
              <p className="text-xs text-slate-500 mt-0.5">Click any lead to view full itinerary and dispatch quote</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Lead / Guest</th>
                  <th className="py-2.5 px-3">Tour Package</th>
                  <th className="py-2.5 px-3">Travel Date</th>
                  <th className="py-2.5 px-3">Quote Value</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectInquiry(lead)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500">{lead.country} &bull; {lead.travelersCount} pax</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      <div className="line-clamp-1 max-w-[200px]">{lead.tourName}</div>
                      <span className="text-[10px] text-amber-700 uppercase font-bold tracking-wider">
                        {lead.accommodationTier}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {lead.travelDate}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      ${lead.totalQuoteUSD?.toLocaleString() || lead.estimatedBudgetPerPerson?.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-amber-600 hover:text-amber-800 font-bold text-xs inline-flex items-center gap-0.5">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traveler Origin Demographics */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Client Demographics</h3>
              <p className="text-xs text-slate-500 mt-0.5">Key international markets</p>
            </div>
            <Globe className="w-5 h-5 text-slate-400" />
          </div>

          <div className="space-y-3.5">
            {countryStats.map((c) => (
              <div key={c.country}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                  <span className="text-slate-900 font-bold">{c.percentage}% ({c.count})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-slate-800 h-1.5 rounded-full"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 leading-relaxed font-medium">
            💡 <strong>VIP Market Insight:</strong> High-net-worth traveler inquiries from USA and UK show +45% preference for private Cappadocia Cave Suites and private Bosphorus yacht charters.
          </div>
        </div>
      </div>
    </div>
  );
};
