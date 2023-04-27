import React from 'react'

function ErrorPage() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-[10px]'>
      <p className='text-red-500 font-semibold text-2xl'>Error Page</p>
      <p className='font-semibold text-3xl'>Cookie expired or invalid route</p>
      <a href="/facebook/" className='underline text-blue-700 text-2xl'>Try login again?</a>
    </div>
  )
}

export default ErrorPage
