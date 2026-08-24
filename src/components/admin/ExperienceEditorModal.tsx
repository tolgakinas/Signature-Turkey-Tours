import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
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
  AlertCircle
} from 'lucide-react';
import { SignatureExperience } from '../../types';

interface ExperienceEditorModalProps {
  experience: SignatureExperience | null; // null if creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (exp: SignatureExperience, isNew: boolean) => void;
}

const PRESET_IMAGES = [
  { label: 'Cappadocia Balloons', url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Bosphorus Sunset Yacht', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Ottoman Hammam & Spa', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Culinary Food Safari', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Whirling Dervish Ceremony', url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Ephesus Terrace Houses', url: 'https://images.unsplash.com/photo-1594988376714-411a76c8c4a1?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Turquoise Gulet Sail', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Cappadocia Horseback', url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1000&q=80' },
];

const PRESET_BADGES = [
  'Bucket-List Signature',
  'Romantic & Exclusive',
  'Wellness & Heritage',
  'Foodie Favorite',
  'Archaeological Gem',
  'Spiritual Wonder',
  'VIP Gulet & Sea',
  'Artisan & Culture',
  'Adventure & Aerial',
];

export const ExperienceEditorModal: React.FC<ExperienceEditorModalProps> = ({
  experience,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isNew = !experience;

  const [formData, setFormData] = useState<SignatureExperience>(() => {
    if (experience) {
      return {
        ...experience,
        included: [...(experience.included || [])],
      };
    }
    return {
      id: `exp-${Date.now().toString().slice(-4)}`,
      title: '',
      location: 'Istanbul (Bosphorus Strait)',
      duration: '2 – 3 Hours',
      priceUSD: 250,
      badge: 'Romantic & Exclusive',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80',
      description: '',
      included: [
        'Private licensed specialist guide & concierge',
        'VIP skip-the-line admissions and reservations',
        'Artisanal refreshments and beverages',
      ],
    };
  });

  const [newInclusionText, setNewInclusionText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddInclusion = () => {
    if (!newInclusionText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      included: [...prev.included, newInclusionText.trim()],
    }));
    setNewInclusionText('');
  };

  const handleRemoveInclusion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      included: prev.included.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateInclusion = (index: number, text: string) => {
    const updated = [...formData.included];
    updated[index] = text;
    setFormData((prev) => ({
      ...prev,
      included: updated,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a title for this design excursion.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please provide a brief description.');
      return;
    }
    if (formData.priceUSD <= 0) {
      setError('Please enter a valid price in USD.');
      return;
    }

    onSave(formData, isNew);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white">
                {isNew ? 'Create New Design Excursion' : `Edit Excursion: ${experience?.title}`}
              </h2>
              <p className="text-xs text-slate-400">
                Configure standalone bespoke masterclasses, yacht charters & signature enhancements.
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Main Details */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Title & Badge */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Excursion Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Private Sunset Bosphorus Yacht Cruise with Sommelier"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  required
                />
              </div>

              {/* Location & Duration & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Cappadocia (Goreme)"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Duration *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 3.5 Hours"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Price USD / Person *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    <input
                      type="number"
                      min="1"
                      value={formData.priceUSD}
                      onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) || 0 })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Badge & Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Highlight Badge / Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_BADGES.map((b) => {
                    const active = formData.badge === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, badge: b })}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Or custom badge name..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 mt-1"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Detailed Excursion Narrative *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the atmosphere, historical context, private perks, sommelier service, or special arrangements guests will enjoy..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-normal text-slate-900 focus:outline-hidden focus:border-amber-500 leading-relaxed"
                  required
                />
              </div>

              {/* Inclusions List Manager */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    What's Included &bull; Perks ({formData.included.length})
                  </label>
                </div>

                <div className="space-y-2">
                  {formData.included.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleUpdateInclusion(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveInclusion(idx)}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove perk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add perk line */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newInclusionText}
                      onChange={(e) => setNewInclusionText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddInclusion();
                        }
                      }}
                      placeholder="Add another included perk (e.g. VIP champagne landing toast)..."
                      className="flex-1 px-3 py-2 rounded-xl border border-dashed border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddInclusion}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Image & Live Preview */}
            <div className="space-y-5">
              
              {/* Image URL & Quick Presets */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Hero Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500">Preset Photos:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className="text-left px-2 py-1.5 rounded-lg bg-white hover:bg-amber-50 hover:border-amber-300 border border-slate-200 text-[11px] text-slate-700 truncate cursor-pointer transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guest View Live Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <Eye className="w-4 h-4 text-amber-500" />
                  <span>Public Storefront Preview</span>
                </div>

                <div className="bg-white dark:bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-xl text-white">
                  <div className="relative h-36 overflow-hidden bg-stone-900">
                    <img
                      src={formData.image || 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-wide">
                      {formData.badge || 'Signature'}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-[10px] text-stone-300 flex items-center justify-between">
                      <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                        <span>{formData.location || 'Turkey'}</span>
                      </span>
                      <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                        <span>{formData.duration || '2 Hours'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <h4 className="text-xs font-bold font-serif-luxury text-stone-900 dark:text-white truncate">
                      {formData.title || 'Excursion Title'}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                      {formData.description || 'Description will appear here...'}
                    </p>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        ${formData.priceUSD} <span className="text-[10px] text-stone-400 font-normal">/ person</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium">
                        {formData.included.length} perks included
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isNew ? 'Create & Publish Excursion' : 'Save Excursion Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
