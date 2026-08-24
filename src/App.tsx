import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Star, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal,
  ChevronRight,
  Plane,
  Heart,
  Award
} from 'lucide-react';
import { TOURS_DATA } from './data/toursData';
import { EXPERIENCES_DATA } from './data/experiencesData';
import { 
  TourPackage, 
  CurrencyCode, 
  AccommodationTierType, 
  AICustomItineraryResult, 
  SignatureExperience 
} from './types';
import { 
  getInitialTours, 
  getInitialExperiences, 
  fetchToursFromApi, 
  fetchExperiencesFromApi 
} from './utils/toursStorage';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStatsBanner } from './components/TrustStatsBanner';
import { TourCard } from './components/TourCard';
import { TourDetailModal } from './components/TourDetailModal';
import { CustomItineraryBuilder } from './components/CustomItineraryBuilder';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { InteractiveTurkeyMap } from './components/InteractiveTurkeyMap';
import { BalloonGuideSection } from './components/BalloonGuideSection';
import { AccommodationTiersSection } from './components/AccommodationTiersSection';
import { DestinationsGrid } from './components/DestinationsGrid';
import { ExperiencesSection } from './components/ExperiencesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { TravelGuideFaq } from './components/TravelGuideFaq';
import { BookingInquiryModal } from './components/BookingInquiryModal';
import { AIConciergeModal } from './components/AIConciergeModal';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/admin/AdminLayout';

