export interface TierFeature {
  name: string;
  classic: string;
  comfort: string;
  luxury: string;
}

export const TIER_COMPARISONS: TierFeature[] = [
  {
    name: 'Daily Cost Estimate (per person, 2 pax)',
    classic: '$280 – $380 USD / day',
    comfort: '$420 – $560 USD / day',
    luxury: '$680 – $1,100+ USD / day',
  },
  {
    name: 'Hotel Accommodations',
    classic: 'Handpicked 4-Star boutique heritage hotels in historic centers',
    comfort: 'Superior boutique hotels, restored luxury cave suites & 5-star sea-views',
    luxury: 'World-renowned 5-star icon palaces (Four Seasons, Çırağan, Museum Hotel)',
  },
  {
    name: 'Cappadocia Stay Type',
    classic: 'Authentic stone & arch room boutique cave hotel',
    comfort: 'Deluxe private carved cave suite with fireplace/balcony',
    luxury: 'Royal / Imperial Master Cave Suite with private pool/jacuzzi',
  },
  {
    name: 'Private Guide Level',
    classic: 'Licensed English-speaking professional Turkish scholar guide',
    comfort: 'Senior licensed historian guide with advanced master’s credentials',
    luxury: 'Master academic archaeologist / celebrity scholar private guide',
  },
  {
    name: 'Vehicle & Transport',
    classic: 'Private Mercedes-Benz Vito (Wi-Fi, AC, refreshments)',
    comfort: 'Private Mercedes-Benz VIP Sprinter / Vito Extra-Long Lounge',
    luxury: 'Ultra-VIP Mercedes Maybach / Sprinter Suite + private airport tarmac meet',
  },
  {
    name: 'Domestic Flights',
    classic: 'Economy class with 20kg checked baggage included',
    comfort: 'Premium seat assignment & priority boarding on Turkish Airlines',
    luxury: 'Business Class / VIP check-in & airport lounge access',
  },
  {
    name: 'Special Experiences Included',
    classic: 'Skip-the-line museum tickets, walking orientation, bazaars',
    comfort: 'Private 2-hr sunset Bosphorus yacht cruise, pottery masterclass',
    luxury: 'Private sunset yacht with sommelier, private hammam ritual, priority balloon suite',
  },
  {
    name: 'Concierge Support',
    classic: 'Daily ground support & WhatsApp emergency line',
    comfort: '24/7 dedicated personal WhatsApp concierge & table reservations',
    luxury: 'Dedicated 24/7 Executive Travel Butler & priority on-demand changes',
  },
];
