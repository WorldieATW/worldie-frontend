import { useEffect, useState } from 'react'
import { useAuthContext } from '@contexts'
import { GetReviewResponse } from './interface'
// import { Review } from '@models'
import { Button, Spinner } from '@chakra-ui/react'
import { useModal } from 'src/components/hooks/useModal'
import { ReviewCard, BackButton } from '@elements'
import { useRouter } from 'next/router'

export const ReviewModule = () => {
  const { httpFetch } = useAuthContext()
  const router = useRouter()
  // const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isOpen, openModal, closeModal } = useModal()
  const { nama } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedRating, setSelectedRating] = useState('')

  const fetchReviews = async (
    id: string,
    page: string,
    size: string,
    rating?: string
  ) => {
    setIsLoading(true) // Start loading

    const filters = {
      page,
      size,
      rating,
    }

    const filtersKeys = Object.keys(filters) as (keyof typeof filters)[]

    const filtersUrl = filtersKeys
      .map((key) => (filters[key] ? `${key}=${filters[key]}` : ''))
      .filter(Boolean)
      .join('&')

    try {
      const { response, error } = await httpFetch<GetReviewResponse>({
        method: 'get',
        url: `review/${id}?${filtersUrl}`,
      })

      if (error) {
        console.error('Error fetching data:', error)
        // Handle error scenario (e.g., show an error message)
      } else {
        if ((response?.totalCount || 0) < 10) {
          setTotalPages(1)
        } else {
          setTotalPages(Math.ceil((response?.totalCount || 0) / 10))
        }
        // setReviews(response?.reviews || [])
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err)
      // Handle the unexpected error (e.g., show an error message)
    } finally {
      setIsLoading(false) // End loading regardless of success or error
    }
  }

  useEffect(() => {
    // Destructure parameters from router.query and provide types
    const { id, page, size, rating } = router.query as {
      id: string
      page?: string
      size?: string
      rating?: string
    }

    if (id) {
      fetchReviews(
        id,
        page ?? '1', // Provide default values or handle undefined cases
        size ?? '10',
        rating
      )
    }
  }, [router.query])

  useEffect(() => {
    const page = currentPage
    const { id, size } = router.query as {
      id: string
      size?: string
      rating?: string
    }
    fetchReviews(
      id,
      page.toString(), // Provide default values or handle undefined cases
      size ?? '10',
      selectedRating?.toString()
    )
  }, [currentPage])

  useEffect(() => {
    const { id, page, size } = router.query as {
      id: string
      page?: string
      size?: string
    }
    setCurrentPage(1)
    fetchReviews(id, page ?? '1', size ?? '10', selectedRating?.toString())
  }, [selectedRating])

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const getStars = (rating: number) => {
    return '⭐'.repeat(rating)
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <>
          <div className={isOpen ? 'filter blur-sm' : ''}>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-2 ">
                <div className="px-5 pb-4">
                  <BackButton text={nama + ' Review'} />
                </div>
                <hr className="mb-8" />
                <div className="flex flex-col gap-3 items-center justify-center">
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    className="h-10 w-30"
                    onClick={openModal}
                  >
                    Write your review
                  </Button>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="dropdown-rating text-center shadow-lg border-2 rounded-lg py-0.5"
                  >
                    <option value="">All Ratings</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {getStars(rating)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="pagination-controls gap-3 flex flex-row items-center justify-center">
                {currentPage !== 1 ? (
                  <button
                    onClick={goToPreviousPage}
                    className="px-3 py-1 rounded-md shadow-md bg-blue-500 text-white font-bold hover:bg-blue-600 hover:text-white"
                  >
                    {'<'}
                  </button>
                ) : null}
                <button
                  className="px-3 py-1 rounded-md shadow-md border-2"
                  disabled
                >
                  <span>{currentPage}</span>
                </button>
                {currentPage !== totalPages ? (
                  <button
                    onClick={goToNextPage}
                    className="px-3 py-1 rounded-md shadow-md bg-blue-500 text-white font-bold hover:bg-blue-600 hover:text-white"
                  >
                    {'>'}
                  </button>
                ) : null}
              </div>

              <div className="flex flex-col"></div>
            </div>
          </div>
          <div
            className={`fixed inset-0 z-50 ${
              isOpen ? 'flex' : 'hidden'
            } items-center justify-center overflow-y-auto`}
          >
            {/* Modal backdrop with fade effect */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
              aria-hidden="true"
            ></div>

            {/* ReviewCard as the main modal content with no extra shadow */}
            <div className="relative">
              <ReviewCard onClose={closeModal} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
