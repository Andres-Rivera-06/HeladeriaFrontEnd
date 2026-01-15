export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "cashier";
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: "admin" | "cashier";
}
