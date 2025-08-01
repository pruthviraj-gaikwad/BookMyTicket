import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-500 border-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-sm tracking-wide">
          Loading...
        </div>
      </div>
      <p className="mt-6 text-gray-400 text-sm">Please wait while we load your experience</p>
    </div>
  )
}

export default Loading