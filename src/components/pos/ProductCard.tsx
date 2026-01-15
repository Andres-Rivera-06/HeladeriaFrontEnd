interface ProductCardProps {
  // Product props will be defined here
}

export default function ProductCard({}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      {/* Product card content will go here */}
    </div>
  );
}
