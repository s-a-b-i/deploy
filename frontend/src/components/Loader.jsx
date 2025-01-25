import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-foundations-dark/50">
      <div className="animate-spin w-16 h-16 border-4 border-t-4 border-foundations-primary border-t-foundations-secondary rounded-full"></div>
    </div>
  )
}

export default Loader