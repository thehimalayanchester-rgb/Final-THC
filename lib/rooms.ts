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
    image:
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG_9348_premium.jpg",
    images: [
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-5-3zx9vg.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-0-70t66v.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-4-81ednm.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-2-asccmw.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-7-0gv4ay.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-1-l3jmrh.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-6-d1sk06.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867787293-3-ddanmm.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-5-w3wh7o.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-1-oaqhks.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-3-ldvszm.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-6-are2aj.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-7-y07r51.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-4-i5tkwz.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-9-7i2i3j.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-0-9gnsgj.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-8-9mctqv.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867732295-2-2j1tou.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-6-7aaapf.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-1-o5nbbd.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-4-yqphrv.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-0-22eqhb.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-7-6wp7ec.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-3-x0zzqn.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-2-yzzl18.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-5-calbt3.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-8-wzqs52.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/superior-rooms/1781867587456-9-6i2yct.webp",
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
    gallery: ["/room_dummy.png", "/about-section.png", "/hero-Background.png"],
  },
  {
    id: 2,
    name: "Honeymoon Suite",
    image:
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG%2011.png",
    images: [
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-5-in4nmo.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-6-bn5aba.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-2-f1u7cn.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-4-z8r4kb.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-3-e8uill.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-1-scailu.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/honeymoon-suite/1781867172828-0-11on98.webp",
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
    gallery: ["/room_dummy.png", "/about-section.png", "/hero-Background.png"],
  },
  {
    id: 3,
    name: "The Opus Suite",
    image:
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG%2010%20(1).png",
    images: [
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-opus-suite/1781867386498-2-4zvfad.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-opus-suite/1781867386498-4-wtfwgq.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-opus-suite/1781867386498-3-cz4itg.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-opus-suite/1781867386498-5-alh67p.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-opus-suite/1781867386498-1-go03j2.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-opus-suite/1781867386498-0-ipkih8.webp",
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
    gallery: ["/room_dummy.png", "/about-section.png", "/hero-Background.png"],
  },
  {
    id: 4,
    name: "The Sanctuary Suite",
    image:
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG%2014%20(1).png",
    images: [
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-1-x2zume.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-7-13q9v6.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-2-z0tofj.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-4-saqlfc.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-6-lvxzen.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501053-0-6bg3ks.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-5-esjgnd.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-sanctuary-suite/1781867501054-3-q2wejt.webp",
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
    gallery: ["/room_dummy.png", "/about-section.png", "/hero-Background.png"],
  },
  {
    id: 5,
    name: "The Himalayan Chester Suite",
    image:
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/Videos%20and%20important%20images/IMG%2020.png",
    images: [
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301102-7-zq7lno.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301103-9-1zvp2r.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301102-6-qaphdt.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301103-11-wr2lz9.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301104-13-1c8u3a.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301104-14-y9i8ek.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301100-0-7j2zml.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301102-4-xqkt2p.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301101-2-za2kj4.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301104-12-83jwfi.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301101-1-wkghbc.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301105-16-idsuyq.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301102-5-kiuh0l.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301105-15-iqlfz3.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301103-10-lzdyvl.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301103-8-yylhvi.webp",
      "https://ksfgavzcnkfckvsuxfxk.supabase.co/storage/v1/object/public/gallery/the-himalayan-chester-suite/1781867301101-3-dlp7wo.webp",
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
    gallery: ["/room_dummy.png", "/about-section.png", "/hero-Background.png"],
  },
];

export function getRoomById(id: number): Room | undefined {
  return roomsData.find((room) => room.id === id);
}
