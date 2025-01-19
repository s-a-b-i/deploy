import React from 'react'
import { Link } from 'react-router-dom'
import { BiSpreadsheet } from 'react-icons/bi'
import { HiMenuAlt3 } from 'react-icons/hi'

const Favorite = () => {
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Favorites</h1>
        <div className="flex gap-2">
          <button className="p-2 bg-orange-500 rounded-md text-white">
            <BiSpreadsheet size={20} />
          </button>
          <button className="p-2 text-gray-600">
            <HiMenuAlt3 size={20} />
          </button>
        </div>
      </div>

      {/* No Products Message */}
      <div className="text-black mb-8">
        No products to show
      </div>

      {/* Pagination Info */}
      <div className="h-32 flex justify-between  border text-gray-500 text-sm mb-8">
        <span className='m-5'>Showing 1 to 20 of many</span>
        <span>1</span>
      </div>

      {/* Center Icon
      <div className="flex justify-center items-center my-20">
        <div className="bg-orange-500 rounded-full p-4">
          <BiSpreadsheet size={32} className="text-white" />
        </div>
      </div> */}

      {/* Footer Links */}
      <div className="text-sm text-orange-500">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span className="mx-2">•</span>
        <Link to="/" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  )
}

export default Favorite