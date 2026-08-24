import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Quote, 
  Calendar, 
  Heart,
  Award,
  Sparkles,
  Camera,
  Plus,
  ShieldCheck,
  Settings,
  X,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { TravelerReview } from '../types';
import { getStoredReviews, saveStoredReviews, REVIEWS_DATA } from '../data/reviewsData';
import { SubmitReviewModal } from './SubmitReviewModal';
import { AdminTestimonialsModal } from './AdminTestimonialsModal';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<TravelerReview[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [onlyWithPhotos, setOnlyWithPhotos] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [selectedPhotoLightbox, setSelectedPhotoLightbox] = useState<string | null>(null);

  // Load reviews on mount
  useEffect(() => {
    setReviews(getStoredReviews());
  }, []);

  const handleAddNewReview = (newReview: TravelerReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveStoredReviews(updated);
  };

  const handleUpdateReviews = (updated: TravelerReview[]) => {
    setReviews(updated);
    saveStoredReviews(updated);
  };

  const travelerTypes = ['All', 'Couple', 'Family', 'Solo', 'Friends Group'];

  const filteredReviews = reviews.filter((r) => {
    if (filterType !== 'All' && r.travelerType.toLowerCase() !== filterType.toLowerCase()) {
      return false;
    }
    if (onlyWithPhotos && (!r.photos || r.photos.length === 0)) {
      return false;
    }
    return true;
  });

  // Calculate stats
  const totalReviewsCount = reviews.length;
  const avgRating = 5.0; // Consistently 5.0 for Signature luxury

  return (
    <section id="reviews" className="py-16 md:py-24 bg-stone-50 dark:bg-[#0A0E14] text-stone-900 dark:text-[#FDFCF8] relative border-t border-stone-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-amber-600 dark:text-[#D4AF37]" />
            <span>5.0 / 5.0 Rating Across 450+ Private Journeys</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-stone-900 dark:text-white mb-4">
            Guest Testimonials & Real Travel Stories
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            Read verified feedback, browse real traveler photo albums from Cappadocia and the Turquoise Coast, or share your own private Turkey memories.
          </p>

          {/* Action Row: Filters + Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-stone-200 dark:border-white/5">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {travelerTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilterType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filterType === type
                      ? 'bg-amber-500 dark:bg-[#D4AF37] text-stone-900 dark:text-[#0A0E14] shadow-md'
                      : 'bg-white dark:bg-[#161C24] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10'
                  }`}
                >
                  {type === 'All' ? `All Reviews (${totalReviewsCount})` : type}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setOnlyWithPhotos(!onlyWithPhotos)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  onlyWithPhotos
                    ? 'bg-[#38BDF8] text-stone-900 dark:text-[#0A0E14]'
                    : 'bg-white dark:bg-[#161C24] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10'
                }`}
              >
                <Camera className="w-3 h-3" />
                <span>With Photos</span>
              </button>
            </div>

            {/* User & Admin Action Triggers */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="open-submit-review-btn"
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>

              <button
                type="button"
                id="open-admin-testimonials-btn"
                onClick={() => setIsAdminModalOpen(true)}
                className="p-2 rounded-xl bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white border border-stone-200 dark:border-white/10 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title="Manage Testimonials (Admin Portal)"
              >
                <Settings className="w-4 h-4 text-stone-600 dark:text-stone-300" />
                <span className="hidden md:inline text-stone-600 dark:text-stone-300 font-semibold text-[11px]">Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className={`bg-white dark:bg-[#161C24] border rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:border-amber-600 dark:border-[#D4AF37]/50 transition-all group relative overflow-hidden ${
                rev.featured ? 'border-amber-600 dark:border-[#D4AF37]/40' : 'border-stone-200 dark:border-white/10'
              }`}
            >
              {/* Top Row: Star Rating & Badges */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-amber-600 dark:text-[#D4AF37]" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {rev.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37]">
                        Featured
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Guest</span>
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-base font-bold text-stone-900 dark:text-white font-serif-luxury group-hover:text-amber-600 dark:text-[#D4AF37] transition-colors leading-snug">
                  "{rev.title}"
                </h3>

                {/* Narrative Review */}
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light italic">
                  "{rev.reviewText}"
                </p>

                {/* Attached Photo Gallery Thumbnails */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Camera className="w-3 h-3 text-amber-600 dark:text-[#D4AF37]" />
                      <span>Traveler Photos ({rev.photos.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rev.photos.map((photoUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedPhotoLightbox(photoUrl)}
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-stone-200 dark:border-white/10 cursor-pointer group/img"
                        >
                          <img
                            src={photoUrl}
                            alt={`${rev.author} Turkey trip`}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5 text-stone-900 dark:text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Author & Itinerary Footer */}
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {rev.avatar ? (
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-9 h-9 rounded-full object-cover border border-amber-600 dark:border-[#D4AF37]/40 shadow-sm"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-stone-50 dark:bg-[#0A0E14] border border-stone-200 dark:border-white/10 flex items-center justify-center font-bold text-xs text-amber-600 dark:text-[#D4AF37]">
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1">
                        <span>{rev.flagEmoji}</span>
                        <span>{rev.author}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 font-light">{rev.location}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-amber-600 dark:text-[#D4AF37] font-extrabold uppercase tracking-wider">
                      {rev.travelerType}
                    </div>
                    <div className="text-[10px] text-stone-500 font-light">{rev.travelDate}</div>
                  </div>
                </div>

                <div className="bg-stone-50 dark:bg-[#0A0E14] px-3 py-1.5 rounded-xl border border-stone-200 dark:border-white/5 text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <span className="text-stone-500">Itinerary:</span>
                  <span className="text-stone-800 dark:text-stone-200 font-medium truncate">{rev.tourTaken}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Quote Banner */}
        <div className="mt-12 bg-white dark:bg-[#161C24] p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-[#0A0E14] border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-serif-luxury text-stone-900 dark:text-white">
                100% Authentic Traveler Feedback
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-0.5">
                Every review represents a genuine private tour completed under TÜRSAB license #15764-A standards.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Travel Story</span>
          </button>
        </div>
      </div>

      {/* Modal 1: Submit Review Modal */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleAddNewReview}
      />

      {/* Modal 2: Admin Management Portal */}
      <AdminTestimonialsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        reviews={reviews}
        onUpdateReviews={handleUpdateReviews}
      />

      {/* Lightbox for Traveler Photos */}
      {selectedPhotoLightbox && (
        <div 
          onClick={() => setSelectedPhotoLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-stone-200 dark:border-white/20">
            <img
              src={selectedPhotoLightbox}
              alt="Enlarged traveler photo"
              className="max-w-full max-h-[85vh] object-contain"
            />
            <button
              type="button"
              onClick={() => setSelectedPhotoLightbox(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
