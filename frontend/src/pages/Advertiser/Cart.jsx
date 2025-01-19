import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      
      {/* Info Messages */}
      <div className="space-y-2 mb-6">
        <p className="text-emerald-500">
          You will able to fill all the needed infos after the checkout, from the Orders section.
        </p>
        <p className="text-red-500">
          Orders must be posted within 3 months of the order date.
        </p>
      </div>

      {/* Empty Cart Message */}
      <div className="text-gray-600 mb-8">
        Cart is empty
      </div>

      {/* Footer Links */}
      <div className="text-sm text-orange-400">
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

export default Cart