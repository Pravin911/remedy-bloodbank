import React from 'react'

function Spinner() {
  return (
    <div
        className='fixed inset-0 bg-black opacity-70 z-50 flex items-center justify-center'
    >
      <div className='border-4 h-8 w-8 border-blue-500 border-solid rounded-full animate-spin border-t-transparent'>

      </div>
    </div>
  )
}

export default Spinner
