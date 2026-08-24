import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown, 
  Globe,
  Star,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/currency';

interface NavbarProps {
  activeCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  onOpenCustomPlanner: () => void;
  onOpenInquiryModal: (tourTitle?: string) => void;
  onOpenConcierge: () => void;
  onOpenAdmin?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCurrency,
  onSelectCurrency,
  onOpenCustomPlanner,
  onOpenInquiryModal,
  onOpenConcierge,
  onOpenAdmin,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial theme
    if (localStorage.theme === 'light' || (!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  type NavLink = {
    label: string;
    href: string;
    highlight?: boolean;
  };

  const primaryLinks: NavLink[] = [
    { label: 'Signature Tours', href: '#tours' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'AI Trip Designer', href: '#custom-planner', highlight: true },
  ];

  const moreLinks: NavLink[] = [
    { label: 'Interactive Map', href: '#routes-map' },
    { label: 'Hot Air Balloons', href: '#balloons' },
    { label: 'Hotel Tiers', href: '#tiers' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Travel Guide', href: '#guide' },
  ];

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div className="bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 text-xs py-2 px-4 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-end items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              TÜRSAB Licensed Tour Operator (License #15764-A)
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-stone-600 dark:text-stone-300">
              <Star className="w-3 h-3 text-amber-600 dark:text-amber-400 fill-amber-400" />
              5.0 / 5.0 Rating from 450+ Verified Private Travelers
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/905448362845?text=Hello%2C%20I%20am%20interested%20in%20a%20private%20tour%20with%20Signature%20Turkey%20Tours" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>WhatsApp Concierge: +90 544 836 28 45</span>
            </a>

            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button
                type="button"
                id="admin-portal-top-btn"
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-2.5 py-0.5 rounded border border-amber-600/50 text-xs font-bold transition-colors cursor-pointer"
                title="Open Operations Admin Panel & Dashboard"
              >
                <Award className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-stone-600 dark:text-stone-300 hover:text-white bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                id="currency-selector-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-stone-800 dark:text-stone-200 hover:text-white bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 text-xs font-semibold cursor-pointer"
              >
                <Globe className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>{CURRENCIES[activeCurrency].label}</span>
                <ChevronDown className="w-3 h-3 text-stone-500 dark:text-stone-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-md shadow-xl py-1 z-50">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        onSelectCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-950/50 ${
                        activeCurrency === code ? 'text-amber-600 dark:text-amber-400 font-bold bg-stone-100 dark:bg-stone-800' : 'text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      <span>{CURRENCIES[code].label}</span>
                      <span className="text-stone-500 dark:text-stone-400 font-mono">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white dark:bg-stone-900/95 backdrop-blur-md shadow-md text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-800 py-3'
            : 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white border-b border-stone-200 dark:border-stone-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-900/30 text-stone-950 font-display-royal font-bold text-lg border border-amber-300/40">
              ✦
            </div>
            <div>
              <div className="font-display-royal font-bold tracking-widest text-lg md:text-xl text-amber-700 dark:text-amber-300 uppercase leading-tight group-hover:text-amber-200 transition-colors">
                SIGNATURE
              </div>
              <div className="text-[10px] tracking-[0.25em] text-stone-600 dark:text-stone-300 uppercase font-medium">
                TURKEY TOURS &bull; BESPOKE LUXURY
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  link.highlight
                    ? 'text-amber-700 dark:text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:text-white'
                }`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />}
                {link.label}
              </a>
            ))}

            {/* "More" Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-white transition-colors py-1 outline-none">
                More <ChevronDown className="w-4 h-4 text-stone-500 dark:text-stone-400 group-hover:text-stone-600 dark:text-stone-300 transition-colors" />
              </button>
              <div className="absolute top-full right-0 pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-2xl py-2 flex flex-col">
                  {moreLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:text-amber-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="concierge-nav-btn"
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-white bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 px-3 py-2 rounded-lg font-medium transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Ask AI Concierge</span>
            </button>

            <button
              type="button"
              id="tailor-trip-nav-btn"
              onClick={onOpenCustomPlanner}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-4 py-2 rounded-lg shadow-md shadow-amber-900/30 hover:shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailor My Private Trip</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 mt-3 space-y-3">
            <div className="grid grid-cols-1 gap-2 pt-2">
              {[...primaryLinks, ...moreLinks].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 flex items-center justify-between text-sm"
                >
                  <span className={link.highlight ? 'text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1.5' : ''}>
                    {link.highlight && <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-950/60 border border-amber-600/40 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Operations Admin Panel &amp; Dashboard</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Ask AI Travel Concierge</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomPlanner();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tailor My Private Trip (Free Quote)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
