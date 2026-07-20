export type Room = {
  id: number;
  name: string;
  image: string;
  // Optional carousel images for the room card. Falls back to `image` if omitted.
  images?: string[];
  desc: string;
  inclusions: string[];
  seasonal: string;
  seasonalNote: string;
  offSeason: string;
  offSeasonNote: string;
  // Detail-page fields
  size: string;
  occupancy: string;
  bed: string;
  view: string;
  longDesc: string[];
  features: string[];
  gallery: string[];
};

export const roomsData: Room[] = [
  {
    id: 1,
    name: "Superior Rooms",
    image: "/rooms/superior/superior-1.webp",
    images: [
      "/rooms/superior/superior-1.webp",
      "/rooms/superior/superior-2.webp",
      "/rooms/superior/superior-3.webp",
      "/rooms/superior/superior-4.webp",
      "/rooms/superior/superior-5.webp",
      "/rooms/superior/superior-6.webp",
    ],
    desc: "Comfortable, well-appointed rooms with warm Pahari interiors and serene valley views.",
    inclusions: [],
    seasonal: "10,000",
    seasonalNote: "+ Applicable taxes",
    offSeason: "5,000",
    offSeasonNote: "+ applicable charges",
    size: "350 sq.ft",
    occupancy: "2 Adults",
    bed: "1 Queen Bed",
    view: "Garden & Valley View",
    longDesc: [
      "Our Superior Rooms offer a cosy and inviting retreat after a day in the mountains. Finished with warm local woodwork, handwoven textiles, and soft earthy tones, each room captures the understated charm of Pahari living.",
      "Large windows frame tranquil garden and valley views, while thoughtful modern comforts ensure your stay is as restful as it is authentic.",
    ],
    features: [
      "Free High-Speed Wi-Fi",
      "En-suite Bathroom",
      "Centrally Room Heating",
      "Smart TV",
      "Tea & Coffee Maker",
      "Daily Housekeeping",
    ],
    gallery: ["/room_dummy.webp", "/about-section.webp", "/hero-Background.png"],
  },
  {
    id: 2,
    name: "Honeymoon Suite",
    image: "/rooms/honeymoon/honeymoon-1.webp",
    images: [
      "/rooms/honeymoon/honeymoon-1.webp",
      "/rooms/honeymoon/honeymoon-2.webp",
      "/rooms/honeymoon/honeymoon-3.webp",
      "/rooms/honeymoon/honeymoon-4.webp",
      "/rooms/honeymoon/honeymoon-5.webp",
    ],
    desc: "A romantic retreat crafted for couples, complete with curated indulgences.",
    inclusions: ["Candlelight Dinner", "Cake", "Wine", "Flower Decorations"],
    seasonal: "15,000",
    seasonalNote: "+ Applicable taxes",
    offSeason: "8,000",
    offSeasonNote: "+ applicable charges",
    size: "450 sq.ft",
    occupancy: "2 Adults",
    bed: "1 King Bed",
    view: "Valley View",
    longDesc: [
      "The Honeymoon Suite is a celebration of romance, designed to make your special moments unforgettable. A spacious king bed, soft ambient lighting, and elegant decor set the scene for an intimate mountain getaway.",
      "Your stay comes complete with a candlelight dinner, a celebratory cake, a bottle of wine, and beautiful floral decorations, every detail arranged to delight.",
    ],
    features: [
      "Free High-Speed Wi-Fi",
      "Private Balcony",
      "Luxury En-suite Bathroom",
      "Centrally Room Heating",
      "Smart TV",
      "Premium Toiletries",
    ],
    gallery: ["/room_dummy.webp", "/about-section.webp", "/hero-Background.png"],
  },
  {
    id: 3,
    name: "The Opus Suite",
    image: "/rooms/opus-suite/opus-suite-1.webp",
    images: [
      "/rooms/opus-suite/opus-suite-1.webp",
      "/rooms/opus-suite/opus-suite-2.webp",
      "/rooms/opus-suite/opus-suite-3.webp",
      "/rooms/opus-suite/opus-suite-4.webp",
      "/rooms/opus-suite/opus-suite-5.webp",
    ],
    desc: "An indulgent suite featuring a private jacuzzi and refined mountain luxury.",
    inclusions: ["Private Jacuzzi"],
    seasonal: "20,000",
    seasonalNote: "+ Applicable taxes",
    offSeason: "13,000",
    offSeasonNote: "+ applicable charges",
    size: "550 sq.ft",
    occupancy: "2 Adults + 1 Child",
    bed: "1 King Bed",
    view: "Panoramic Mountain View",
    longDesc: [
      "The Opus Suite is where indulgence meets the mountains. Centered around a private jacuzzi, this generously sized suite invites you to unwind in complete comfort while taking in panoramic Himalayan vistas.",
      "Refined interiors, plush furnishings, and a dedicated lounge area make it the perfect choice for those seeking an elevated, restorative escape.",
    ],
    features: [
      "Private Jacuzzi",
      "Free High-Speed Wi-Fi",
      "Lounge Seating Area",
      "Luxury En-suite Bathroom",
      "Smart TV",
      "Centrally Room Heating",
    ],
    gallery: ["/room_dummy.webp", "/about-section.webp", "/hero-Background.png"],
  },
  {
    id: 4,
    name: "The Sanctuary Suite",
    image: "/rooms/sanctuary/sanctuary-1.webp",
    images: [
      "/rooms/sanctuary/sanctuary-1.webp",
      "/rooms/sanctuary/sanctuary-2.webp",
      "/rooms/sanctuary/sanctuary-3.webp",
      "/rooms/sanctuary/sanctuary-4.webp",
      "/rooms/sanctuary/sanctuary-5.webp",
    ],
    desc: "A tranquil haven of space and elegance, your private sanctuary in the hills.",
    inclusions: [],
    seasonal: "20,000",
    seasonalNote: "+ Applicable taxes",
    offSeason: "13,000",
    offSeasonNote: "+ applicable charges",
    size: "550 sq.ft",
    occupancy: "2 Adults + 1 Child",
    bed: "1 King Bed",
    view: "Forest & Mountain View",
    longDesc: [
      "The Sanctuary Suite lives up to its name, a serene, spacious haven designed for deep rest and quiet reflection. Surrounded by forest and mountain views, it offers a calming escape from the rush of everyday life.",
      "Elegant interiors, a comfortable seating area, and an abundance of natural light create a peaceful atmosphere you'll never want to leave.",
    ],
    features: [
      "Free High-Speed Wi-Fi",
      "Private Balcony",
      "Lounge Seating Area",
      "Luxury En-suite Bathroom",
      "Smart TV",
      "Centrally Room Heating",
    ],
    gallery: ["/room_dummy.webp", "/about-section.webp", "/hero-Background.png"],
  },
  {
    id: 5,
    name: "The Himalayan Chester Suite",
    image: "/rooms/the-himalayan-chester/himalayan-chester-1.webp",
    images: [
      "/rooms/the-himalayan-chester/himalayan-chester-1.webp",
      "/rooms/the-himalayan-chester/himalayan-chester-2.webp",
      "/rooms/the-himalayan-chester/himalayan-chester-3.webp",
      "/rooms/the-himalayan-chester/himalayan-chester-4.webp",
      "/rooms/the-himalayan-chester/himalayan-chester-5.webp",
      "/rooms/the-himalayan-chester/himalayan-chester-6.webp",
      "/rooms/the-himalayan-chester/himalayan-chester-7.webp",
    ],
    desc: "Our signature suite, the pinnacle of heritage luxury and panoramic Himalayan grandeur.",
    inclusions: [],
    seasonal: "30,000",
    seasonalNote: "+ Applicable taxes",
    offSeason: "20,000",
    offSeasonNote: "+ applicable charges",
    size: "750 sq.ft",
    occupancy: "3 Adults",
    bed: "1 King Bed + Living Area",
    view: "360° Himalayan View",
    longDesc: [
      "The Himalayan Chester Suite is our crowning accommodation, an expansive sanctuary that embodies the very best of heritage luxury. A separate living area, premium furnishings, and sweeping 360° views of the Himalayas make every moment feel extraordinary.",
      "Crafted for guests who expect nothing less than perfection, this signature suite blends timeless Pahari craftsmanship with the finest modern comforts.",
    ],
    features: [
      "Free High-Speed Wi-Fi",
      "Separate Living Area",
      "Private Balcony",
      "Luxury En-suite Bathroom",
      "Smart TV",
      "Premium Toiletries",
    ],
    gallery: ["/room_dummy.webp", "/about-section.webp", "/hero-Background.png"],
  },
];

export function getRoomById(id: number): Room | undefined {
  return roomsData.find((room) => room.id === id);
}
