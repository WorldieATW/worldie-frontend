import React from 'react'

interface StarRatingProps {
  rating: number
  setRating: (rating: number) => void
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
}) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <button
            type="button"
            key={ratingValue}
            className={`hover:text-yellow-500 transition-colors duration-150 ${
              ratingValue <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => setRating(ratingValue)}
            aria-label={`Rate ${ratingValue} out of 5 stars`}
            onMouseEnter={() => setRating(ratingValue)}
            onMouseLeave={() => setRating(rating)}
          >
            <span className="text-lg leading-none hover:text-2xl transition-transform duration-150">
              &#9733;
            </span>
          </button>
        )
      })}
    </div>
  )
}
