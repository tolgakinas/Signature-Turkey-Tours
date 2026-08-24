import React, { useState, useRef } from 'react';
import { 
  X, 
  Star, 
  Upload, 
  CheckCircle2, 
  Image as ImageIcon, 
  Trash2, 
  Sparkles, 
  Camera, 
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { TravelerReview } from '../types';
import { TOURS_DATA } from '../data/toursData';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: TravelerReview) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [author, setAuthor] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [flagEmoji, setFlagEmoji] = useState<string>('🇺🇸');
  const [tourTaken, setTourTaken] = useState<string>(TOURS_DATA[0].title);
  const [travelDate, setTravelDate] = useState<string>('Summer 2026');
  const [travelerType, setTravelerType] = useState<TravelerReview['travelerType']>('Couple');
  const [title, setTitle] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  if (!isOpen) return null;

  // Preset quick photos travelers can choose
  const presetPhotos = [
    { label: 'Cappadocia Balloon', url: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=600&q=80' },
    { label: 'Hagia Sophia', url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80' },
    { label: 'Ephesus Celsus', url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=600&q=80' },
    { label: 'Pamukkale Pools', url: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&w=600&q=80' },
    { label: 'Bosphorus Sunset', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80' },
    { label: 'Gulet Yachting', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && typeof e.target.result === 'string') {
            setPhotos((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please provide a summary title for your review.');
      return;
    }
    if (!reviewText.trim() || reviewText.length < 20) {
      setErrorMsg('Please share a few sentences (at least 20 characters) about your private journey experience.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newReview: TravelerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'International Traveler',
      flagEmoji: flagEmoji || '🌍',
      tourTaken: tourTaken,
      travelDate: travelDate,
      rating: rating,
      title: title.trim(),
      reviewText: reviewText.trim(),
      travelerType: travelerType,
      verified: true,
      avatar: avatar || `https://images.unsplash.com/photo-${1534528741775 + (rating % 5)}?auto=format&fit=crop&w=300&q=80`,
      photos: photos.length > 0 ? photos : undefined,
      status: 'approved',
      featured: rating === 5,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      onSubmitReview(newReview);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-[#FDFCF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="relative bg-stone-50 dark:bg-[#0A0E14] p-5 sm:p-6 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500 dark:bg-[#D4AF37]/15 border border-amber-600 dark:border-[#D4AF37]/30 text-amber-600 dark:text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-wider mb-1">
              <Star className="w-3 h-3 fill-[#D4AF37]" />
              <span>Share Your Private Experience</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
              Write a Traveler Story
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white dark:bg-[#161C24] hover:bg-stone-200 dark:hover:bg-[#212936] text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:text-white transition-colors cursor-pointer border border-stone-200 dark:border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-stone-50 dark:bg-[#0A0E14]">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 dark:text-white">
                Teşekkür Ederiz! Your Review is Published.
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you for sharing your experience with fellow travelers. Your review has been added to our verified traveler stories gallery.
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs shadow-lg transition-all"
                >
                  Return to Reviews
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Interactive Star Rating Selector */}
              <div className="bg-white dark:bg-[#161C24] p-4 rounded-2xl border border-stone-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                    Overall Experience Rating:
                  </label>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    {rating === 5 ? '5.0 – Exceptional & Flawless Luxury' : `${rating}.0 Stars`}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'text-amber-600 dark:text-[#D4AF37] fill-[#D4AF37]'
                            : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Author & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Your Full Name / Party Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor & Michael Vance"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Hometown & Country (with Flag Emoji)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="🇺🇸"
                      value={flagEmoji}
                      onChange={(e) => setFlagEmoji(e.target.value)}
                      className="w-14 bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white text-center rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                      maxLength={4}
                    />
                    <input
                      type="text"
                      placeholder="e.g. Boston, Massachusetts, USA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Tour Taken & Traveler Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Itinerary / Tour Taken:
                  </label>
                  <select
                    value={tourTaken}
                    onChange={(e) => setTourTaken(e.target.value)}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  >
                    {TOURS_DATA.map((t) => (
                      <option key={t.id} value={t.title} className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">
                        {t.title} ({t.durationDays} Days)
                      </option>
                    ))}
                    <option value="Custom Bespoke Private Itinerary" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">
                      Custom Bespoke Private Itinerary
                    </option>
                    <option value="Private Bosphorus & Balloon Day Excursion" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">
                      Private Day Excursions
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                    Traveler Type:
                  </label>
                  <select
                    value={travelerType}
                    onChange={(e) => setTravelerType(e.target.value as TravelerReview['travelerType'])}
                    className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                  >
                    <option value="Couple" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Couple</option>
                    <option value="Family" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Family</option>
                    <option value="Solo" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Solo Traveler</option>
                    <option value="Friends Group" className="bg-white dark:bg-[#161C24] text-stone-900 dark:text-white">Friends Group</option>
                  </select>
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Travel Date / Season:
                </label>
                <input
                  type="text"
                  placeholder="e.g. May 2026 or Autumn 2025"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                />
              </div>

              {/* Review Headline & Narrative */}
              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Review Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flawless logistics, incredible scholar guide & unforgettable balloon flight!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                  Detailed Experience Story *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your guide, vehicle comfort, hotels, balloon experience, or pacing..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-white dark:bg-[#161C24] border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-600 dark:border-[#D4AF37]"
                />
              </div>

              {/* Optional Photo Upload Section */}
              <div className="bg-white dark:bg-[#161C24] p-4 rounded-2xl border border-stone-200 dark:border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-600 dark:text-[#D4AF37]" />
                    <span>Upload Trip Photos (Optional)</span>
                  </div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">Attach memories from your trip</span>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-amber-600 dark:border-[#D4AF37] bg-amber-500 dark:bg-[#D4AF37]/10'
                      : 'border-stone-200 dark:border-white/10 hover:border-stone-200 dark:border-white/20 bg-stone-50 dark:bg-[#0A0E14]/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  <Upload className="w-5 h-5 text-amber-600 dark:text-[#D4AF37] mx-auto mb-1.5" />
                  <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                    Drag & drop photos here or <span className="text-amber-600 dark:text-[#D4AF37] underline">browse files</span>
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Supports JPG, PNG, WEBP (stored securely in browser)
                  </p>
                </div>

                {/* Quick Add Preset Photos */}
                <div>
                  <div className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                    Or select signature highlights to attach:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {presetPhotos.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (!photos.includes(p.url)) {
                            setPhotos([...photos, p.url]);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-50 dark:bg-[#0A0E14] hover:bg-stone-200 dark:hover:bg-[#212936] text-[11px] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ImageIcon className="w-3 h-3 text-amber-600 dark:text-[#D4AF37]" />
                        <span>+ {p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Uploaded Photos Preview Strip */}
                {photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200 dark:border-white/5">
                    {photos.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-stone-200 dark:border-white/20 group">
                        <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-amber-500 dark:bg-[#D4AF37] hover:bg-[#c49f2e] text-stone-900 dark:text-[#0A0E14] font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Publishing Review...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Verified Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
