import { MapPointOfInterest, MapTourRoute } from '../types';

export const MAP_POIS_DATA: MapPointOfInterest[] = [
  {
    id: 'istanbul',
    name: 'Istanbul Historic Peninsula & Bosphorus',
    turkishName: 'İstanbul – Tarihi Yarımada & Boğaz',
    region: 'Marmara',
    category: 'UNESCO Wonder',
    x: 185,
    y: 105,
    flightConnected: true,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The eternal crossroads of East and West, bridging Europe and Asia across the glittering Bosphorus Strait.',
    detailedDesc: 'Explore 2,500 years of imperial history spanning Roman, Byzantine, and Ottoman dynasties. Wander through the majestic dome of Hagia Sophia, marvel at the 20,000 blue Iznik tiles in Sultanahmet Mosque, discover the secluded courtyards and Imperial Harem of Topkapi Palace, descend into the subterranean Medusa pillars of Basilica Cistern, and cruise the Bosphorus on your private sunset yacht charter.',
    topHighlights: [
      'Hagia Sophia (Ayasofya) & VIP Fast-Track Entry',
      'Topkapi Palace Imperial Harem & Treasury',
      'Private 2-Hour Sunset Bosphorus Yacht Cruise with Mezze',
      'Basilica Cistern (Yerebatan Sarnıcı) Illumination',
      'Grand Bazaar (Kapalıçarşı) & Spice Market Master Artisans'
    ],
    insiderTip: 'Our scholar historians arrange access during early quiet morning windows when sunlight streams through Hagia Sophia’s 40 arched windows without crowds.',
    idealDuration: '3 to 5 Days',
    bestTimeOfDay: 'Sunrise over Galata Bridge & Golden Sunset on Bosphorus',
    featuredInTours: ['10-Day Classic Signature', '14-Day Grand Anatolian', '7-Day Highlights', '21-Day Ultimate Explorer', '12-Day Culinary & Göbeklitepe']
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia Valleys & Fairy Chimneys',
    turkishName: 'Kapadokya – Peri Bacaları & Göreme',
    region: 'Central Anatolia',
    category: 'Cave & Balloon',
    x: 460,
    y: 220,
    flightConnected: true,
    image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'A surreal lunar landscape sculpted by volcanic tuff, subterranean cities, rock-cut Byzantine churches, and iconic hot air balloons.',
    detailedDesc: 'Waking up before dawn to drift silently over surreal fairy chimneys and Rose Valley in a hot air balloon is one of travel’s ultimate spectacles. Explore Göreme Open Air Museum’s 10th-century Christian frescoes, venture 8 levels underground into Kaymakli or Derinkuyu Subterranean Cities, hike through Pigeon Valley, and sleep in an authentic carved volcanic cave suite with private heated plunge pools.',
    topHighlights: [
      'Guaranteed Sunrise Hot Air Balloon Flight with Champagne Toast',
      'Göreme Open Air Museum UNESCO Rock-Cut Frescoes',
      'Kaymakli / Derinkuyu 8-Level Underground Cities',
      'Pasabag (Monks Valley) & Devrent (Imagination Valley)',
      'Avanos 4,000-Year Hittite Kick-Wheel Pottery Masterclass',
      'Uçhisar Rock Castle Panoramic Sunset Lookout'
    ],
    insiderTip: 'We hold 3 consecutive morning balloon flight reserve slots so even if Day 1 is scrubbed due to high winds, your flight is secured for Day 2 or 3 without extra fees.',
    idealDuration: '3 to 4 Days',
    bestTimeOfDay: '5:30 AM Sunrise Balloon Flight & Sunset at Red Valley',
    featuredInTours: ['10-Day Classic Signature', '14-Day Grand Anatolian', '7-Day Highlights', '21-Day Ultimate Explorer']
  },
  {
    id: 'ephesus',
    name: 'Ephesus & Ancient Ionian Wonders',
    turkishName: 'Efes Antik Kenti & Şirince',
    region: 'Aegean',
    category: 'Ancient Monument',
    x: 135,
    y: 265,
    flightConnected: true,
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The best-preserved classical metropolis in the Mediterranean, boasting the Library of Celsus and 25,000-seat amphitheater.',
    detailedDesc: 'Walk along the gleaming marble Curetes Street where Roman emperors, Marc Antony, and Cleopatra once trod. Admire the breathtaking facade of the Library of Celsus, marvel at the vibrant mosaics and radiant fresco walls inside the Roman VIP Terrace Houses, and visit the serene House of the Virgin Mary nestled in the pine-scented Solmissos mountains.',
    topHighlights: [
      'Celsus Library & 25,000-Seat Grand Amphitheater',
      'Roman VIP Terrace Houses (Mosaic & Underfloor Heating Suites)',
      'House of the Virgin Mary (Meryem Ana Evi) Pilgrimage Sanctuary',
      'Temple of Artemis (One of the Seven Wonders of the Ancient World)',
      'Şirince Orthodox Greek Hill Village Olive Oil & Fruit Wine Tasting'
    ],
    insiderTip: 'Our private VIP tickets include the newly restored Terrace Houses — shielded from the sun under climate-controlled glass walkways.',
    idealDuration: '2 Days',
    bestTimeOfDay: 'Morning before the Aegean heat & late afternoon in Şirince village',
    featuredInTours: ['10-Day Classic Signature', '14-Day Grand Anatolian', '21-Day Ultimate Explorer', '12-Day Biblical Journey']
  },
  {
    id: 'pamukkale',
    name: 'Pamukkale Travertines & Hierapolis',
    turkishName: 'Pamukkale Travertenleri & Hierapolis Antik Kenti',
    region: 'Aegean',
    category: 'Natural Wonder',
    x: 215,
    y: 285,
    flightConnected: false,
    image: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The "Cotton Castle" of blinding white mineral-rich calcium terraces and Cleopatra’s Antique Thermal Pools.',
    detailedDesc: 'For thousands of years, thermal springs rich in calcium bicarbonate have cascaded down the cliffside, creating snow-white petrified waterfalls and stepping infinity pools. Above the terraces rests the Greco-Roman spa city of Hierapolis with its monumental theater, Roman baths, and the legendary Cleopatra Pool where you can swim among submerged ancient marble columns.',
    topHighlights: [
      'Blinding White Mineral Travertine Cascades & Terraced Pools',
      'Swimming in Cleopatra’s Antique Thermal Pool among Roman Columns',
      'Hierapolis Greco-Roman Amphitheater & Martyrium of St. Philip',
      'Monumental Necropolis (Over 1,200 Roman & Hellenistic Tombs)',
      'Thermal Luxury Spa Hotel Stays with healing mineral water'
    ],
    insiderTip: 'Bring barefoot water shoes or walk barefoot directly on the warm calcium shelves as required for travertine preservation.',
    idealDuration: '1 to 2 Days',
    bestTimeOfDay: 'Late afternoon when the sun turns the white terraces into pink and orange mirrors',
    featuredInTours: ['10-Day Classic Signature', '14-Day Grand Anatolian', '21-Day Ultimate Explorer']
  },
  {
    id: 'antalya',
    name: 'Antalya Turquoise Coast & Aspendos',
    turkishName: 'Antalya – Kaleiçi & Aspendos Tiyatrosu',
    region: 'Mediterranean',
    category: 'Coastal & Yachting',
    x: 290,
    y: 360,
    flightConnected: true,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'A jewel of the Turkish Riviera framed by the dramatic Taurus Mountains, Roman walls, and turquoise waters.',
    detailedDesc: 'Explore Kaleiçi’s cobblestone lanes lined with 19th-century Ottoman mansions, walk through Hadrian’s Gate constructed in 130 AD, and visit the world-famous Roman theater of Aspendos — considered the most acoustically pristine ancient theater on earth. Savor freshly caught Mediterranean seafood in the historic harbor overlooking sheer cliffs and waterfalls.',
    topHighlights: [
      'Kaleiçi Ottoman Old Town & 130 AD Hadrian’s Gate',
      'Aspendos Roman Theater (Near-Perfect Acoustic Preservation)',
      'Perge Ancient Pamphylian Metropolis & Columned Streets',
      'Düden Waterfalls plunging 40 meters directly into the sea',
      'Private motor yacht swimming cruise along secluded sea caves'
    ],
    insiderTip: 'Test the legendary acoustics in Aspendos by dropping a coin on the center orchestra stone — it can be heard on the topmost 41st tier.',
    idealDuration: '2 to 3 Days',
    bestTimeOfDay: 'Midday at Aspendos & sunset dining along the cliffside harbor',
    featuredInTours: ['14-Day Grand Anatolian', '21-Day Ultimate Explorer']
  },
  {
    id: 'bodrum',
    name: 'Bodrum Peninsula & St. Peter Castle',
    turkishName: 'Bodrum & St. Peter Kalesi',
    region: 'Aegean',
    category: 'Coastal & Yachting',
    x: 125,
    y: 340,
    flightConnected: true,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The St. Tropez of Turkey with whitewashed Aegean villas, vibrant bougainvillea, luxury yacht marinas, and medieval crusader castles.',
    detailedDesc: 'Birthplace of Herodotus and home to the Mausoleum at Halicarnassus (One of the Seven Wonders of the Ancient World). Tour the 15th-century Castle of St. Peter housing the world’s foremost Museum of Underwater Archaeology, board handcrafted wooden luxury gulets, and dine at chic Michelin-recommended seaside restaurants in Yalıkavak Marina.',
    topHighlights: [
      'Castle of St. Peter & Underwater Archaeology Museum',
      'Mausoleum at Halicarnassus Ruins & Foundation',
      'Private Handcrafted Wooden Gulet Yacht Day Charters',
      'Yalıkavak Superyacht Marina & Luxury Seaside Dining',
      'Windmills of Bodrum overlooking twin bays'
    ],
    insiderTip: 'Board our luxury Gulet charters from Bodrum for the tranquil "Blue Voyage" sailing into crystal coves inaccessible by road.',
    idealDuration: '2 to 4 Days',
    bestTimeOfDay: 'Twilight over Yalıkavak Marina & morning swim in Aquarium Bay',
    featuredInTours: ['8-Day Turquoise Gulet Cruise', '21-Day Ultimate Explorer']
  },
  {
    id: 'kas-kekova',
    name: 'Kaş & Sunken City of Kekova',
    turkishName: 'Kaş & Kekova Batık Şehir',
    region: 'Mediterranean',
    category: 'Coastal & Yachting',
    x: 240,
    y: 405,
    flightConnected: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Bohemian seaside paradise with Lycian rock tombs, sea kayaking over submerged Roman ruins, and Simena Castle.',
    detailedDesc: 'A captivating blend of ancient Lycian civilization and bohemian coastal charm. Glide silently via private yacht or sea kayak over the 2nd-century submerged ruins of Kekova Sunken City destroyed by earthquakes. Climb up to Simena Castle for a 360-degree panoramic view of island archipelagos while tasting homemade goat milk ice cream.',
    topHighlights: [
      'Kekova Sunken City Ruins visible through turquoise waters',
      'Simena (Kaleköy) Byzantine Castle & Lycian Sarcophagi',
      'Kaputaş Beach Dramatic Golden Canyon Gorge',
      'Kaş Antiphellos Hellenistic Theater overlooking Mediterranean',
      'Sea Kayaking directly over submerged Lycian stone foundations'
    ],
    insiderTip: 'We anchor in Gökkaya Bay where turtles frequent the warm waters and you can swim right next to Lycian sea tombs.',
    idealDuration: '2 to 3 Days',
    bestTimeOfDay: '10:00 AM clear water kayak cruise & sunset from Simena Castle',
    featuredInTours: ['14-Day Grand Anatolian', '8-Day Turquoise Gulet Cruise', '21-Day Ultimate Explorer']
  },
  {
    id: 'fethiye',
    name: 'Fethiye, Ölüdeniz & Ghost Town Kayaköy',
    turkishName: 'Fethiye – Ölüdeniz & Kayaköy',
    region: 'Mediterranean',
    category: 'Natural Wonder',
    x: 195,
    y: 375,
    flightConnected: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The serene Blue Lagoon, dramatic Lycian rock-hewn Amyntas tombs, and the atmospheric stone ghost village of Kayaköy.',
    detailedDesc: 'Fethiye nestles against the turquoise waters of the Mediterranean with the famous calm waters of Ölüdeniz Blue Lagoon. Hike through the eerie deserted stone houses and Greek Orthodox chapels of Kayaköy Ghost Town, explore the soaring sheer limestone walls of Saklıkent Gorge, and marvel at the 4th-century BC Tomb of Amyntas carved directly into the cliff.',
    topHighlights: [
      'Ölüdeniz Blue Lagoon protected nature reserve',
      'Kayaköy Abandoned 1923 Greek Ghost Village',
      'Tomb of Amyntas Lycian Rock-Cut Temple Tombs',
      'Saklıkent National Park 18km Canyon River Walk',
      'Butterfly Valley (Kelebekler Vadisi) Secluded Cove'
    ],
    insiderTip: 'Our private guide takes you through Kayaköy at late afternoon golden hour when the shadows on the stone ruins are profoundly poetic.',
    idealDuration: '2 Days',
    bestTimeOfDay: 'Morning at Blue Lagoon & 5:00 PM walking tour in Kayaköy',
    featuredInTours: ['8-Day Turquoise Gulet Cruise', '14-Day Grand Anatolian']
  },
  {
    id: 'gobeklitepe',
    name: 'Göbeklitepe & Şanlıurfa (Zero Point in Time)',
    turkishName: 'Göbeklitepe – Tarihin Sıfır Noktası & Şanlıurfa',
    region: 'Southeastern Anatolia',
    category: 'UNESCO Wonder',
    x: 650,
    y: 315,
    flightConnected: true,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The oldest religious sanctuary on Earth, constructed 12,000 years ago — 6,000 years before Stonehenge and the Pyramids.',
    detailedDesc: 'Revolutionizing our understanding of human civilization, Göbeklitepe features massive 16-ton T-shaped megalithic limestone pillars carved with high-relief animal totems dating to 9,600 BC. In nearby ancient Urfa, visit Balıklıgöl (Pool of Sacred Fish), the Urfa Archaeology Museum with the Urfa Man statue, and taste world-famous Urfa kebabs and roasted pistachio coffees.',
    topHighlights: [
      'Göbeklitepe 12,000-Year-Old Megalithic Stone Circles',
      'Karahantepe Newly Excavated Pre-Pottery Neolithic Site',
      'Balıklıgöl (Sacred Pool of Abraham) & Halil-ür Rahman Mosque',
      'Şanlıurfa Museum of Archaeology (Largest Museum Complex in Turkey)',
      'Traditional "Sıra Gecesi" Anatolian Live Folk Music & Dining Banquet'
    ],
    insiderTip: 'Our guides in Göbeklitepe are licensed field researchers who have participated in official excavation teams with the German Archaeological Institute.',
    idealDuration: '2 to 3 Days',
    bestTimeOfDay: 'Early morning under the protective geodesic shade dome',
    featuredInTours: ['12-Day Culinary & Göbeklitepe', '21-Day Ultimate Explorer']
  },
  {
    id: 'nemrut',
    name: 'Mount Nemrut Giant Stone Heads of Gods',
    turkishName: 'Nemrut Dağı – Tanrılar Mabedi',
    region: 'Southeastern Anatolia',
    category: 'UNESCO Wonder',
    x: 620,
    y: 245,
    flightConnected: false,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Colossal 2-meter tall stone heads of Persian, Greek, and Commagene gods sitting atop a 2,150m mountain summit tumulus.',
    detailedDesc: 'Built in the 1st century BC by King Antiochus I of Commagene as a sanctuary for his own immortal tomb. Sunrise and sunset atop the 2,134-meter peak are awe-inspiring as golden light illuminates the monumental seated statues of Zeus-Oromasdes, Apollo-Mithras, Heracles-Artagnes, and Antiochus himself.',
    topHighlights: [
      'East & West Terraces with Colossal Heads of Ancient Gods',
      'King Antiochus I 50-Meter Gravel Tumulus Tomb',
      'Cendere Roman Bridge (Built by Septimius Severus in 200 AD)',
      'Arsameia Ancient Commagene Summer Capital & Inscriptions',
      'Panoramic Sunrise/Sunset Views across the Euphrates Valley'
    ],
    insiderTip: 'Even during summer months, temperatures at the 2,100m summit at dawn can drop to 8°C. We supply warm Turkish wool blankets in the VIP vehicle.',
    idealDuration: '1 to 2 Days',
    bestTimeOfDay: 'Sunrise at East Terrace & Sunset at West Terrace',
    featuredInTours: ['21-Day Ultimate Explorer', '12-Day Culinary & Göbeklitepe']
  },
  {
    id: 'konya',
    name: 'Konya & Whirling Dervish Mysticism',
    turkishName: 'Konya – Mevlana Celaleddin-i Rumi',
    region: 'Central Anatolia',
    category: 'UNESCO Wonder',
    x: 380,
    y: 280,
    flightConnected: false,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'The spiritual capital of Islamic Sufism, resting place of Mevlana Rumi, and historic capital of the Seljuk Empire.',
    detailedDesc: 'Immerse yourself in Sufi philosophy and universal love at the green-domed Mevlana Museum. Witness the sacred Sema Whirling Dervish ceremony with hypnotic ney reed flutes, explore the 13th-century Sultan Han Caravanserai along the ancient Silk Road, and taste traditional Konya Etli Ekmek (woodfired Turkish lamb flatbread).',
    topHighlights: [
      'Mevlana Rumi Tomb & Turquoise Fluted Dome Museum',
      'Authentic Sema Whirling Dervishes Spiritual Ceremony',
      'Sultanhani 13th-Century Silk Road Caravanserai',
      'İnce Minare & Karatay Seljuk Tile Madrassa',
      'Historic Sille Greek Village with Aya Elena Byzantine Church'
    ],
    insiderTip: 'Our VIP guests receive reserved front-row seating for the authentic Sufi music ceremonies.',
    idealDuration: '1 Day',
    bestTimeOfDay: 'Afternoon museum walk & evening Sema meditation ceremony',
    featuredInTours: ['10-Day Classic Signature', '14-Day Grand Anatolian', '21-Day Ultimate Explorer']
  },
  {
    id: 'troy-gallipoli',
    name: 'Troy, Gallipoli & Canakkale Strait',
    turkishName: 'Truva & Çanakkale Şehitlikleri',
    region: 'Marmara',
    category: 'Ancient Monument',
    x: 110,
    y: 150,
    flightConnected: false,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDesc: 'Homer’s legendary Trojan War battleground and the moving WWI battlefields of Gallipoli and Anzac Cove.',
    detailedDesc: 'Stand where Achilles and Hector fought in Homer’s Iliad. Explore 9 layered cities of Troy spanning 4,000 years and the acclaimed new Troy Museum. Across the Dardanelles Strait, reflect at Anzac Cove, Lone Pine, Chunuk Bair, and the 57th Turkish Infantry Regiment memorial with profound peace and historical depth.',
    topHighlights: [
      'Ancient City of Troy 9 Archaeological Layers & Wooden Horse',
      'World-Class Museum of Troy (European Museum of the Year Winner)',
      'Gallipoli Historic Peninsula, Anzac Cove & Lone Pine Memorial',
      'Chunuk Bair New Zealand Memorial overlooking Aegean Sea',
      'Scenic Dardanelles Ferry Crossing between Europe and Asia'
    ],
    insiderTip: 'The new Troy Museum is an architectural masterpiece housing 2,000 gold relics and Homeric inscriptions.',
    idealDuration: '1 to 2 Days',
    bestTimeOfDay: 'Morning across Gallipoli & late afternoon at Troy Museum',
    featuredInTours: ['14-Day Grand Anatolian', '21-Day Ultimate Explorer']
  }
];

