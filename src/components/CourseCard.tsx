import { BookOpen, Clock, Star } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  level: string;
}

export default function CourseCard({ title, description, image, duration, rating, level }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}