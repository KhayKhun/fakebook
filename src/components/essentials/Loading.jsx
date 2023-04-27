import React from 'react'

function Loading() {
  return (
    <div className='w-full h-full fixed flex justify-center items-center'>
      <div className='border-[6px] border-t-blue-400 border-r-blue-300 border-b-blue-200 border-l-transparent rounded-full loading w-[80px] h-[80px]'>
      </div>
    </div>
  )
}

export default Loading