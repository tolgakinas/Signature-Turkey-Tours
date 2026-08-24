import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Compass,
  Wind,
  Star,
  FileText,
  Settings,
  ArrowLeft,
  Search,
  Bell,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Globe,
  Sparkles,
  TrendingUp,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { AdminOverviewDashboard } from './AdminOverviewDashboard';
import { AdminInquiriesManager } from './AdminInquiriesManager';
import { AdminToursManager } from './AdminToursManager';
import { AdminBalloonLogistics } from './AdminBalloonLogistics';
import { AdminReviewsModerator } from './AdminReviewsModerator';
import { AdminQuickQuoteBuilder } from './AdminQuickQuoteBuilder';
import { AdminSettingsCompliance } from './AdminSettingsCompliance';
import { AdminStatsData, AdminInquiryLead, TourPackage, SignatureExperience } from '../../types';

export type AdminTab = 'overview' | 'inquiries' | 'tours' | 'balloons' | 'reviews' | 'quote-builder' | 'settings';

interface AdminLayoutProps {
  onBackToSite: () => void;
  onOpenPublicTour?: (tourId: string) => void;
  tours?: TourPackage[];
  experiences?: SignatureExperience[];
  onToursUpdated?: (tours: TourPackage[]) => void;
  onExperiencesUpdated?: (experiences: SignatureExperience[]) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  onBackToSite, 
  onOpenPublicTour,
  tours,
  experiences,
  onToursUpdated,
  onExperiencesUpdated
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [inquiries, setInquiries] = useState<AdminInquiryLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState<AdminInquiryLead | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, inqRes] = await Promise.all([
        fetch('/api/admin/stats').catch(() => null),
        fetch('/api/admin/inquiries').catch(() => null),
      ]);

      if (statsRes && statsRes.ok) {
        const data = await statsRes.json();
        if (data.success) {
          setStats(data.stats);
        }
      }

      if (inqRes && inqRes.ok) {
        const data = await inqRes.json();
        if (data.success) {
          setInquiries(data.inquiries);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string; color?: string }[] = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { 
      id: 'inquiries', 
      label: 'Bookings & Leads', 
      icon: Users, 
      badge: inquiries.filter(i => i.status === 'new').length || undefined,
      color: 'bg-rose-500 text-white'
    },
    { id: 'tours', label: 'Tours & Excursions Editor', icon: Compass, badge: 'Editable', color: 'bg-amber-100 text-amber-900' },
    { id: 'balloons', label: 'Balloon Slots & Fleet', icon: Wind, badge: 'Active', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'quote-builder', label: 'Instant Quote Creator', icon: Sparkles },
    { id: 'reviews', label: 'Reviews & Reputation', icon: Star },
    { id: 'settings', label: 'Agency & TÜRSAB Setup', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bright Admin Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Branding & Portal Badge */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBackToSite}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Return to public guest storefront"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" />
                <span>Return to Website</span>
              </button>

              <div className="h-5 w-px bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-sm shadow-xs">
                  ✦
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-bold text-slate-900 tracking-tight">
                      SIGNATURE TURKEY TOURS
                    </h1>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
                      Admin Portal
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    TÜRSAB Licensed Operator #15764-A &bull; Operations & Yield Control
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Live Metrics & Action */}
            <div className="flex items-center gap-3">
              {/* Quick Pipeline Badge */}
              {stats && (
                <div className="hidden md:flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-800">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pipeline: ${stats.totalPipelineValue.toLocaleString()}</span>
                  <span className="text-emerald-500">|</span>
                  <span>{stats.confirmedCount} Confirmed</span>
                </div>
              )}

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => {
                  fetchDashboardData();
                  showToast('Dashboard data refreshed with live server state.');
                }}
                className={`p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors ${loading ? 'animate-spin' : ''}`}
                title="Refresh Live Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={() => setNewLeadModalOpen(true)}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs hover:shadow transition-all"
              >
                <Plus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">New Booking Lead</span>
                <span className="sm:hidden">New Lead</span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center ring-2 ring-amber-200">
                  AD
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-800">Aylin Demir</div>
                  <div className="text-[10px] text-slate-500">Lead Specialist</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-100">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${tab.color || 'bg-slate-200 text-slate-700'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Admin Tab View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <AdminOverviewDashboard
            stats={stats}
            inquiries={inquiries}
            loading={loading}
            onSelectInquiry={(inq) => {
              setSelectedLeadForDrawer(inq);
              setActiveTab('inquiries');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'inquiries' && (
          <AdminInquiriesManager
            inquiries={inquiries}
            onRefresh={fetchDashboardData}
            onShowToast={showToast}
            selectedLead={selectedLeadForDrawer}
            onClearSelectedLead={() => setSelectedLeadForDrawer(null)}
            newLeadModalOpen={newLeadModalOpen}
            onCloseNewLeadModal={() => setNewLeadModalOpen(false)}
            onOpenNewLeadModal={() => setNewLeadModalOpen(true)}
          />
        )}

        {activeTab === 'tours' && (
          <AdminToursManager
            onShowToast={showToast}
            onOpenPublicTour={onOpenPublicTour}
            tours={tours}
            experiences={experiences}
            onToursUpdated={onToursUpdated}
            onExperiencesUpdated={onExperiencesUpdated}
          />
        )}

        {activeTab === 'balloons' && (
          <AdminBalloonLogistics
            onShowToast={showToast}
          />
        )}

        {activeTab === 'quote-builder' && (
          <AdminQuickQuoteBuilder
            onShowToast={showToast}
            onLeadCreated={() => {
              fetchDashboardData();
              setActiveTab('inquiries');
            }}
          />
        )}

        {activeTab === 'reviews' && (
          <AdminReviewsModerator
            onShowToast={showToast}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettingsCompliance
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Signature Turkey Tours Operations Engine</span>
            <span>&bull;</span>
            <span>Express Node + React API Live</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>TÜRSAB #15764-A</span>
            <span>&bull;</span>
            <span>Confidential Executive Dashboard</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
