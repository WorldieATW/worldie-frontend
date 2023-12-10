// components/ReviewCard.tsx
import React, { useState, FormEvent } from 'react'
import { StarRating } from '../StarRating'

export const ReviewCard: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    // API call logic goes here
    // ...
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-4 max-w-sm w-full"
    >
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src="/path-to-your-avatar.jpg"
          alt="Reviewer's Avatar"
        />
        <h3 className="font-bold text-lg">Review for Nama Tempat</h3>
      </div>
      <input
        type="text"
        className="form-input w-full border-2 rounded-md mb-4 p-2"
        placeholder="Post your title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StarRating rating={rating} setRating={setRating} />
      <textarea
        className="form-textarea w-full border-2 rounded-md mb-4 p-2"
        rows={3}
        placeholder="Post your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Post
      </button>
    </form>
  )
}
