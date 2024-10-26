import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ name, price, image, category }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="text-xs text-green-600 font-semibold uppercase">{category}</span>
        <h3 className="text-lg font-semibold mt-1">{name}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">₹{price}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}