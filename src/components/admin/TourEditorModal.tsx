import React, { useState } from 'react';
import {
  X,
  Compass,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
  Save,
  Tag,
  HelpCircle,
  Eye,
  AlertCircle,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MoveUp,
  MoveDown,
  Building2,
  Utensils,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import { TourPackage, DayItinerary, TierPrice } from '../../types';

interface TourEditorModalProps {
  tour: TourPackage | null; // null if creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (tour: TourPackage, isNew: boolean) => void;
}

const PRESET_TOUR_HEROES = [
  { label: 'Cappadocia Balloons Dawn', url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Istanbul Hagia Sophia & Bosphorus', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Pamukkale Travertines', url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Ephesus Celsus Library', url: 'https://images.unsplash.com/photo-1594988376714-411a76c8c4a1?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Turquoise Coast Riviera & Gulet', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Göbeklitepe Ancient Monoliths', url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80' },
];

export const TourEditorModal: React.FC<TourEditorModalProps> = ({
  tour,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isNew = !tour;

  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'itinerary' | 'highlights' | 'inclusions'>('general');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TourPackage>(() => {
    if (tour) {
      return JSON.parse(JSON.stringify(tour));
    }
    return {
      id: `tour-${Date.now().toString().slice(-4)}`,
      title: '',
      tagline: '',
      badge: 'Signature Private Journey',
      durationDays: 8,
      durationNights: 7,
      destinations: ['Istanbul', 'Cappadocia'],
      startingCity: 'Istanbul (IST / SAW)',
      endingCity: 'Istanbul / Izmir',
      heroImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
      ],
      overview: '',
      pricePerPersonUSD: {
        classic: 2950,
        comfort: 3950,
        luxury: 5950,
      },
      ratings: {
        score: 4.98,
        reviewCount: 48,
      },
      highlights: [
        'Private dawn hot air balloon flight over Cappadocia valleys',
        'Private scholar-guided walk through Hagia Sophia & Basilica Cistern',
        'Sunset yacht cruise along the Bosphorus Strait',
      ],
      included: [
        'All private airport meet & greet with Mercedes VIP transfers',
        'Dedicated licensed English-speaking historian private guide',
        'All internal domestic flight tickets with baggage allowances',
        'Daily Turkish gourmet breakfast + curated lunch stops during touring',
        'All museum entrance tickets with VIP skip-the-line privileges',
        '24/7 dedicated on-ground WhatsApp concierge assistance in Turkey',
      ],
      excluded: [
        'International flights to/from Turkey',
        'Personal travel insurance',
        'Dinners not specified in itinerary',
      ],
      itinerary: [
        {
          day: 1,
          location: 'Istanbul',
          title: 'Arrival in Istanbul & Bosphorus Welcome',
          description: 'Private airport meet and greet with VIP Mercedes transfer to your hotel. Evening orientation along the Golden Horn.',
          morning: 'VIP airport transfer and check-in to your selected hotel.',
          afternoon: 'Gentle orientation walk through historic Galata and Karaköy quarters.',
          evening: 'Welcome dinner at an authentic Ottoman terrace overlooking the Bosphorus.',
          includedMeals: ['Dinner'],
          recommendedHotel: {
            classic: 'Sirkeci Mansion Boutique Hotel',
            comfort: 'Boutique Saint Sophia or Hagia Sofia Mansions',
            luxury: 'Çırağan Palace Kempinski or Four Seasons Bosphorus',
          },
          highlights: ['Private VIP Mercedes Transfer', 'Bosphorus Twilight Welcome'],
          insiderTip: 'Rest up after your flight; try a traditional Turkish apple tea on the terrace.',
        },
        {
          day: 2,
          location: 'Istanbul',
          title: 'Imperial Byzantine & Ottoman Treasures',
          description: 'Full day private scholar-led exploration of Hagia Sophia, Blue Mosque, Basilica Cistern, and Topkapi Palace.',
          morning: 'Private early-access visit to Hagia Sophia and Basilica Cistern before crowds.',
          afternoon: 'Explore Topkapi Palace Imperial Harem and the Blue Mosque.',
          evening: 'Private sunset yacht cruise along the Bosphorus with Turkish mezze.',
          includedMeals: ['Breakfast', 'Lunch'],
          recommendedHotel: {
            classic: 'Sirkeci Mansion Boutique Hotel',
            comfort: 'Boutique Saint Sophia',
            luxury: 'Çırağan Palace Kempinski',
          },
          highlights: ['Hagia Sophia', 'Basilica Cistern', 'Topkapi Harem', 'Private Yacht Cruise'],
          insiderTip: 'Wear slip-on shoes for comfortable entry to historical mosques.',
        },
      ],
      recommendedSeason: 'April – June & September – November',
      idealFor: ['Couples', 'Culture Lovers', 'Families', 'First-Timers'],
      physicalRating: 'Moderate',
    };
  });

  // Highlight, Inclusion, Exclusion temp states
  const [newHighlightText, setNewHighlightText] = useState('');
  const [newInclusionText, setNewInclusionText] = useState('');
  const [newExclusionText, setNewExclusionText] = useState('');
  const [newDestinationText, setNewDestinationText] = useState('');
  const [newIdealForText, setNewIdealForText] = useState('');

  // Expandable day editor accordion
  const [expandedDayIndex, setExpandedDayIndex] = useState<number | null>(0);

  // Day Operations
  const handleAddDay = () => {
    const nextDayNum = formData.itinerary.length + 1;
    const newDay: DayItinerary = {
      day: nextDayNum,
      location: formData.destinations[0] || 'Cappadocia',
      title: `Day ${nextDayNum}: Custom Exploration`,
      description: 'Full day private guided exploration.',
      morning: 'Morning private touring with licensed historian guide.',
      afternoon: 'Afternoon cultural discovery and local craft tasting.',
      evening: 'Evening at leisure or authentic regional dining.',
      includedMeals: ['Breakfast'],
      recommendedHotel: {
        classic: 'Selected 4-Star Heritage Boutique',
        comfort: 'Premium Restored Cave / Boutique Hotel',
        luxury: '5-Star Luxury Palace / Cave Suite',
      },
      highlights: ['Private Historian Guided Touring'],
      insiderTip: 'Keep your camera ready for remarkable vistas.',
    };

    setFormData((prev) => ({
      ...prev,
      durationDays: Math.max(prev.durationDays, nextDayNum),
      durationNights: Math.max(prev.durationNights, nextDayNum - 1),
      itinerary: [...prev.itinerary, newDay],
    }));
    setExpandedDayIndex(formData.itinerary.length);
  };

  const handleRemoveDay = (index: number) => {
    if (formData.itinerary.length <= 1) {
      alert('A tour must contain at least 1 day in its itinerary.');
      return;
    }
    const updated = formData.itinerary
      .filter((_, i) => i !== index)
      .map((d, i) => ({ ...d, day: i + 1 }));

    setFormData((prev) => ({
      ...prev,
      itinerary: updated,
      durationDays: updated.length,
      durationNights: Math.max(1, updated.length - 1),
    }));
    setExpandedDayIndex(null);
  };

  const handleMoveDay = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.itinerary.length) return;

    const list = [...formData.itinerary];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // re-index days
    const reindexed = list.map((d, i) => ({ ...d, day: i + 1 }));
    setFormData((prev) => ({ ...prev, itinerary: reindexed }));
    setExpandedDayIndex(targetIndex);
  };

  const handleUpdateDayField = (index: number, field: keyof DayItinerary, val: any) => {
    const updated = [...formData.itinerary];
    updated[index] = {
      ...updated[index],
      [field]: val,
    };
    setFormData((prev) => ({ ...prev, itinerary: updated }));
  };

  const handleToggleDayMeal = (dayIdx: number, meal: 'Breakfast' | 'Lunch' | 'Dinner') => {
    const day = formData.itinerary[dayIdx];
    const meals = [...(day.includedMeals || [])];
    const exists = meals.includes(meal);
    const updatedMeals = exists ? meals.filter((m) => m !== meal) : [...meals, meal];
    handleUpdateDayField(dayIdx, 'includedMeals', updatedMeals);
  };

  const handleUpdateHotel = (dayIdx: number, tier: 'classic' | 'comfort' | 'luxury', hotelName: string) => {
    const day = formData.itinerary[dayIdx];
    const updatedHotel = {
      ...(day.recommendedHotel || { classic: '', comfort: '', luxury: '' }),
      [tier]: hotelName,
    };
    handleUpdateDayField(dayIdx, 'recommendedHotel', updatedHotel);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a title for this tour package.');
      setActiveTab('general');
      return;
    }
    if (formData.durationDays <= 0) {
      setError('Tour duration must be at least 1 day.');
      setActiveTab('general');
      return;
    }
    if (!formData.itinerary || formData.itinerary.length === 0) {
      setError('Tour must contain at least 1 day in its itinerary breakdown.');
      setActiveTab('itinerary');
      return;
    }

    onSave(formData, isNew);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white">
                {isNew ? 'Create New Signature Tour Package' : `Edit Tour: ${formData.title || 'Tour Package'}`}
              </h2>
              <p className="text-xs text-slate-400">
                Manage itineraries, day-by-day activities, tiered rates, hotels & highlights.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'general', label: '1. General & Media' },
            { id: 'pricing', label: '2. Tier Pricing ($ USD)' },
            { id: 'itinerary', label: `3. Day-by-Day Itinerary (${formData.itinerary.length} Days)` },
            { id: 'highlights', label: `4. Highlights (${formData.highlights.length})` },
            { id: 'inclusions', label: '5. Inclusions & Exclusions' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: GENERAL & MEDIA */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Title */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Tour Package Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 10-Day Classic Signature Turkey Tour"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                    required
                  />
                </div>

                {/* Tagline */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. The timeless journey through Istanbul, Cappadocia, Pamukkale & Ephesus"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Badge / Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Most Popular for First-Timers"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                {/* Physical Rating */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Physical Rating
                  </label>
                  <select
                    value={formData.physicalRating}
                    onChange={(e) => setFormData({ ...formData, physicalRating: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                  >
                    <option value="Easy">Easy (Gentle walking, fully chauffeured)</option>
                    <option value="Moderate">Moderate (Cobblestone walks & ruins)</option>
                    <option value="Active">Active (Valley hikes, extended steps)</option>
                  </select>
                </div>

                {/* Duration Days & Nights */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Duration (Days / Nights)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={formData.durationDays}
                        onChange={(e) => {
                          const days = Number(e.target.value) || 1;
                          setFormData({
                            ...formData,
                            durationDays: days,
                            durationNights: Math.max(0, days - 1),
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                      />
                      <span className="absolute right-3 top-2.5 text-[11px] text-slate-400 font-semibold">Days</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={formData.durationNights}
                        onChange={(e) => setFormData({ ...formData, durationNights: Number(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                      />
                      <span className="absolute right-3 top-2.5 text-[11px] text-slate-400 font-semibold">Nights</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Season */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Best Season
                  </label>
                  <input
                    type="text"
                    value={formData.recommendedSeason}
                    onChange={(e) => setFormData({ ...formData, recommendedSeason: e.target.value })}
                    placeholder="e.g. April – June & September – November"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                {/* Starting & Ending City */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Starting Point
                  </label>
                  <input
                    type="text"
                    value={formData.startingCity}
                    onChange={(e) => setFormData({ ...formData, startingCity: e.target.value })}
                    placeholder="e.g. Istanbul (IST / SAW)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Ending Point
                  </label>
                  <input
                    type="text"
                    value={formData.endingCity}
                    onChange={(e) => setFormData({ ...formData, endingCity: e.target.value })}
                    placeholder="e.g. Istanbul / Izmir"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                {/* Destinations Included */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Destinations Covered in Tour ({formData.destinations.length})
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.destinations.map((dest, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
                      >
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{dest}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              destinations: formData.destinations.filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-amber-700 hover:text-rose-600 ml-1 cursor-pointer"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newDestinationText}
                      onChange={(e) => setNewDestinationText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newDestinationText.trim()) {
                            setFormData({
                              ...formData,
                              destinations: [...formData.destinations, newDestinationText.trim()],
                            });
                            setNewDestinationText('');
                          }
                        }
                      }}
                      placeholder="Add a destination (e.g. Cappadocia, Ephesus, Antalya)..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newDestinationText.trim()) {
                          setFormData({
                            ...formData,
                            destinations: [...formData.destinations, newDestinationText.trim()],
                          });
                          setNewDestinationText('');
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="md:col-span-2 space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Hero Cover Image URL *
                  </label>
                  <div className="relative">
                    <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="url"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-900"
                      required
                    />
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500">Quick Scenic Presets:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {PRESET_TOUR_HEROES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, heroImage: preset.url })}
                          className="text-left px-2.5 py-1 rounded-lg bg-white hover:bg-amber-50 hover:border-amber-300 border border-slate-200 text-[11px] text-slate-700 truncate transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overview narrative */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Tour Overview &amp; Narrative Story
                  </label>
                  <textarea
                    rows={4}
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    placeholder="Describe the overarching narrative of this luxury journey..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed"
                  />
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PRICING TIERS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>3-Tier Transparent Pricing Structure</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Enter baseline rates in USD per person based on double occupancy (2 adult travelers). 
                  Guest discounts (5% for 4-5 pax, 10% for 6-8 pax, 15% for 9+ pax) calculate automatically on the public storefront.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Classic */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Classic Tier
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      4★ Hand-Picked
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Quality historic 4-star boutique hotels & standard private touring.
                  </p>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">Rate (USD / person):</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="number"
                        min="100"
                        value={formData.pricePerPersonUSD.classic}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pricePerPersonUSD: {
                              ...formData.pricePerPersonUSD,
                              classic: Number(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Comfort */}
                <div className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-sm space-y-3 relative">
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Comfort Tier
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold">
                      Superior Heritage
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Authentic luxury cave suites & premier heritage mansions.
                  </p>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">Rate (USD / person):</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                      <input
                        type="number"
                        min="100"
                        value={formData.pricePerPersonUSD.comfort}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pricePerPersonUSD: {
                              ...formData.pricePerPersonUSD,
                              comfort: Number(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-400 text-sm font-bold text-slate-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Luxury */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Luxury Tier
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                      5★ Ottoman Palace
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Çırağan Palace Kempinski, Museum Hotel Imperial Suites & VIP yachts.
                  </p>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">Rate (USD / person):</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-indigo-600 absolute left-3 top-3" />
                      <input
                        type="number"
                        min="100"
                        value={formData.pricePerPersonUSD.luxury}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pricePerPersonUSD: {
                              ...formData.pricePerPersonUSD,
                              luxury: Number(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DAY-BY-DAY ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Day-by-Day Journey Breakdown ({formData.itinerary.length} Days)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define morning, afternoon, evening activities, included meals, and recommended hotels for each day.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddDay}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Next Day</span>
                </button>
              </div>

              {/* Days List */}
              <div className="space-y-3">
                {formData.itinerary.map((day, idx) => {
                  const isExpanded = expandedDayIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all ${
                        isExpanded
                          ? 'bg-slate-50/70 border-amber-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Accordion Bar */}
                      <div
                        onClick={() => setExpandedDayIndex(isExpanded ? null : idx)}
                        className="px-5 py-3.5 flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                            {day.day}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                              <span>{day.title || `Day ${day.day}`}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-slate-200 text-slate-700">
                                {day.location || 'Location'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {day.description || 'Click to configure morning, afternoon, and evening details...'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveDay(idx, 'up');
                            }}
                            disabled={idx === 0}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                            title="Move Day Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveDay(idx, 'down');
                            }}
                            disabled={idx === formData.itinerary.length - 1}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                            title="Move Day Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveDay(idx);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 cursor-pointer"
                            title="Delete Day"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-px h-4 bg-slate-200 mx-1" />
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {/* Accordion Expanded Content */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-200/80 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Day Title */}
                            <div className="space-y-1">
                              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                                Day Title *
                              </label>
                              <input
                                type="text"
                                value={day.title}
                                onChange={(e) => handleUpdateDayField(idx, 'title', e.target.value)}
                                placeholder="e.g. Sunrise Balloon Flight & Underground City"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                              />
                            </div>

                            {/* Location */}
                            <div className="space-y-1">
                              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                                Location *
                              </label>
                              <input
                                type="text"
                                value={day.location}
                                onChange={(e) => handleUpdateDayField(idx, 'location', e.target.value)}
                                placeholder="e.g. Cappadocia (Goreme)"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                              />
                            </div>

                            {/* Summary description */}
                            <div className="sm:col-span-2 space-y-1">
                              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                                Day Summary Overview
                              </label>
                              <textarea
                                rows={2}
                                value={day.description}
                                onChange={(e) => handleUpdateDayField(idx, 'description', e.target.value)}
                                placeholder="Brief 1-2 sentence overview of the day's highlights..."
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                              />
                            </div>

                            {/* Morning / Afternoon / Evening activities */}
                            <div className="sm:col-span-2 space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                              
                              {/* Morning */}
                              <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase">
                                  <Sun className="w-3.5 h-3.5" />
                                  <span>Morning Schedule</span>
                                </label>
                                <textarea
                                  rows={2}
                                  value={day.morning}
                                  onChange={(e) => handleUpdateDayField(idx, 'morning', e.target.value)}
                                  placeholder="e.g. Dawn hot air balloon flight over Rose Valley, followed by champagne breakfast..."
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                                />
                              </div>

                              {/* Afternoon */}
                              <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 uppercase">
                                  <Sunset className="w-3.5 h-3.5" />
                                  <span>Afternoon Schedule</span>
                                </label>
                                <textarea
                                  rows={2}
                                  value={day.afternoon}
                                  onChange={(e) => handleUpdateDayField(idx, 'afternoon', e.target.value)}
                                  placeholder="e.g. Descend into Kaymakli multi-level underground city..."
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                                />
                              </div>

                              {/* Evening */}
                              <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 uppercase">
                                  <Moon className="w-3.5 h-3.5" />
                                  <span>Evening Schedule</span>
                                </label>
                                <textarea
                                  rows={2}
                                  value={day.evening}
                                  onChange={(e) => handleUpdateDayField(idx, 'evening', e.target.value)}
                                  placeholder="e.g. Sunset terrace dining in Uchisar and stargazing..."
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                                />
                              </div>
                            </div>

                            {/* Included Meals Checkboxes */}
                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                                Included Meals
                              </label>
                              <div className="flex items-center gap-3">
                                {(['Breakfast', 'Lunch', 'Dinner'] as const).map((meal) => {
                                  const isChecked = (day.includedMeals || []).includes(meal);
                                  return (
                                    <label
                                      key={meal}
                                      className="flex items-center gap-1.5 text-xs text-slate-800 cursor-pointer select-none font-medium"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggleDayMeal(idx, meal)}
                                        className="rounded text-amber-500 focus:ring-amber-400"
                                      />
                                      <span>{meal}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Insider Tip */}
                            <div className="space-y-1">
                              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                                Insider Guide Tip
                              </label>
                              <input
                                type="text"
                                value={day.insiderTip || ''}
                                onChange={(e) => handleUpdateDayField(idx, 'insiderTip', e.target.value)}
                                placeholder="e.g. Bring a light jacket for early dawn launch temperatures."
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                              />
                            </div>

                            {/* Recommended Hotels for this day */}
                            <div className="sm:col-span-2 space-y-2 bg-slate-100 p-3 rounded-xl">
                              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                                Recommended Accommodations for this Night
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 uppercase">Classic:</span>
                                  <input
                                    type="text"
                                    value={day.recommendedHotel?.classic || ''}
                                    onChange={(e) => handleUpdateHotel(idx, 'classic', e.target.value)}
                                    placeholder="4★ Boutique..."
                                    className="w-full px-2.5 py-1 rounded-md border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-amber-700 uppercase">Comfort:</span>
                                  <input
                                    type="text"
                                    value={day.recommendedHotel?.comfort || ''}
                                    onChange={(e) => handleUpdateHotel(idx, 'comfort', e.target.value)}
                                    placeholder="Heritage Cave Suite..."
                                    className="w-full px-2.5 py-1 rounded-md border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-indigo-700 uppercase">Luxury:</span>
                                  <input
                                    type="text"
                                    value={day.recommendedHotel?.luxury || ''}
                                    onChange={(e) => handleUpdateHotel(idx, 'luxury', e.target.value)}
                                    placeholder="5★ Palace Suite..."
                                    className="w-full px-2.5 py-1 rounded-md border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: HIGHLIGHTS */}
          {activeTab === 'highlights' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Key Tour Highlights &amp; Selling Points ({formData.highlights.length})
                </h3>
                <p className="text-xs text-slate-500">
                  These bullet points appear prominently on the public tour card and hero summary.
                </p>
              </div>

              <div className="space-y-2">
                {formData.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => {
                        const updated = [...formData.highlights];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, highlights: updated });
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          highlights: formData.highlights.filter((_, i) => i !== idx),
                        });
                      }}
                      className="w-7 h-7 text-slate-400 hover:text-rose-600 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Add highlight input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newHighlightText}
                    onChange={(e) => setNewHighlightText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newHighlightText.trim()) {
                          setFormData({
                            ...formData,
                            highlights: [...formData.highlights, newHighlightText.trim()],
                          });
                          setNewHighlightText('');
                        }
                      }
                    }}
                    placeholder="Add a new highlight (e.g. Private sunset cruise on the Bosphorus)..."
                    className="flex-1 px-3 py-2 rounded-xl border border-dashed border-slate-300 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newHighlightText.trim()) {
                        setFormData({
                          ...formData,
                          highlights: [...formData.highlights, newHighlightText.trim()],
                        });
                        setNewHighlightText('');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
              
              {/* Inclusions */}
              <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Included in Package ({formData.included.length})</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {formData.included.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData.included];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, included: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            included: formData.included.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newInclusionText}
                      onChange={(e) => setNewInclusionText(e.target.value)}
                      placeholder="Add included item..."
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-dashed border-emerald-300 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newInclusionText.trim()) {
                          setFormData({
                            ...formData,
                            included: [...formData.included, newInclusionText.trim()],
                          });
                          setNewInclusionText('');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Exclusions */}
              <div className="space-y-3 bg-rose-50/40 p-4 rounded-2xl border border-rose-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wide flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Excluded / Optional ({formData.excluded.length})</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {formData.excluded.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...formData.excluded];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, excluded: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            excluded: formData.excluded.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newExclusionText}
                      onChange={(e) => setNewExclusionText(e.target.value)}
                      placeholder="Add excluded item..."
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-dashed border-rose-300 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newExclusionText.trim()) {
                          setFormData({
                            ...formData,
                            excluded: [...formData.excluded, newExclusionText.trim()],
                          });
                          setNewExclusionText('');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isNew ? 'Create & Publish Tour' : 'Save All Tour Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
