import { api } from "./api";

export const productsService = {
  getAll: async () => {
    // Get all products API call will be implemented here
    const response = await api.get("/products");
    return response.data;
  },

  getById: async (id: string) => {
    // Get product by ID API call will be implemented here
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    // Create product API call will be implemented here
    const response = await api.post("/products", data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    // Update product API call will be implemented here
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    // Delete product API call will be implemented here
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};