export const MAP_TOUR_ROUTES: MapTourRoute[] = [
  {
    tourId: '10-day-classic',
    tourName: '10-Day Classic Signature Turkey Tour',
    durationDays: 10,
    color: '#D4AF37', // Gold
    stops: [
      { poiId: 'istanbul', dayLabel: 'Days 1-3', description: 'Hagia Sophia, Topkapi Harem & Sunset Bosphorus Yacht' },
      { poiId: 'cappadocia', dayLabel: 'Days 4-6', description: 'Hot Air Balloon Sunrise, Cave Suites & Underground City' },
      { poiId: 'konya', dayLabel: 'Day 7', description: 'Silk Road Caravanserai & Mevlana Rumi Whirling Dervishes' },
      { poiId: 'pamukkale', dayLabel: 'Day 8', description: 'White Calcium Travertines & Cleopatra Thermal Pools' },
      { poiId: 'ephesus', dayLabel: 'Day 9', description: 'Library of Celsus, VIP Terrace Houses & Şirince Wine' },
      { poiId: 'istanbul', dayLabel: 'Day 10', description: 'Domestic flight return to Istanbul for departure' },
    ],
    segments: [
      { from: 'istanbul', to: 'cappadocia', type: 'flight', duration: '1h 15m Flight', highlight: 'Domestic Flight to Kayseri/Nevşehir' },
      { from: 'cappadocia', to: 'konya', type: 'road', duration: '3h Scenic Drive', highlight: 'VIP Mercedes Silk Road Drive via Sultanhani' },
      { from: 'konya', to: 'pamukkale', type: 'road', duration: '4h Scenic Drive', highlight: 'VIP Mercedes Lake District Drive' },
      { from: 'pamukkale', to: 'ephesus', type: 'road', duration: '2h 45m Drive', highlight: 'Meander Valley scenic olive orchards' },
      { from: 'ephesus', to: 'istanbul', type: 'flight', duration: '1h 05m Flight', highlight: 'Izmir ADB to Istanbul Domestic Flight' }
    ]
  },
  {
    tourId: '14-day-grand',
    tourName: '14-Day Grand Anatolian & Mediterranean Odyssey',
    durationDays: 14,
    color: '#38BDF8', // Sky Blue
    stops: [
      { poiId: 'istanbul', dayLabel: 'Days 1-3', description: 'Imperial palaces & private yacht' },
      { poiId: 'troy-gallipoli', dayLabel: 'Day 4', description: 'Gallipoli Anzac Cove & 9 layers of Troy' },
      { poiId: 'ephesus', dayLabel: 'Days 5-6', description: 'Ephesus Terrace Houses & Aegean Coast' },
      { poiId: 'pamukkale', dayLabel: 'Day 7', description: 'Hierapolis Roman spa & travertines' },
      { poiId: 'kas-kekova', dayLabel: 'Day 8', description: 'Simena Castle & Sunken City yacht swim' },
      { poiId: 'antalya', dayLabel: 'Days 9-10', description: 'Kaleiçi Old Town & Aspendos amphitheater' },
      { poiId: 'konya', dayLabel: 'Day 11', description: 'Sufi dervishes & Silk Road' },
      { poiId: 'cappadocia', dayLabel: 'Days 12-13', description: 'Balloon flight & cave suites' },
      { poiId: 'istanbul', dayLabel: 'Day 14', description: 'Flight back to Istanbul' },
    ],
    segments: [
      { from: 'istanbul', to: 'troy-gallipoli', type: 'road', duration: '4h Drive', highlight: 'Mercedes drive along Sea of Marmara' },
      { from: 'troy-gallipoli', to: 'ephesus', type: 'road', duration: '4h 30m Drive', highlight: 'Aegean coastal drive via Pergamon' },
      { from: 'ephesus', to: 'pamukkale', type: 'road', duration: '2h 45m Drive', highlight: 'Meander River olive valley' },
      { from: 'pamukkale', to: 'kas-kekova', type: 'road', duration: '3h 30m Drive', highlight: 'Taurus Mountain descent to Lycian coast' },
      { from: 'kas-kekova', to: 'antalya', type: 'road', duration: '3h Coastal Drive', highlight: 'Turquoise Coast cliffside highway' },
      { from: 'antalya', to: 'konya', type: 'road', duration: '4h Mountain Drive', highlight: 'Taurus Mountain pass' },
      { from: 'konya', to: 'cappadocia', type: 'road', duration: '3h Drive', highlight: 'Silk Road Caravanserai route' },
      { from: 'cappadocia', to: 'istanbul', type: 'flight', duration: '1h 15m Flight', highlight: 'Direct domestic flight to Istanbul' }
    ]
  },
  {
    tourId: '7-day-highlights',
    tourName: '7-Day Highlights of Turkey (Istanbul & Cappadocia)',
    durationDays: 7,
    color: '#F59E0B', // Amber
    stops: [
      { poiId: 'istanbul', dayLabel: 'Days 1-3', description: 'Old City, Hagia Sophia & Bosphorus Yacht' },
      { poiId: 'cappadocia', dayLabel: 'Days 4-6', description: 'Fairy Chimneys, Sunrise Balloon & Cave Hotel' },
      { poiId: 'istanbul', dayLabel: 'Day 7', description: 'Return flight to Istanbul for departure' },
    ],
    segments: [
      { from: 'istanbul', to: 'cappadocia', type: 'flight', duration: '1h 15m Flight', highlight: 'Morning domestic flight to Cappadocia' },
      { from: 'cappadocia', to: 'istanbul', type: 'flight', duration: '1h 15m Flight', highlight: 'Evening return flight to Istanbul' }
    ]
  },
  {
    tourId: '8-day-gulet',
    tourName: '8-Day Turquoise Coast Private Gulet Cruise',
    durationDays: 8,
    color: '#2DD4BF', // Teal
    stops: [
      { poiId: 'bodrum', dayLabel: 'Days 1-2', description: 'Boarding luxury handcrafted Gulet & St. Peter Castle' },
      { poiId: 'fethiye', dayLabel: 'Days 3-5', description: 'Blue Lagoon & secluded turquoise bays' },
      { poiId: 'kas-kekova', dayLabel: 'Days 6-7', description: 'Sunken City Kekova & Simena castle ruins' },
      { poiId: 'antalya', dayLabel: 'Day 8', description: 'Disembarkation & private transfer to airport' },
    ],
    segments: [
      { from: 'bodrum', to: 'fethiye', type: 'sea', duration: 'Private Sailing', highlight: 'Cruising secluded coves of Datça & Göcek' },
      { from: 'fethiye', to: 'kas-kekova', type: 'sea', duration: 'Private Sailing', highlight: 'Sailing along dramatic Lycian cliffs' },
      { from: 'kas-kekova', to: 'antalya', type: 'road', duration: '3h VIP Drive', highlight: 'Chauffeur transfer along coastal highway' }
    ]
  },
  {
    tourId: '12-day-culinary-gobekli',
    tourName: '12-Day Culinary Heritage & Göbeklitepe Sanctuary',
    durationDays: 12,
    color: '#FB7185', // Rose
    stops: [
      { poiId: 'istanbul', dayLabel: 'Days 1-3', description: 'Ottoman palace cuisine & Bosphorus' },
      { poiId: 'cappadocia', dayLabel: 'Days 4-6', description: 'Volcanic wine tasting & underground cities' },
      { poiId: 'nemrut', dayLabel: 'Days 7-8', description: 'Giant stone heads at summit sunrise' },
      { poiId: 'gobeklitepe', dayLabel: 'Days 9-11', description: '12,000-year-old temple & Gaziantep food' },
      { poiId: 'istanbul', dayLabel: 'Day 12', description: 'Flight back to Istanbul' },
    ],
    segments: [
      { from: 'istanbul', to: 'cappadocia', type: 'flight', duration: '1h 15m Flight', highlight: 'Flight to Cappadocia' },
      { from: 'cappadocia', to: 'nemrut', type: 'road', duration: '4h 30m Drive', highlight: 'Drive to Commagene mountain kingdom' },
      { from: 'nemrut', to: 'gobeklitepe', type: 'road', duration: '2h 30m Drive', highlight: 'Drive via Euphrates River to Şanlıurfa' },
      { from: 'gobeklitepe', to: 'istanbul', type: 'flight', duration: '1h 45m Flight', highlight: 'Direct flight Gaziantep/Urfa to Istanbul' }
    ]
  }
];
