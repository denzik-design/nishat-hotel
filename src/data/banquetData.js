export const BANQUET_VENUES = {
  'johar-town': [
    {
      id: 'jt-crystal-ballroom',
      name: 'The Grand Crystal Ballroom',
      capacity: '300 – 1,500 Guests',
      maxGuests: 1500,
      area: '25,000 sq. ft.',
      ceiling: '28 ft. Crystal Chandeliers',
      description: 'Pakistan’s most prestigious pillar-less grand ballroom featuring imported Austrian Swarovski chandeliers, acoustic isolation, and dedicated VIP motorcade reception.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      idealFor: ['Royal Weddings & Barat', 'International Summits', 'Corporate Galas']
    },
    {
      id: 'jt-victoria-hall',
      name: 'The Victoria Hall',
      capacity: '100 – 400 Guests',
      maxGuests: 400,
      area: '8,500 sq. ft.',
      ceiling: '18 ft. Coffered Ceiling',
      description: 'An elegant neoclassical venue tailored for intimate receptions, bridal showers, corporate symposiums, and executive dinners.',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      idealFor: ['Walima Receptions', 'Corporate AGM', 'Anniversaries']
    }
  ],
  'gulberg': [
    {
      id: 'gb-imperial-hall',
      name: 'The Imperial Hall — Gulberg',
      capacity: '80 – 450 Guests',
      maxGuests: 450,
      area: '9,000 sq. ft.',
      ceiling: '20 ft. Art-Deco Architecture',
      description: 'Situated in high-fashion Gulberg, featuring custom marble flooring, mood-programmable ambient lighting, and bespoke haute couture event styling.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      idealFor: ['Fashion Shows', 'Luxury Engagements', 'Boutique Weddings']
    },
    {
      id: 'gb-courtyard-garden',
      name: 'The Royal Courtyard Garden',
      capacity: '50 – 250 Guests',
      maxGuests: 250,
      area: '6,000 sq. ft. Open-Air Lawn',
      ceiling: 'Under the Stars',
      description: 'An enchanting open-air courtyard garden flanked by Italian fountains and ambient fairy lights for winter barbecue nights and private soirees.',
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
      idealFor: ['Open-air Qawwali Nights', 'Mehndi Functions', 'Private Brunches']
    }
  ],
  'islamabad': [
    {
      id: 'isb-margalla-ballroom',
      name: 'The Margalla Grand Ballroom',
      capacity: '150 – 600 Guests',
      maxGuests: 600,
      area: '14,000 sq. ft.',
      ceiling: '22 ft. Panoramic Mountain Glazing',
      description: 'Commanding breathtaking vistas of the Margalla Hills with bulletproof executive perimeter security, state-of-the-art teleconferencing, and diplomatic dining.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      idealFor: ['Diplomatic Receptions', 'State Delegations', 'Elite Weddings']
    }
  ]
};

export const BANQUET_PACKAGES = [
  {
    id: 'silver',
    name: 'Silver Prestige Menu',
    pricePKR: 3800,
    tagline: 'Refined Executive Gathering',
    courses: [
      '2 Artisanal Starters (Crispy Prawn Tempura & Royal Chicken Seekh Kebab)',
      '4 Gourmet Mains (Mutton Handi, Chicken Biryani, Grilled Fish, Pasta Primavera)',
      'Assorted Roghani Naan & Tandoori Breads',
      '3 Signature Desserts (Shahi Tukray, Kulfi, Seasonal Tart)'
    ]
  },
  {
    id: 'gold',
    name: 'Imperial Gold Menu',
    pricePKR: 5200,
    isPopular: true,
    tagline: '5-Star Traditional & Continental Feast',
    courses: [
      '4 Starters (Smoked Salmon Crostini, Mutton Boti, Stuffed Mushrooms, Reshmi Kebab)',
      '6 Gourmet Mains (Royal Mutton Qorma, Chicken Tikka Karahi, Grilled Red Snapper, Fettuccine Alfredo, Hyderabadi Dum Biryani)',
      'Live BBQ Pit & Tandoor Station',
      '5 Signature Desserts (Belgian Chocolate Fountain, Gulab Jamun, Ras Malai, Warm Bread Pudding)'
    ]
  },
  {
    id: 'platinum',
    name: 'Sultanate Platinum Feast',
    pricePKR: 7500,
    tagline: 'Opulent Royal Wedding Banquet',
    courses: [
      'Whole Stuffed Roast Lamb (Ouzi) Carvery Station',
      'Artisanal Sushi, Tempura & Jumbo Gulf Prawns Counter',
      '8 Grand Royal Mains (Wild Forest Truffle Beef Fillet, Royal Durbari Mutton, Kashmiri Pulao, Lobster Tail Thermidor)',
      'Full BVLGARI Bone China and Silverware Table Styling',
      '8 International Desserts (French Patisserie Carousel, Live Ice Cream Teppanyaki, Warm Pistachio Halwa)'
    ]
  }
];

export const BANQUET_ADDONS = [
  {
    id: 'floral',
    name: 'Royal Floral Stage Architecture & Entrance',
    pricePKR: 120000,
    subtitle: 'Imported fresh Dutch blooms, custom stage sofa, and red carpet aisle'
  },
  {
    id: 'music',
    name: 'Mughal Shehnai & Classical Live Sitar',
    pricePKR: 45000,
    subtitle: 'Traditional master artists performing ambient welcoming melodies'
  },
  {
    id: 'av',
    name: 'Full 4K LED Screen Backdrop & Concert Sound',
    pricePKR: 65000,
    subtitle: '30ft x 10ft P2.5 indoor LED wall, dynamic stage spotlights, and wireless mics'
  },
  {
    id: 'valet',
    name: 'VIP Valet Parking Fleet & Protocol Escorts',
    pricePKR: 35000,
    subtitle: '20 dedicated uniformed chauffeurs with computerized vehicle retrieval'
  }
];
