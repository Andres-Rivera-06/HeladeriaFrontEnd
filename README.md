# Heladería POS - Sistema de Punto de Venta

Sistema de punto de venta para heladería construido con Next.js 15, TypeScript, Tailwind CSS, Zustand y Axios.

## 🚀 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # Página de inicio de sesión
│   ├── pos/               # Punto de venta
│   ├── dashboard/         # Dashboard con métricas
│   └── products/          # Gestión de productos
│
├── components/
│   ├── layout/            # Navbar, Sidebar
│   ├── pos/               # ProductCard, Cart, CartItem
│   ├── charts/            # Gráficos de ventas
│   └── ui/                # Componentes UI de shadcn
│
├── store/                 # Estado global con Zustand
├── services/              # Servicios API
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
├── utils/                 # Utilidades
└── styles/
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## 🔧 Variables de Entorno

Configura las siguientes variables en `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🏃‍♂️ Ejecutar el Proyecto

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

## 📚 Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos
- **Zustand** - Estado global
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos

## 🎨 Componentes UI

Para instalar componentes de shadcn/ui:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

## 📱 Páginas

- `/` - Página principal
- `/login` - Inicio de sesión
- `/pos` - Punto de venta
- `/dashboard` - Dashboard con métricas
- `/products` - Gestión de productos
