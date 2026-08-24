import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Trash2, 
  Edit3, 
  Check, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Eye,
  SlidersHorizontal,
  Flame,
  Search
} from 'lucide-react';
import { TravelerReview } from '../types';
import { REVIEWS_DATA } from '../data/reviewsData';

interface AdminTestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: TravelerReview[];
  onUpdateReviews: (updated: TravelerReview[]) => void;
}

export const AdminTestimonialsModal: React.FC<AdminTestimonialsModalProps> = ({
  isOpen,
  onClose,
  reviews,
  onUpdateReviews,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editReviewText, setEditReviewText] = useState<string>('');
  const [editAuthor, setEditAuthor] = useState<string>('');
  const [editRating, setEditRating] = useState<number>(5);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New review form states for admin
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newFlag, setNewFlag] = useState<string>('🇺🇸');
  const [newTour, setNewTour] = useState<string>('10-Day Classic Signature Turkey Tour');
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newText, setNewText] = useState<string>('');
  const [newTravelerType, setNewTravelerType] = useState<TravelerReview['travelerType']>('Couple');
  const [newTravelDate, setNewTravelDate] = useState<string>('Summer 2026');

  if (!isOpen) return null;

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'featured' && !r.featured) return false;
    if (activeFilter === 'pending' && r.status !== 'pending') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.author.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.tourTaken.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleToggleFeatured = (id: string) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, featured: !r.featured } : r
    );
    onUpdateReviews(updated);
  };

  const handleToggleApproved = (id: string) => {
    const updated = reviews.map((r) =>
      r.id === id
        ? { ...r, status: r.status === 'approved' ? 'pending' : 'approved' }
        : r
    );
    onUpdateReviews(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      const updated = reviews.filter((r) => r.id !== id);
      onUpdateReviews(updated);
    }
  };

  const handleStartEdit = (rev: TravelerReview) => {
    setEditingId(rev.id);
    setEditTitle(rev.title);
    setEditReviewText(rev.reviewText);
    setEditAuthor(rev.author);
    setEditRating(rev.rating);
  };

  const handleSaveEdit = (id: string) => {
    const updated = reviews.map((r) =>
      r.id === id
        ? {
            ...r,
            title: editTitle,
            reviewText: editReviewText,
            author: editAuthor,
            rating: editRating,
          }
        : r
    );
    onUpdateReviews(updated);
    setEditingId(null);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all testimonials to verified factory defaults? This will restore original reviews.')) {
      onUpdateReviews(REVIEWS_DATA);
    }
  };

  const handleAddAdminReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newTitle.trim() || !newText.trim()) return;

    const newRev: TravelerReview = {
      id: `admin-rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'Verified Guest',
      flagEmoji: newFlag || '🌍',
      tourTaken: newTour,
      travelDate: newTravelDate,
      rating: newRating,
      title: newTitle.trim(),
      reviewText: newText.trim(),
      travelerType: newTravelerType,
      verified: true,
      featured: true,
      status: 'approved',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onUpdateReviews([newRev, ...reviews]);
    setShowAddForm(false);
    setNewAuthor('');
    setNewTitle('');
    setNewText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-[#FDFCF8] w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative bg-stone-50 dark:bg-[#0A0E14] p-5 sm:p-6 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 dark:bg-[#D4AF37]/20 border border-amber-600 dark:border-[#D4AF37]/40 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-[#D4AF37] bg-amber-500 dark:bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-amber-600 dark:border-[#D4AF37]/30">
                  Website Administrator Portal
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  ({reviews.length} Total Testimonials)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                Testimonials & Reviews Management
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefaults}
              title="Reset to factory verified reviews"
              className="p-2 rounded-xl bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10 transition-colors text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white transition-colors cursor-pointer border border-stone-200 dark:border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="p-4 bg-[#11161F] border-b border-stone-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search guest or tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 dark:text-white placeholder-stone-500 focus:outline-none focus:border-amber-600 dark:border-[#D4AF37] w-48 sm:w-64"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14]'
                    : 'bg-white dark:bg-[#161C24] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white'
                }`}
              >
                All ({reviews.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('featured')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1 ${
                  activeFilter === 'featured'
                    ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14]'
                    : 'bg-white dark:bg-[#161C24] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Featured ({reviews.filter((r) => r.featured).length})</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ml-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Close Add Form' : 'Add Testimonial'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-50 dark:bg-[#0A0E14] space-y-4">
          {/* Add Form Drawer */}
          {showAddForm && (
            <form
              onSubmit={handleAddAdminReview}
              className="bg-white dark:bg-[#161C24] border border-amber-600 dark:border-[#D4AF37]/40 rounded-2xl p-5 space-y-3 animate-fade-in shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-serif-luxury text-stone-900 dark:text-white flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
                  <span>Add New Official Guest Review</span>
                </h3>
                <span className="text-[11px] text-amber-600 dark:text-[#D4AF37]">Admin Direct Publish</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Robert & Linda Thorne"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2 focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold">Location & Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Chicago, Illinois, USA"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2 focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold">Tour Taken</label>
                  <input
                    type="text"
                    placeholder="e.g. 10-Day Classic Signature Tour"
                    value={newTour}
                    onChange={(e) => setNewTour(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2 focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold">Rating (1-5)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2"
                  >
                    <option value={5}>5 Stars (Flawless)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold">Traveler Type</label>
                  <select
                    value={newTravelerType}
                    onChange={(e) => setNewTravelerType(e.target.value as TravelerReview['travelerType'])}
                    className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2"
                  >
                    <option value="Couple">Couple</option>
                    <option value="Family">Family</option>
                    <option value="Solo">Solo Traveler</option>
                    <option value="Friends Group">Friends Group</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold">Travel Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Autumn 2026"
                    value={newTravelDate}
                    onChange={(e) => setNewTravelDate(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold text-xs">Review Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supreme Luxury and Seamless Logistics in Cappadocia"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2 text-xs focus:border-amber-600 dark:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-stone-600 dark:text-stone-300 block mb-1 font-semibold text-xs">Review Story *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed traveler feedback..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-lg p-2 text-xs focus:border-amber-600 dark:border-[#D4AF37]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-stone-50 dark:bg-[#0A0E14] text-stone-600 dark:text-stone-300 text-xs border border-stone-200 dark:border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] font-bold text-xs shadow-md"
                >
                  Publish to Live Site
                </button>
              </div>
            </form>
          )}

          {/* Testimonials List */}
          {filteredReviews.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              No reviews match your filter.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredReviews.map((rev) => {
                const isEditing = editingId === rev.id;

                return (
                  <div
                    key={rev.id}
                    className={`bg-white dark:bg-[#161C24] border rounded-2xl p-4 sm:p-5 transition-all ${
                      rev.featured
                        ? 'border-amber-600 dark:border-[#D4AF37]/50 shadow-md'
                        : 'border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20'
                    }`}
                  >
                    {isEditing ? (
                      /* Inline Edit Mode */
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-stone-500 dark:text-stone-400 block mb-1">Author Name:</label>
                            <input
                              type="text"
                              value={editAuthor}
                              onChange={(e) => setEditAuthor(e.target.value)}
                              className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 rounded-lg p-2 text-stone-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-stone-500 dark:text-stone-400 block mb-1">Rating:</label>
                            <select
                              value={editRating}
                              onChange={(e) => setEditRating(Number(e.target.value))}
                              className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 rounded-lg p-2 text-stone-900 dark:text-white"
                            >
                              <option value={5}>5 Stars</option>
                              <option value={4}>4 Stars</option>
                              <option value={3}>3 Stars</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-stone-500 dark:text-stone-400 block mb-1">Headline:</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 rounded-lg p-2 text-stone-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="text-stone-500 dark:text-stone-400 block mb-1">Review Narrative:</label>
                          <textarea
                            rows={3}
                            value={editReviewText}
                            onChange={(e) => setEditReviewText(e.target.value)}
                            className="w-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 rounded-lg p-2 text-stone-900 dark:text-white"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-[#0A0E14] text-stone-500 dark:text-stone-400 text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(rev.id)}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Row Mode */
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          {/* Rating and badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-amber-600 dark:text-[#D4AF37]" />
                              ))}
                            </div>

                            {rev.featured && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 dark:bg-[#D4AF37]/20 border border-amber-600 dark:border-[#D4AF37]/40 text-amber-600 dark:text-[#D4AF37] flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                <span>Featured on Homepage</span>
                              </span>
                            )}

                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                              {rev.status === 'approved' ? 'Active / Approved' : 'Pending Review'}
                            </span>

                            <span className="text-[11px] text-stone-500 dark:text-stone-400">
                              {rev.travelerType} &bull; {rev.travelDate}
                            </span>
                          </div>

                          {/* Title & Review snippet */}
                          <h4 className="text-sm font-bold text-stone-900 dark:text-white font-serif-luxury">
                            "{rev.title}"
                          </h4>
                          <p className="text-xs text-stone-600 dark:text-stone-300 font-light line-clamp-2 leading-relaxed">
                            {rev.reviewText}
                          </p>

                          {/* Photo badges if attached */}
                          {rev.photos && rev.photos.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                                {rev.photos.length} Photo{rev.photos.length > 1 ? 's' : ''} Attached:
                              </span>
                              <div className="flex gap-1">
                                {rev.photos.map((p, idx) => (
                                  <img
                                    key={idx}
                                    src={p}
                                    alt="thumb"
                                    className="w-7 h-7 rounded-md object-cover border border-stone-200 dark:border-white/20"
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Author & Tour taken */}
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 pt-1 flex flex-wrap items-center gap-3">
                            <span className="font-semibold text-stone-900 dark:text-white">
                              {rev.flagEmoji} {rev.author} ({rev.location})
                            </span>
                            <span>&bull;</span>
                            <span className="text-amber-600 dark:text-[#D4AF37]">{rev.tourTaken}</span>
                          </div>
                        </div>

                        {/* Admin Action Buttons */}
                        <div className="flex sm:flex-col items-center gap-1.5 shrink-0 border-t sm:border-t-0 sm:border-l border-stone-200 dark:border-white/5 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(rev.id)}
                            className={`p-2 rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                              rev.featured
                                ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] font-bold'
                                : 'bg-stone-50 dark:bg-[#0A0E14] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10'
                            }`}
                            title={rev.featured ? 'Remove from Featured' : 'Pin to Featured'}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="sm:hidden text-[11px]">{rev.featured ? 'Featured' : 'Feature'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(rev)}
                            className="p-2 rounded-xl bg-stone-50 dark:bg-[#0A0E14] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                            title="Edit Testimonial"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span className="sm:hidden text-[11px]">Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(rev.id)}
                            className="p-2 rounded-xl bg-stone-50 dark:bg-[#0A0E14] hover:bg-rose-950/70 text-stone-500 dark:text-stone-400 hover:text-rose-300 border border-stone-200 dark:border-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="sm:hidden text-[11px]">Delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
