export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  subtotal: number;
  tax: number;
  paymentMethod: "cash" | "card" | "transfer";
  cashierId: string;
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CreateSaleRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: "cash" | "card" | "transfer";
}

export interface SaleMetrics {
  totalSales: number;
  totalRevenue: number;
  averageTicket: number;
  topProducts: {
    productId: string;
    productName: string;
    totalSold: number;
  }[];
}
