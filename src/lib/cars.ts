import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

export type Car = {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  km: number;
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  price: number;
  location: string;
  image: string;
};

const images = [car1, car2, car3, car4, car5, car6];

const seed: Omit<Car, "image" | "id">[] = [
  { brand: "BMW", model: "X5", variant: "xDrive40i M Sport", year: 2022, km: 28500, fuel: "Petrol", transmission: "Automatic", price: 6850000, location: "Hyderabad" },
  { brand: "Mercedes-Benz", model: "C-Class", variant: "C 300 AMG Line", year: 2021, km: 34200, fuel: "Petrol", transmission: "Automatic", price: 5290000, location: "Bengaluru" },
  { brand: "Audi", model: "A6", variant: "55 TFSI Technology", year: 2020, km: 41000, fuel: "Petrol", transmission: "Automatic", price: 4790000, location: "Mumbai" },
  { brand: "Porsche", model: "718 Cayman", variant: "2.0 PDK", year: 2022, km: 12800, fuel: "Petrol", transmission: "Automatic", price: 9890000, location: "Delhi" },
  { brand: "Range Rover", model: "Sport", variant: "HSE Dynamic", year: 2021, km: 38900, fuel: "Diesel", transmission: "Automatic", price: 8950000, location: "Chennai" },
  { brand: "Mercedes-Benz", model: "E-Class", variant: "E 220d Expedition", year: 2023, km: 18400, fuel: "Diesel", transmission: "Automatic", price: 7250000, location: "Pune" },
  { brand: "BMW", model: "3 Series", variant: "330i M Sport", year: 2022, km: 24600, fuel: "Petrol", transmission: "Automatic", price: 4690000, location: "Hyderabad" },
  { brand: "Audi", model: "Q7", variant: "55 TFSI Premium Plus", year: 2020, km: 47200, fuel: "Petrol", transmission: "Automatic", price: 5990000, location: "Bengaluru" },
  { brand: "Jaguar", model: "F-Pace", variant: "R-Dynamic SE", year: 2021, km: 31000, fuel: "Diesel", transmission: "Automatic", price: 5790000, location: "Mumbai" },
  { brand: "Volvo", model: "XC60", variant: "B5 Inscription", year: 2023, km: 14800, fuel: "Hybrid", transmission: "Automatic", price: 6290000, location: "Delhi" },
  { brand: "Lexus", model: "ES 300h", variant: "Luxury", year: 2022, km: 22500, fuel: "Hybrid", transmission: "Automatic", price: 5890000, location: "Chennai" },
  { brand: "Mercedes-Benz", model: "GLE", variant: "450 4MATIC", year: 2023, km: 16700, fuel: "Petrol", transmission: "Automatic", price: 9650000, location: "Pune" },
];

export const cars: Car[] = seed.map((c, i) => ({
  ...c,
  id: `${c.brand}-${c.model}-${i + 1}`.toLowerCase().replace(/\s+/g, "-"),
  image: images[i % images.length],
}));

export const featuredCars = cars.slice(0, 6);

export function formatPrice(p: number) {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
  return `₹${(p / 100000).toFixed(2)} L`;
}

export function formatKm(km: number) {
  return `${km.toLocaleString("en-IN")} km`;
}
