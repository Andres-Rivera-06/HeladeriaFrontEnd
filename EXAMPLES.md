# Ejemplos de Código

Aquí tienes algunos ejemplos para empezar a implementar la funcionalidad.

## 1. Ejemplo: Implementar Login

### src/app/login/page.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/pos");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

## 2. Ejemplo: Completar auth.store

### src/store/auth.store.ts

```tsx
import { create } from "zustand";
import { authService } from "@/services/auth.service";
import type { User } from "@/types/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem("token", response.token);
    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
```

## 3. Ejemplo: Componente ProductCard

### src/components/pos/ProductCard.tsx

```tsx
import { Product } from "@/types/product.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onAddToCart(product)}
    >
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-32 object-cover rounded mb-2"
        />
      )}
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">
          {formatCurrency(product.price)}
        </span>
        <span
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          Stock: {product.stock}
        </span>
      </div>
    </div>
  );
}
```

## 4. Ejemplo: Implementar POS Store

### src/store/pos.store.ts

```tsx
import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface POSState {
  cart: CartItem[];
  total: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const usePOSStore = create<POSState>((set, get) => ({
  cart: [],
  total: 0,

  addToCart: (item) => {
    const cart = get().cart;
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        cart: cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }

    get().calculateTotal();
  },

  removeFromCart: (id) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
    get().calculateTotal();
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }

    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
    get().calculateTotal();
  },

  clearCart: () => {
    set({ cart: [], total: 0 });
  },

  calculateTotal: () => {
    const total = get().cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    set({ total });
  },
}));
```

## 5. Ejemplo: Página POS Completa

### src/app/pos/page.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { productsService } from "@/services/products.service";
import { usePOSStore } from "@/store/pos.store";
import ProductCard from "@/components/pos/ProductCard";
import Cart from "@/components/pos/Cart";
import type { Product } from "@/types/product.types";

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = usePOSStore();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Punto de Venta</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}
```

## 6. Middleware de Autenticación

### middleware.ts (en la raíz del proyecto)

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = ["/pos", "/dashboard", "/products"].some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/pos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/pos", "/dashboard", "/products"],
};
```

---

Estos ejemplos te darán un buen punto de partida para implementar la funcionalidad completa.
