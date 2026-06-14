// Central place for contact / booking details used across the site.

export const CONTACT_EMAIL = "info@thehimalayanchester.com";

// WhatsApp number in international format (91 = India) for wa.me links.
export const WHATSAPP_NUMBER = "916230379910";

// Display version of the phone/WhatsApp number.
export const WHATSAPP_DISPLAY = "+91 62303 79910";

// Phone number (same as WhatsApp), display + tel: link forms.
export const PHONE_DISPLAY = WHATSAPP_DISPLAY;
export const PHONE_TEL = "+916230379910";

export const WHATSAPP_MESSAGE =
  "Hi, I'd like to book a stay at The Himalayan Chester.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// Social profiles.
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61590603009485";
export const INSTAGRAM_URL = "https://www.instagram.com/thehimalayanchester/";
