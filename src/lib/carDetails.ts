import { cars, type Car } from "@/lib/cars";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

const gallery = [car1, car2, car3, car4, car5, car6];

export type InspectionStatus = "Excellent" | "Good" | "Needs Attention";

export type CarDetail = Car & {
  ownership: string;
  color: string;
  insurance: string;
  registration: string;
  engine: string;
  seats: number;
  mileage: string;
  images: string[];
  features: string[];
  description: string[];
  inspection: { category: string; status: InspectionStatus; note: string }[];
};

const ALL_FEATURES = [
  "Panoramic Sunroof",
  "Adaptive Cruise Control",
  "Ventilated Leather Seats",
  "12.3\" Touchscreen Infotainment",
  "Reverse Camera",
  "360° Surround Camera",
  "ABS with EBD",
  "ESP / Stability Control",
  "Front & Rear Parking Sensors",
  "8 Airbags",
  "Wireless Apple CarPlay",
  "Heads-Up Display",
  "Powered Tailgate",
  "Ambient Lighting",
];

const INSPECTION_TEMPLATE: { category: string; status: InspectionStatus; note: string }[] = [
  { category: "Engine", status: "Excellent", note: "Smooth idle, no leaks, full service history" },
  { category: "Suspension", status: "Excellent", note: "Bushings and shockers in optimal condition" },
  { category: "Electrical", status: "Good", note: "All electronics functional and verified" },
  { category: "Tyres", status: "Good", note: "Tread depth 70%+ on all four wheels" },
  { category: "Body", status: "Excellent", note: "Original paint, no panel work or accidents" },
  { category: "Interior", status: "Excellent", note: "Clean, non-smoker, leather in pristine condition" },
  { category: "Battery", status: "Good", note: "Battery health verified, replaced 2024" },
  { category: "Brakes", status: "Excellent", note: "Pads & rotors inspected, even wear" },
];

export function getCarBySlug(slug: string): CarDetail | undefined {
  const car = cars.find((c) => c.id === slug);
  if (!car) return undefined;
  const idx = cars.indexOf(car);
  const images = [
    car.image,
    ...gallery.filter((g) => g !== car.image),
  ].slice(0, 6);

  return {
    ...car,
    ownership: idx % 3 === 0 ? "1st Owner" : "2nd Owner",
    color: ["Obsidian Black", "Mineral White", "Glacier Silver", "Cardinal Red", "Atlas Blue"][idx % 5],
    insurance: "Comprehensive — Valid till Mar 2026",
    registration: ["TS", "KA", "MH", "DL", "TN"][idx % 5] + "-" + (10 + idx),
    engine: car.fuel === "Diesel" ? "2.0L Turbocharged Diesel" : "3.0L Inline-6 Turbo Petrol",
    seats: 5,
    mileage: car.fuel === "Diesel" ? "15.4 km/l" : "11.8 km/l",
    images,
    features: ALL_FEATURES.slice(0, 10 + (idx % 4)),
    description: [
      `This ${car.year} ${car.brand} ${car.model} ${car.variant} comes to us in showroom condition with a fully documented service history. Driven sparingly and maintained meticulously by its previous owner, it presents an exceptional opportunity for the discerning buyer.`,
      `Every panel has been inspected for originality, the interior remains pristine, and the mechanicals have been verified by our certified technicians. Single-key, non-accidental, and ready for immediate delivery.`,
      `Test drives can be arranged at our facility or your preferred location. Finance and insurance assistance available on the spot.`,
    ],
    inspection: INSPECTION_TEMPLATE,
  };
}

export function getRelated(slug: string, n = 4): Car[] {
  const current = cars.find((c) => c.id === slug);
  if (!current) return cars.slice(0, n);
  return cars
    .filter((c) => c.id !== slug)
    .sort((a, b) => Math.abs(a.price - current.price) - Math.abs(b.price - current.price))
    .slice(0, n);
}
