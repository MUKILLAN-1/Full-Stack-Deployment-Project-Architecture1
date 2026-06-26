export const products = [
  {
    id: "solstice-chronograph",
    name: "Solstice Chronograph",
    price: 245.00,
    category: "accessories",
    description: "A precision-crafted timepiece featuring an Italian leather strap, surgical-grade stainless steel case, and a minimalist double-dial design. Built to transcend seasons and outlast trends.",
    mainImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.8,
    stock: 12,
    colors: [
      { name: "Slate Black", hex: "#1e293b" },
      { name: "Cognac Brown", hex: "#7c2d12" },
      { name: "Silver White", hex: "#e2e8f0" }
    ],
    sizes: ["One Size"],
    specs: {
      "Material": "316L Stainless Steel, Italian Calfskin",
      "Movement": "Japanese Quartz Chronograph",
      "Water Resistance": "5 ATM (50 meters)",
      "Case Diameter": "40mm",
      "Band Width": "20mm"
    },
    reviews: [
      { author: "Evelyn K.", rating: 5, date: "2026-05-12", comment: "Absolutely gorgeous. The leather feels soft yet durable, and the matte casing gets compliments daily." },
      { author: "Marcus T.", rating: 4, date: "2026-06-02", comment: "Very elegant watch. Minor issue with the clasp adjustment, but customer support resolved it immediately." }
    ]
  },
  {
    id: "classic-leather-tote",
    name: "Classic Leather Tote",
    price: 185.00,
    category: "accessories",
    description: "Handcrafted from full-grain vegetable-tanned leather, this spacious tote holds everything you need for the daily commute. Features a secure internal brass zipper pocket and comfortable shoulder straps.",
    mainImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.9,
    stock: 8,
    colors: [
      { name: "Tan", hex: "#b45309" },
      { name: "Midnight Black", hex: "#0f172a" }
    ],
    sizes: ["Medium", "Large"],
    specs: {
      "Material": "Full-Grain Vegetable-Tanned Leather, Brass Hardware",
      "Dimensions": "14\" H x 16\" W x 6\" D",
      "Strap Drop": "10.5\"",
      "Weight": "1.8 lbs"
    },
    reviews: [
      { author: "Sarah L.", rating: 5, date: "2026-04-20", comment: "The leather smells amazing and has started to develop a beautiful patina already. Worth every penny." }
    ]
  },
  {
    id: "oak-desk-chair",
    name: "Minimalist Oak Desk Chair",
    price: 320.00,
    category: "living",
    description: "An ergonomic masterpiece crafted from solid white oak and upholstered in premium high-density boucle wool fabric. Complements any modern workspace or dining set with pure architectural lines.",
    mainImage: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.7,
    stock: 5,
    colors: [
      { name: "Oatmeal Boucle", hex: "#f1f5f9" },
      { name: "Charcoal Wool", hex: "#334155" }
    ],
    sizes: ["Standard"],
    specs: {
      "Material": "Solid White Oak, Boucle Fabric, High-Resiliency Foam",
      "Seat Height": "18.5\"",
      "Total Height": "31.2\"",
      "Weight Capacity": "300 lbs"
    },
    reviews: [
      { author: "David A.", rating: 5, date: "2026-03-15", comment: "Extremely comfortable for long working hours. The wood finish is incredibly smooth." }
    ]
  },
  {
    id: "stellar-ceramic-vases",
    name: "Stellar Ceramic Vases (Set of 3)",
    price: 85.00,
    category: "living",
    description: "A trio of textured ceramic vessels displaying rich earthen tones. Wheel-thrown by local artisans, their unique silhouettes look gorgeous with dried botanicals or standing as solo sculptural statements.",
    mainImage: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.6,
    stock: 20,
    colors: [
      { name: "Terracotta Blend", hex: "#ca8a04" }
    ],
    sizes: ["Set of 3"],
    specs: {
      "Material": "Earthenware Clay, Matte Textured Glaze",
      "Vase Dimensions": "Small (6\"), Medium (8\"), Large (10.5\")",
      "Care": "Hand wash only"
    },
    reviews: [
      { author: "Clara M.", rating: 4, date: "2026-05-22", comment: "Love the shapes. They add a perfect organic feel to my bookshelf." }
    ]
  },
  {
    id: "wool-trench-coat",
    name: "Urban Wool Trench Coat",
    price: 295.00,
    category: "apparel",
    description: "Tailored from heavy double-faced wool, this trench coat is designed for clean structural layering. Features deep storm flaps, self-tie belt, and horn buttons. Windproof and timeless.",
    mainImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.8,
    stock: 6,
    colors: [
      { name: "Camel", hex: "#d97706" },
      { name: "Oatmeal", hex: "#cbd5e1" },
      { name: "Black", hex: "#020617" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    specs: {
      "Material": "80% Virgin Wool, 20% Nylon Cashmere Blend",
      "Lining": "100% Cupro Rayon",
      "Fit": "Relaxed Overcoat silhouette",
      "Dry Clean": "Recommended"
    },
    reviews: [
      { author: "Victoria P.", rating: 5, date: "2026-01-18", comment: "Exquisite tailoring! It keeps me incredibly warm and coordinates with everything." }
    ]
  },
  {
    id: "organic-cotton-tee",
    name: "Organic Cotton Comfort Tee",
    price: 38.00,
    category: "apparel",
    description: "Crafted from long-staple organic cotton in a medium-heavy 220 GSM weight. Cut in a boxy, contemporary drape that retains its structure wash after wash.",
    mainImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.5,
    stock: 45,
    colors: [
      { name: "Alabaster White", hex: "#f8fafc" },
      { name: "Vintage Black", hex: "#334155" },
      { name: "Sage Green", hex: "#86efac" }
    ],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      "Material": "100% GOTS Certified Organic Cotton",
      "Weight": "220 GSM",
      "Country of Origin": "Portugal",
      "Care": "Machine wash cold, tumble dry low"
    },
    reviews: [
      { author: "Jordan F.", rating: 5, date: "2026-06-10", comment: "Finally a t-shirt that isn't paper thin. Fits perfectly boxy." },
      { author: "Liam S.", rating: 4, date: "2026-06-20", comment: "Nice quality. Shrunk just a tiny bit in hot water, so stick to cold wash." }
    ]
  },
  {
    id: "eucalyptus-sleep-mist",
    name: "Eucalyptus & Lavender Sleep Mist",
    price: 28.00,
    category: "wellness",
    description: "Formulated with pure botanical essential oils, this gentle pillow spray induces absolute calm. Promotes deep, restorative breathing patterns and creates an instant spa atmosphere.",
    mainImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.7,
    stock: 35,
    colors: [
      { name: "Amber Glass", hex: "#7c2d12" }
    ],
    sizes: ["100ml"],
    specs: {
      "Ingredients": "Organic Eucalyptus Oil, French Lavender Oil, Witch Hazel, Distilled Water",
      "Cruelty-Free": "Yes (Leaping Bunny certified)",
      "Synthetics": "0% Parabens, Phthalates, or Artificial Fragrance"
    },
    reviews: [
      { author: "Sophie W.", rating: 5, date: "2026-04-14", comment: "My evening ritual now revolves around this. Smells incredibly high-end and not overly sweet." }
    ]
  },
  {
    id: "aura-soy-wax-candle",
    name: "Aura Soy Wax Candle",
    price: 34.00,
    category: "wellness",
    description: "Poured by hand in small batches, featuring base notes of cedarwood, amber, and patchouli, layered with refreshing bergamot and dry fig. Burns cleanly for up to 50 hours in an elegant matte ceramic vessel.",
    mainImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    ],
    rating: 4.9,
    stock: 25,
    colors: [
      { name: "Sand Ceramic", hex: "#f1f5f9" }
    ],
    sizes: ["8 oz"],
    specs: {
      "Material": "100% Natural Soy Wax, Wood Wick",
      "Burn Time": "Approx. 50 Hours",
      "Vessel": "Reusable Stoneware Cup",
      "Hand-poured": "Brooklyn, NY"
    },
    reviews: [
      { author: "Chloe H.", rating: 5, date: "2026-06-11", comment: "The wood wick makes this soothing crackle noise. The scent profile is incredibly sophisticated, filling the room without being overpowering." }
    ]
  }
];