export function App() {
  // View Router State: 'public' | 'admin'
  const [currentView, setCurrentView] = useState<'public' | 'admin'>(() => {
    return window.location.hash === '#admin' ? 'admin' : 'public';
  });

  // Dynamic Tours & Experiences State (Synced with Admin + Server API)
  const [tours, setTours] = useState<TourPackage[]>(() => getInitialTours());
  const [experiences, setExperiences] = useState<SignatureExperience[]>(() => getInitialExperiences());

  // Currency State
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>('USD');

  // Filter States
  const [selectedDestFilter, setSelectedDestFilter] = useState<string>('All');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<string>('All');

  // Modal States
  const [activeTourDetail, setActiveTourDetail] = useState<TourPackage | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false);

  // Inquiry pre-fill data
  const [inquiryTourTitle, setInquiryTourTitle] = useState<string | undefined>(undefined);
  const [inquiryTier, setInquiryTier] = useState<AccommodationTierType>('comfort');
  const [inquiryTravelers, setInquiryTravelers] = useState<number>(2);
  const [inquiryCustomDetails, setInquiryCustomDetails] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin' && window.location.hash !== '#admin') {
        setCurrentView('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  // Initial fetch from backend API
  useEffect(() => {
    const loadServerData = async () => {
      try {
        const [apiTours, apiExperiences] = await Promise.all([
          fetchToursFromApi(),
          fetchExperiencesFromApi(),
        ]);
        if (apiTours && apiTours.length > 0) setTours(apiTours);
        if (apiExperiences && apiExperiences.length > 0) setExperiences(apiExperiences);
      } catch (err) {
        console.warn('Using cached local data:', err);
      }
    };
    loadServerData();
  }, []);

  const handleSwitchToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const handleSwitchToPublic = () => {
    window.location.hash = '';
    setCurrentView('public');
  };

  // If Admin View is active, render the dedicated bright Admin Portal & Dashboard
  if (currentView === 'admin') {
    return (
      <AdminLayout
        onBackToSite={handleSwitchToPublic}
        tours={tours}
        experiences={experiences}
        onToursUpdated={(newTours) => setTours(newTours)}
        onExperiencesUpdated={(newExps) => setExperiences(newExps)}
        onOpenPublicTour={(tourId) => {
          handleSwitchToPublic();
          setTimeout(() => {
            const found = tours.find((t) => t.id === tourId);
            if (found) {
              setActiveTourDetail(found);
            }
          }, 150);
        }}
      />
    );
  }

  // Handle Quick Filter from Hero
  const handleQuickFilter = (dest: string, duration: string) => {
    setSelectedDestFilter(dest);
    setSelectedDurationFilter(duration);
  };

  // Filter Logic for Tours
  const filteredTours = tours.filter((tour) => {
    // Destination filter
    if (selectedDestFilter !== 'All') {
      const matchDest = tour.destinations.some((d) =>
        d.toLowerCase().includes(selectedDestFilter.toLowerCase())
      );
      if (!matchDest) return false;
    }

    // Duration filter
    if (selectedDurationFilter === '3-5') {
      if (tour.durationDays > 5) return false;
    } else if (selectedDurationFilter === '7-10') {
      if (tour.durationDays < 7 || tour.durationDays > 10) return false;
    } else if (selectedDurationFilter === '12-21') {
      if (tour.durationDays < 11) return false;
    }

    return true;
  });

  // Open Inquiry with specific tour
  const handleOpenInquiryForTour = (tour: TourPackage) => {
    setInquiryTourTitle(tour.title);
    setInquiryTier('comfort');
    setInquiryTravelers(2);
    setInquiryCustomDetails('');
    setInquiryModalOpen(true);
  };

  // Open Inquiry with specific custom AI plan
  const handleOpenInquiryWithCustomPlan = (
    customPlan: AICustomItineraryResult,
    tier: AccommodationTierType,
    travelers: number
  ) => {
    setInquiryTourTitle(`Custom AI Proposal: ${customPlan.tourTitle}`);
    setInquiryTier(tier);
    setInquiryTravelers(travelers);
    setInquiryCustomDetails(
      `AI Generated Route: ${customPlan.summary} (${customPlan.recommendedMonths})\nKey inclusions: ${customPlan.highlightExperiences.join(', ')}`
    );
    setInquiryModalOpen(true);
  };

  // Add experience to inquiry
  const handleAddExperienceToInquiry = (exp: SignatureExperience) => {
    setInquiryTourTitle(`Custom Request with Experience: ${exp.title}`);
    setInquiryTier('comfort');
    setInquiryTravelers(2);
    setInquiryCustomDetails(`Requested Signature Add-on: ${exp.title} (${exp.location}) - ${exp.duration}`);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col">
      {/* Top Luxury Navigation */}
      <Navbar
        activeCurrency={activeCurrency}
        onSelectCurrency={setActiveCurrency}
        onOpenCustomPlanner={() => {
          const el = document.getElementById('custom-planner');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiryModal={(tourTitle) => {
          setInquiryTourTitle(tourTitle);
          setInquiryModalOpen(true);
        }}
        onOpenConcierge={() => setConciergeModalOpen(true)}
        onOpenAdmin={handleSwitchToAdmin}
        activeSection="home"
      />

      {/* Main Hero with Cinematic Imagery & Search */}
      <main className="flex-1">
        <HeroSection
          activeCurrency={activeCurrency}
          onOpenCustomPlanner={() => {
            const el = document.getElementById('custom-planner');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenInquiryModal={(tourTitle) => {
            setInquiryTourTitle(tourTitle);
            setInquiryModalOpen(true);
          }}
          onQuickFilter={handleQuickFilter}
        />

        {/* TÜRSAB License & Trust Stats Bar */}
        <TrustStatsBanner />

        {/* WHY CHOOSE US - UNIQUE VALUE PROPOSITIONS & GUARANTEES */}
        <WhyChooseUsSection
          onOpenInquiry={() => {
            setInquiryTourTitle('Custom Bespoke Private Journey Proposal');
            setInquiryModalOpen(true);
          }}
          onOpenCustomPlanner={() => {
            const el = document.getElementById('custom-planner');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* FEATURED SIGNATURE TOURS SECTION (BENTO GRID STYLING) */}
        <section id="tours" className="py-16 md:py-24 bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-[#FDFCF8] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            {/* Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 dark:bg-[#D4AF37]/10 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-[#D4AF37]" />
                  <span>100% Private Itineraries</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                  Featured Signature Turkey Tours
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light mt-1 max-w-2xl">
                  Each journey is private for your party, featuring dedicated licensed scholar historians, VIP Mercedes chauffeurs, handpicked boutique cave suites, and pre-arranged domestic flights.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDestFilter('All');
                    setSelectedDurationFilter('All');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDestFilter === 'All' && selectedDurationFilter === 'All'
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                      : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                  }`}
                >
                  All Tours ({tours.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDestFilter('Istanbul')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDestFilter === 'Istanbul'
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                      : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                  }`}
                >
                  Istanbul
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDestFilter('Cappadocia')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDestFilter === 'Cappadocia'
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                      : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                  }`}
                >
                  Cappadocia
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDestFilter('Ephesus')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDestFilter === 'Ephesus'
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                      : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                  }`}
                >
                  Ephesus
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDestFilter('Turquoise Coast')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDestFilter === 'Turquoise Coast'
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                      : 'bg-white dark:bg-[#161C24] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                  }`}
                >
                  Gulet Cruise
                </button>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  activeCurrency={activeCurrency}
                  onSelectTour={(t) => setActiveTourDetail(t)}
                  onQuickInquiry={handleOpenInquiryForTour}
                />
              ))}
            </div>

            {/* Custom CTA Bento Card */}
            <div className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-stone-900 dark:text-white p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] text-xs font-extrabold uppercase tracking-wider">
                  Bespoke Flexibility
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white mt-2">
                  Want to modify any route, add days, or swap destinations?
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-xl font-light">
                  Every tour can be customized 100% to your schedule, pace, family needs, dietary preferences, or honeymoon requests.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('custom-planner');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Customize Itinerary with AI</span>
              </button>
            </div>
          </div>
        </section>

        {/* AI CUSTOM ITINERARY BUILDER */}
        <CustomItineraryBuilder
          activeCurrency={activeCurrency}
          onOpenInquiryWithCustomPlan={handleOpenInquiryWithCustomPlan}
        />

        {/* INTERACTIVE TURKEY MAP & ROUTES */}
        <InteractiveTurkeyMap
          onSelectDestination={(destName) => {
            setSelectedDestFilter(destName);
            const el = document.getElementById('tours');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenInquiryForTour={(tourTitle) => {
            setInquiryTourTitle(tourTitle);
            setInquiryModalOpen(true);
          }}
        />

        {/* CAPPADOCIA SUNRISE HOT AIR BALLOON GUIDE */}
        <BalloonGuideSection
          activeCurrency={activeCurrency}
          onOpenInquiry={(title) => {
            setInquiryTourTitle(title || 'Cappadocia Sunrise Balloon Flight');
            setInquiryModalOpen(true);
          }}
        />

        {/* 3 ACCOMMODATION TIERS SECTION */}
        <AccommodationTiersSection />

        {/* ICONIC TURKISH DESTINATIONS */}
        <DestinationsGrid
          onFilterByDestination={(destName) => {
            setSelectedDestFilter(destName);
            const el = document.getElementById('tours');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SIGNATURE EXPERIENCES & MASTERCLASSES */}
        <ExperiencesSection
          activeCurrency={activeCurrency}
          onAddExperienceToInquiry={handleAddExperienceToInquiry}
          experiences={experiences}
        />

        {/* VERIFIED TRAVELER REVIEWS */}
        <ReviewsSection />

        {/* TRAVEL GUIDE, PACKING & FAQS */}
        <TravelGuideFaq />
      </main>

      {/* LUXURY FOOTER */}
      <Footer
        onOpenCustomPlanner={() => {
          const el = document.getElementById('custom-planner');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiryModal={() => setInquiryModalOpen(true)}
        onOpenConcierge={() => setConciergeModalOpen(true)}
        onOpenAdmin={handleSwitchToAdmin}
      />

      {/* MODAL 1: Day-by-Day Tour Detail Modal */}
      <TourDetailModal
        tour={activeTourDetail}
        activeCurrency={activeCurrency}
        onClose={() => setActiveTourDetail(null)}
        onOpenInquiry={(tourTitle, tier, travelers) => {
          setInquiryTourTitle(tourTitle);
          setInquiryTier(tier);
          setInquiryTravelers(travelers);
          setInquiryModalOpen(true);
        }}
      />

      {/* MODAL 2: Booking / Bespoke Quote Request Modal */}
      <BookingInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialTourTitle={inquiryTourTitle}
        initialTier={inquiryTier}
        initialTravelers={inquiryTravelers}
        initialCustomDetails={inquiryCustomDetails}
      />

      {/* MODAL 3: AI Concierge Assistant Modal ("Aylin") */}
      <AIConciergeModal
        isOpen={conciergeModalOpen}
        onClose={() => setConciergeModalOpen(false)}
      />

      {/* Floating Bottom-Right Quick Action Widget */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* WhatsApp direct chat button */}
        <a
          href="https://wa.me/905448362845?text=Hello%2C%20I%20am%20interested%20in%20a%20private%20tour%20with%20Signature%20Turkey%20Tours"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-600 hover:bg-emerald-500 text-stone-900 dark:text-white rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer border border-emerald-400/40"
          title="WhatsApp Concierge (+90 544 836 28 45)"
        >
          <Phone className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
            WhatsApp Live Concierge
          </span>
        </a>

        {/* AI Travel Concierge Floating Trigger */}
        <button
          type="button"
          id="floating-ai-concierge-btn"
          onClick={() => setConciergeModalOpen(true)}
          className="px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 text-xs cursor-pointer border border-amber-300"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>Ask AI Concierge</span>
        </button>
      </div>
    </div>
  );
}

export default App;
