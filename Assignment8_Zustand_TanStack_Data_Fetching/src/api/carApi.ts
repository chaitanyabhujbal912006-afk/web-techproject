import type { Car, CustomError } from "../types";

const demoCars: Car[] = [
  { id: 1, brand: "Tesla", model: "Model 3", year: 2024, price: 42000, active: true },
  { id: 2, brand: "BMW", model: "i4", year: 2023, price: 56800, active: true },
  { id: 3, brand: "Toyota", model: "Camry", year: 2022, price: 28500, active: true },
  { id: 4, brand: "Hyundai", model: "Ioniq 5", year: 2024, price: 41500, active: true },
  { id: 5, brand: "Honda", model: "Civic", year: 2021, price: 23800, active: false }
];

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export const CarApi = {
  getActiveCars: async (): Promise<Car[]> => {
    await wait(700);
    return demoCars.filter((car) => car.active);
  },
  getCarsWithSpecificBrand: async (brandId: string, active = true): Promise<Car[]> => {
    await wait(500);
    if (brandId.toLowerCase() === "error") {
      const error = new Error("The demo API was asked to simulate a failed request.") as CustomError;
      error.status = 500;
      throw error;
    }
    return demoCars.filter((car) => car.brand.toLowerCase() === brandId.toLowerCase() && (!active || car.active));
  }
};