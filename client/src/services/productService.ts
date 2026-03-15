import type { Product } from "../types";
import { apiRequest } from "../utils/api";

//function 1: Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  return await apiRequest('/products') as unknown as Product[];
};