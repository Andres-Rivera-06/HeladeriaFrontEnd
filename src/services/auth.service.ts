import { api } from "./api";

export const authService = {
  login: async (email: string, password: string) => {
    // Login API call will be implemented here
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (data: any) => {
    // Register API call will be implemented here
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  logout: async () => {
    // Logout API call will be implemented here
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async () => {
    // Get current user API call will be implemented here
    const response = await api.get("/auth/me");
    return response.data;
  },
};
