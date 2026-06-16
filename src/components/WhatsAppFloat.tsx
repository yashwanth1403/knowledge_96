import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/leads";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappHref("Hi Knowledge_96, I'd like to enquire about a vehicle.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] md:bottom-8 md:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <MessageCircle className="relative h-6 w-6" strokeWidth={2.2} />
    </motion.a>
  );
}
