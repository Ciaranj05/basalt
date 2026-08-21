export const contactEmail =
  process.env.NEXT_PUBLIC_BASALT_CONTACT_EMAIL?.trim() || "hello@basalt.co";

const configuredWhatsAppNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "";

export const whatsappNumber = configuredWhatsAppNumber.replace(/\D/g, "");

export const whatsappMessage =
  "Hi, I'd like to find out more about Basalt and what it could show us about our golf course.";

export const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  : null;

export const contactHref = "/contact";

export const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
  "Basalt course enquiry",
)}`;

export const whatsappCtaHref = whatsappHref || contactHref;
