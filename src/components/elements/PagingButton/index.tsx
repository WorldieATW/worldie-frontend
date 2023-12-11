import React from 'react'

interface PagingButtonProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const PagingButton: React.FC<PagingButtonProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Calculate the range of pages to display
  let startPage = Math.max(currentPage - 2, 1)
  let endPage = Math.min(startPage + 4, totalPages)

  if (totalPages - currentPage < 2) {
    endPage = totalPages
    startPage = Math.max(totalPages - 4, 1)
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  )

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={() => onPageChange(1)}
        className="px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white"
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white"
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {pages.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md ${
            currentPage === number
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white"
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white"
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  )
}
