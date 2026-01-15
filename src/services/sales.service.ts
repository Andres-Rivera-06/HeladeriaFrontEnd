import { api } from "./api";

export const salesService = {
  getAll: async () => {
    // Get all sales API call will be implemented here
    const response = await api.get("/sales");
    return response.data;
  },

  getById: async (id: string) => {
    // Get sale by ID API call will be implemented here
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    // Create sale API call will be implemented here
    const response = await api.post("/sales", data);
    return response.data;
  },

  getByDateRange: async (startDate: string, endDate: string) => {
    // Get sales by date range API call will be implemented here
    const response = await api.get("/sales/range", {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
