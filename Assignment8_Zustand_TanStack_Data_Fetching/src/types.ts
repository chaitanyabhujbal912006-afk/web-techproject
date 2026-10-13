export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  active: boolean;
}
export interface CustomError extends Error {
  status?: number;
}