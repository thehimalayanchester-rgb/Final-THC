"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faQuoteRight,
  faLeaf,
  faSun,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

// Verbatim 5-star Google reviews for The Himalayan Chester.
const reviews = [
  {
    id: 1,
    name: "Diveshwar Thakur",
    location: "GOOGLE REVIEW",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjXFLA01fqrCCiS78o5QNx8iw751GtwbxpR7LedLpXOfuOCQpdcl=s120-c-rp-mo-br100",
    text: "I had an amazing stay at Himalayan Chester Hotel. The rooms were clean, spacious, and very comfortable, with beautiful mountain views. The staff were extremely friendly, polite, and always ready to help, making us feel welcome throughout our stay. The location is excellent — peaceful yet conveniently close to major attractions.",
  },
  {
    id: 2,
    name: "aditya mahant",
    location: "GOOGLE REVIEW",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjUrtNdK-xjQd35eG74NAy9IaFLJXgcAAC-wIl4-l5NP4cP8oO0A=s120-c-rp-mo-ba12-br100",
    text: "One of the best places to stay in Manali. The Himalayan Chester offers stunning views, spacious rooms, and exceptional service. The staff made us feel at home, and every detail was taken care of perfectly. Looking forward to visiting again!",
  },
  {
    id: 3,
    name: "Prashant Sood",
    location: "GOOGLE REVIEW",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjUSWvfQ5brZMxUKxwQ-rnA7UGyTNWjum5_9NWJT576JF_Tg6GUe=s120-c-rp-mo-ba12-br100",
    text: "My stay at The Himalayan Chester, Simsa, Manali was truly delightful. Nestled amidst the majestic mountains, the property offers breathtaking panoramic views of the Manali valley. The rooms were clean, comfortable, and well-maintained, and the hospitality of the staff was exceptional — warm, courteous, and always ready to assist with a smile.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-linear-to-b from-[#0a0f12] to-[#0d141b] py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[#c5a367] uppercase tracking-[4px] text-[13px] font-bold mb-4 block">
            <span className="eyebrow-rule">Guest Book</span>
          </span>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Tales from <span className="text-gold-gradient italic">Travellers</span>
          </h2>
          <div className="flex justify-center items-center gap-4 text-[#c5a367] text-lg opacity-80">
            <span className="h-px w-10 bg-linear-to-r from-transparent to-[#c5a367]/60" />
            <FontAwesomeIcon icon={faLeaf} />
            <FontAwesomeIcon icon={faSun} />
            <FontAwesomeIcon icon={faMountain} />
            <span className="h-px w-10 bg-linear-to-l from-transparent to-[#c5a367]/60" />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative bg-linear-to-b from-[#11191f] to-[#0b1013] p-8 md:p-10 border-t-4 border-[#c5a367] shadow-2xl group hover:from-[#16212a] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Quote Watermark */}
              <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="text-white text-6xl"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-[#c5a367] text-xs mb-6">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-sans italic text-gray-300 text-[16px] md:text-[18px] leading-relaxed mb-10 relative z-10">
                &quot;{review.text}&quot;
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#c5a367]/30">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white text-lg">
                    {review.name}
                  </span>
                  <span className="font-sans text-[#c5a367] text-[11px] font-bold tracking-[2px] uppercase">
                    {review.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write a Review CTA */}
        <div className="text-center mt-16">
          <a
            href="https://www.google.com/search?hl=en-IN&gl=in&q=Khasra+no+142,+143,+The+himalayan+chester,+Muhal+Gadherani,+Simsa,+manali,+Manali,+Gadherni,+Himachal+Pradesh+175131&ludocid=4136474111365700963&lsig=AB86z5WpOEZhGzpbGKDpFuRzPfiE#lrd=0x390489cbbf1dc1fb:0x3967b549ce8d5d63,3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c5a367] hover:bg-white text-black px-8 py-4 text-[13px] font-bold uppercase tracking-[2px] transition-colors"
          >
            <FontAwesomeIcon icon={faStar} />
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
