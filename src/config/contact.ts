// EDIT THESE — your contact details surface in WhatsApp widget, footer, and Consultations page.
// WhatsApp number must be in international format with no spaces or dashes (e.g. "447123456789").
// If you do not yet have a number, leave the placeholder; the widget will not be rendered.

export const CONTACT = {
  whatsappNumber: "447429910079",
  whatsappPrefill:
    "Hi Dr. Ali — I'm interested in a DeepSynaps consultation / AI protocol service.",
  email: "ali.yildirim@deepsynaps.com",
  founder: "Dr. Ali Yildirim",
  org: "DeepSynaps",
  basedIn: "United Kingdom",
} as const;

export const isWhatsAppConfigured = () => {
  const n: string = CONTACT.whatsappNumber;
  return n !== "447000000000" && n.length > 6;
};
