import { Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  count?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  className?: string;
  readonly?: boolean;
}

export default function StarRating({
  count = 5,
  initialRating = 0,
  onRatingChange,
  size = 25,
  className,
  readonly = false,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (index: number) => {
    if (readonly) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (readonly) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(count)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "cursor-pointer transition-colors",
              readonly ? "cursor-default" : "hover:text-red-700",
              (hoverRating || rating) >= starValue ? "text-red-700 fill-red-700" : "text-stone-300"
            )}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}