import { get, post, put } from "./apiClient";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image_url: string[];
}

export interface IProductProps {
  data: Product[];
  total: number;
}


// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  return await get<Product[]>("/products/list");
};

// Add a new product
export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  return await post<Product>("/products", product);
};

// Update an existing product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  return await put<Product>(`/products/${id}`, product);
};
