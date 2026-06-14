"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const inputClass =
  "w-full bg-[#0a0f12] border border-white/10 py-3.5 px-4 text-white font-sans text-sm placeholder-gray-600 focus:outline-none focus:border-[#c5a367] transition-colors";
const labelClass =
  "block text-[#c5a367] text-[11px] font-bold uppercase tracking-[2px] font-sans mb-3";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const submittedRef = useRef(false); // ignore the iframe's initial load
  const [showThanks, setShowThanks] = useState(false);

  // Fires after the form POSTs into the hidden iframe (and on first mount).
  const handleIframeLoad = () => {
    if (!submittedRef.current) return;
    submittedRef.current = false;
    formRef.current?.reset();
    setShowThanks(true);
  };

  return (
    <div className="bg-linear-to-b from-[#11191f] to-[#0b1013] border border-white/5 border-t-4 border-t-[#c5a367] p-6 md:p-8 shadow-2xl">
      <h2 className="font-serif text-white text-2xl md:text-3xl mb-6">
        Send a Message
      </h2>

      {/* Hidden target so the submission doesn't navigate away from the page */}
      <iframe
        name="zoho-target-iframe"
        title="form target"
        className="hidden"
        onLoad={handleIframeLoad}
      />

      {/*
        IMPORTANT: Do not change or remove the `name` attributes on the inputs
        below. Zoho records submissions by field name. The hidden fields and
        the form `action` must also stay intact.
      */}
      <form
        ref={formRef}
        action="https://forms.zohopublic.in/thehimalayanchestergm1/form/Contact/formperma/Q7RQEMhttPkilS45VUBSeV0fQ5POZ_DhI2u2cTZd-tc/htmlRecords/submit"
        name="form"
        id="form"
        method="POST"
        acceptCharset="UTF-8"
        encType="multipart/form-data"
        target="zoho-target-iframe"
        onSubmit={() => {
          submittedRef.current = true;
        }}
      >
        {/* Zoho hidden tracking fields */}
        <input type="hidden" name="zf_referrer_name" defaultValue="" />
        <input type="hidden" name="zf_redirect_url" defaultValue="" />
        <input type="hidden" name="zc_gad" defaultValue="" />

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="SingleLine"
              maxLength={255}
              required
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="PhoneNumber_countrycode"
              maxLength={20}
              required
              placeholder="+91 ..."
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="Email"
              maxLength={255}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              id="message"
              name="MultiLine"
              maxLength={65535}
              rows={5}
              placeholder="How can we help?"
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#c5a367] hover:bg-white text-black py-4 text-[13px] font-black uppercase tracking-[2px] transition-all duration-500 shadow-lg active:scale-[0.99]"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Thank-you popup */}
      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowThanks(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="thanks-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 22, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-linear-to-b from-[#11191f] to-[#0b1013] border border-white/10 border-t-4 border-t-[#c5a367] p-8 md:p-10 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowThanks(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>

              <span className="mx-auto mb-6 flex w-16 h-16 items-center justify-center rounded-full border-2 border-[#c5a367] text-[#c5a367]">
                <FontAwesomeIcon icon={faCheck} className="text-2xl" />
              </span>

              <h3
                id="thanks-title"
                className="font-serif text-white text-3xl mb-3"
              >
                Thank You!
              </h3>
              <p className="text-gray-400 font-sans text-[15px] leading-relaxed mb-8">
                Your message has been received. Our team will get back to you
                shortly.
              </p>

              <button
                type="button"
                onClick={() => setShowThanks(false)}
                className="inline-block bg-[#c5a367] hover:bg-white text-black px-10 py-3.5 text-[13px] font-black uppercase tracking-[2px] transition-all duration-500"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
