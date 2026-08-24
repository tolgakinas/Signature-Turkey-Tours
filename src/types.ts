export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'TRY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
  label: string;
}

export type AccommodationTierType = 'classic' | 'comfort' | 'luxury';

export interface TierPrice {
  classic: number; // USD per person based on 2 travelers
  comfort: number;
  luxury: number;
}

export interface DayItinerary {
  day: number;
  location: string;
  title: string;
  description: string;
  morning: string;
  afternoon: string;
  evening: string;
  includedMeals: ('Breakfast' | 'Lunch' | 'Dinner')[];
  recommendedHotel: {
    classic: string;
    comfort: string;
    luxury: string;
  };
  highlights: string[];
  image?: string;
  insiderTip?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  badge?: string;
  durationDays: number;
  durationNights: number;
  destinations: string[];
  startingCity: string;
  endingCity: string;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  pricePerPersonUSD: TierPrice;
  ratings: {
    score: number;
    reviewCount: number;
  };
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: DayItinerary[];
  recommendedSeason: string;
  idealFor: string[];
  physicalRating: 'Easy' | 'Moderate' | 'Active';
}

export interface Destination {
  id: string;
  name: string;
  turkishName: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  topSights: string[];
  bestMonths: string;
  recommendedStay: string;
  latitude: number;
  longitude: number;
  signatureExperience: string;
}

export interface SignatureExperience {
  id: string;
  title: string;
  location: string;
  duration: string;
  priceUSD: number;
  image: string;
  description: string;
  included: string[];
  badge?: string;
}

export interface TravelerReview {
  id: string;
  author: string;
  location: string;
  flagEmoji: string;
  tourTaken: string;
  travelDate: string;
  rating: number;
  title: string;
  reviewText: string;
  travelerType: 'Couple' | 'Family' | 'Solo' | 'Friends Group';
  verified: boolean;
  avatar?: string;
  photos?: string[];
  status?: 'approved' | 'pending' | 'rejected';
  featured?: boolean;
  adminNotes?: string;
  createdAt?: string;
}

export interface MapPointOfInterest {
  id: string;
  name: string;
  turkishName: string;
  region: 'Marmara' | 'Central Anatolia' | 'Aegean' | 'Mediterranean' | 'Southeastern Anatolia';
  category: 'UNESCO Wonder' | 'Ancient Monument' | 'Natural Wonder' | 'Coastal & Yachting' | 'Cave & Balloon';
  x: number; // Coordinate on 850x480 SVG Canvas
  y: number;
  image: string;
  gallery?: string[];
  shortDesc: string;
  detailedDesc: string;
  topHighlights: string[];
  insiderTip: string;
  idealDuration: string;
  bestTimeOfDay: string;
  featuredInTours: string[];
  flightConnected?: boolean;
}

export interface MapTourRoute {
  tourId: string;
  tourName: string;
  durationDays: number;
  color: string;
  stops: {
    poiId: string;
    dayLabel: string;
    description: string;
  }[];
  segments: {
    from: string; // poiId
    to: string;   // poiId
    type: 'flight' | 'road' | 'sea';
    duration: string;
    highlight: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Booking & Tiers' | 'Cappadocia Ballooning' | 'Visas & Logistics' | 'Guides & Transport' | 'Dining & Culture';
}

export interface BookingInquiry {
  tourId?: string;
  tourName: string;
  fullName: string;
  email: string;
  phoneOrWhatsApp: string;
  country: string;
  travelDate: string;
  durationDays: number;
  travelersCount: number;
  adultsCount: number;
  childrenCount: number;
  accommodationTier: AccommodationTierType;
  balloonAddon: boolean;
  bosphorusYachtAddon: boolean;
  destinationsInterested: string[];
  specialRequests: string;
  estimatedBudgetPerPerson?: number;
}

export interface AICustomItineraryResult {
  tourTitle: string;
  tagline: string;
  summary: string;
  estimatedPriceUSD: {
    classic: number;
    comfort: number;
    luxury: number;
  };
  recommendedMonths: string;
  highlightExperiences: string[];
  itineraryDays: {
    day: number;
    location: string;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    includedMeals: string[];
    recommendedStay: string;
    insiderTip: string;
  }[];
  logisticsSummary: string;
  packingAdvice: string;
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'pending_quote_approval' | 'partially_paid' | 'fully_paid' | 'refunded';

export interface AdminInquiryLead {
  id: string;
  fullName: string;
  email: string;
  phoneOrWhatsApp: string;
  country: string;
  tourName: string;
  tourId: string;
  travelDate: string;
  durationDays: number;
  travelersCount: number;
  adultsCount: number;
  childrenCount: number;
  accommodationTier: AccommodationTierType;
  balloonAddon: boolean;
  bosphorusYachtAddon: boolean;
  destinationsInterested: string[];
  specialRequests: string;
  estimatedBudgetPerPerson: number;
  status: InquiryStatus;
  assignedAgent: string;
  depositPaidUSD: number;
  totalQuoteUSD: number;
  paymentStatus: PaymentStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyRevenueItem {
  month: string;
  revenueUSD: number;
  bookings: number;
}

export interface CountryStatItem {
  country: string;
  percentage: number;
  count: number;
  flag: string;
}

export interface AdminStatsData {
  totalInquiries: number;
  confirmedCount: number;
  activeLeadsCount: number;
  totalPipelineValue: number;
  confirmedRevenue: number;
  depositsCollected: number;
  conversionRate: string;
  avgBookingValue: number;
  tursabLicenseNumber: string;
  avgResponseTimeMin: number;
  guestSatisfactionScore: number;
  tierCounts: {
    luxury: number;
    comfort: number;
    classic: number;
  };
  destinationPopularity: Record<string, number>;
  monthlyRevenue: MonthlyRevenueItem[];
  countryStats: CountryStatItem[];
  balloonSlotsSummary: {
    totalAllocated: number;
    booked: number;
    available: number;
    flightReadiness: string;
  };
}

export interface BalloonSlotRosterItem {
  id: string;
  date: string;
  provider: string;
  totalSlots: number;
  bookedSlots: number;
  weatherStatus: 'green' | 'yellow' | 'red';
  pilotAssigned: string;
  takeoffValley: string;
}


