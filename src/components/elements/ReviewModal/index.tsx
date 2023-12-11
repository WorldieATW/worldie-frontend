import React, { useState, FormEvent } from 'react'
import { StarRating } from '../StarRating'
import { useAuthContext } from '@contexts'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import toast from 'react-hot-toast'

interface ReviewCardProps {
  onClose: () => void
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ onClose }) => {
  const { httpFetch } = useAuthContext()
  const router = useRouter()
  const { id } = router.query
  const [title, setTitle] = useState<string>('')
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const resetForm = () => {
    setTitle('')
    setReview('')
    setRating(0)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (rating < 1) {
      toast.error('Rating must be at least 1')
      setIsLoading(false)
      return
    }
    if (review === '' || title === '') {
      toast.error('Title and review cannot be empty')
      setIsLoading(false)
      return
    }

    const requestBody = {
      id: id,
      rating,
      judul: title,
      konten: review,
    }

    try {
      // Make the HTTP request using httpFetch
      const { response, error } = await httpFetch({
        method: 'post',
        url: 'review',
        body: requestBody,
      })

      if (response) {
        toast.success(response.responseMessage)
      } else {
        const statusCode = error?.data.statusCode
        const msg = String(error?.message)
        if (statusCode === 400) {
          toast.error(msg)
        } else if (statusCode === 403) {
          toast.error('You already made a review for this place')
        } else {
          toast.error('Sorry, an error has occurred')
        }
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err)
    } finally {
      setIsLoading(false)
      resetForm()
      onClose()
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-4 max-w-sm w-full"
    >
      <div className="flex items-center mb-9">
        <span
          onClick={() => {
            resetForm()
            onClose()
          }}
          className="absolute top-2 left-4 cursor-pointer text-3xl font-normal hover:font-semibold rounded-full"
        >
          &times;
          {/* This is the unicode character for a multiplication sign (X) */}
        </span>
        <h3 className="font-bold text-lg absolute top-2.5 left-12 p-1">
          Write your Review
        </h3>
      </div>

      <div>
        <StarRating rating={rating} setRating={setRating} />
        <input
          type="text"
          className="form-input w-full border-2 rounded-md my-6 p-2"
          placeholder="Post your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-textarea w-full border-2 rounded-md mb-6 p-2"
          rows={3}
          placeholder="Post your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <Button
            isLoading={isLoading} // Use isLoading to show loading state
            colorScheme="blue"
            variant="solid"
            type="submit" // Use type="submit" for form submission
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  )
}
