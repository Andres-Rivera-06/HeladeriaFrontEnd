import { api } from "./api";

export const metricsService = {
  getDailySales: async () => {
    // Get daily sales metrics API call will be implemented here
    const response = await api.get("/metrics/daily-sales");
    return response.data;
  },

  getMonthlySales: async () => {
    // Get monthly sales metrics API call will be implemented here
    const response = await api.get("/metrics/monthly-sales");
    return response.data;
  },

  getTopProducts: async () => {
    // Get top products API call will be implemented here
    const response = await api.get("/metrics/top-products");
    return response.data;
  },

  getRevenue: async (startDate: string, endDate: string) => {
    // Get revenue API call will be implemented here
    const response = await api.get("/metrics/revenue", {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
