export const BUSINESS = {
  name: "Knowledge_96",
  phone: "9014206533",
  phoneIntl: "+919014206533",
  email: "Syedmujahid151@gmail.com",
} as const;

export const telHref = `tel:${BUSINESS.phoneIntl}`;
export const mailHref = `mailto:${BUSINESS.email}`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${BUSINESS.phoneIntl.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
