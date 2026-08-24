import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  Award,
  Trash2,
  Edit3,
  Search,
  Filter,
  MessageSquare,
  ShieldCheck,
  Plus,
  Heart,
  ChevronDown
} from 'lucide-react';
import { REVIEWS_DATA } from '../../data/reviewsData';
import { TravelerReview } from '../../types';

interface AdminReviewsModeratorProps {
  onShowToast: (msg: string) => void;
}

export const AdminReviewsModerator: React.FC<AdminReviewsModeratorProps> = ({
  onShowToast,
}) => {
  const [reviews, setReviews] = useState<TravelerReview[]>(REVIEWS_DATA);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<{ [id: string]: string }>({});

  const handleToggleFeature = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        const next = !r.featured;
        onShowToast(`Review by ${r.author} ${next ? 'pinned to Homepage Featured' : 'unpinned'}.`);
        return { ...r, featured: next };
      }
      return r;
    }));
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'pending' | 'rejected') => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        onShowToast(`Review status updated to ${status.toUpperCase()}.`);
        return { ...r, status };
      }
      return r;
    }));
  };

  const handleDeleteReview = (id: string) => {
    if (!window.confirm('Delete this traveler review permanently?')) return;
    setReviews(prev => prev.filter(r => r.id !== id));
    onShowToast('Review removed.');
  };

  const handleSaveAdminNote = (id: string) => {
    const note = adminNoteInput[id];
    setReviews(prev => prev.map(r => r.id === id ? { ...r, adminNotes: note } : r));
    onShowToast('Internal staff note saved.');
    setEditingReviewId(null);
  };

  const filteredReviews = reviews.filter(r => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'featured' ? r.featured : (r.status || 'approved') === filterStatus);
    const matchesSearch = searchTerm.trim() === '' ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tourTaken.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reviewText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Guest Reviews &amp; Reputation Hub</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Moderate verified traveler testimonials, feature top stories, and monitor NPS ratings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-800">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>5.0 / 5.0 Average Rating</span>
            </div>
            <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
              {reviews.length} Published Testimonials
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'featured', label: 'Featured on Site' },
              { id: 'approved', label: 'Approved' },
              { id: 'pending', label: 'Pending' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100 font-semibold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="sm:ml-auto w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search traveler, tour, or text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => {
          const isFeatured = rev.featured;
          const status = rev.status || 'approved';
          const isEditing = editingReviewId === rev.id;

          return (
            <div
              key={rev.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs transition-all space-y-4 ${
                isFeatured ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-700 dark:text-amber-300 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {rev.author.split(' ')[0][0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{rev.author}</h3>
                      <span className="text-xs text-slate-500">{rev.location} {rev.flagEmoji}</span>
                      {rev.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Private Traveler
                        </span>
                      )}
                      {isFeatured && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 mt-0.5">
                      <span>Tour: <strong>{rev.tourTaken}</strong></span>
                      <span className="mx-2">&bull;</span>
                      <span>Traveled: {rev.travelDate} ({rev.travelerType})</span>
                    </div>
                  </div>
                </div>

                {/* Star rating display */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'text-amber-600 dark:text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Title & Content */}
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">"{rev.title}"</h4>
                <p className="text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Photos attached if any */}
              {rev.photos && rev.photos.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  {rev.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt="Traveler upload"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                    />
                  ))}
                </div>
              )}

              {/* Staff Notes section */}
              {rev.adminNotes && !isEditing && (
                <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700">
                  <span className="font-bold text-slate-900">Staff Memo: </span>
                  {rev.adminNotes}
                </div>
              )}

              {isEditing && (
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <label className="font-bold text-slate-700">Internal Operations Note:</label>
                  <textarea
                    rows={2}
                    value={adminNoteInput[rev.id] !== undefined ? adminNoteInput[rev.id] : rev.adminNotes || ''}
                    onChange={(e) => setAdminNoteInput({ ...adminNoteInput, [rev.id]: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    placeholder="Add notes on guide assigned, hotel complimentary upgrades provided, etc."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingReviewId(null)}
                      className="px-3 py-1 text-slate-500 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveAdminNote(rev.id)}
                      className="px-3 py-1 bg-slate-900 text-white font-bold rounded-lg"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {/* Footer action bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleFeature(rev.id)}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                      isFeatured
                        ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isFeatured ? '★ Pinned Featured' : '☆ Pin to Homepage'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingReviewId(isEditing ? null : rev.id)}
                    className="px-3 py-1 rounded-lg font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3 inline mr-1" />
                    <span>Staff Note</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(rev.id, 'approved')}
                    className="text-emerald-700 hover:text-emerald-800 font-bold px-2 py-1"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteReview(rev.id)}
                    className="text-rose-600 hover:text-rose-800 font-bold px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
