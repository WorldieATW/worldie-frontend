import React, { useState } from 'react'

interface StarRatingProps {
  rating: number
  setRating: (rating: number) => void
}
export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
}) => {
  const [hover, setHover] = useState<number>(0)

  return (
    <div className="flex justify-center gap-2">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <button
            type="button"
            key={ratingValue}
            className={`hover:text-yellow-500 transition-colors duration-150 ${
              ratingValue <= (hover || rating)
                ? 'text-yellow-500'
                : 'text-gray-300'
            }`}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${ratingValue} out of 5 stars`}
          >
            <span className="text-4xl leading-none transition-transform duration-150">
              &#9733;
            </span>
          </button>
        )
      })}
    </div>
  )
}
