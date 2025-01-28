import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { cartService, websiteService } from '../../utils/services';
import { FaTrashAlt } from 'react-icons/fa';
import useCartStore from '../../store/cartStore';

const Cart = () => {
  const { user } = useAuthStore();
const { updateCartCount } = useCartStore();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const carts = await cartService.getCarts(user._id);

        const enhancedCarts = await Promise.all(
          carts.map(async (item) => {
            try {
              const websiteDetails = await websiteService.getWebsiteById(item.websiteId);
              return {
                ...item,
                websiteDetails,
              };
            } catch (err) {
              console.error(`Failed to fetch website details for item ${item._id}:`, err);
              return {
                ...item,
                websiteDetails: null,
              };
            }
          })
        );

        console.log('Enhanced Carts:', enhancedCarts); // Debug log
        setCartItems(enhancedCarts);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch cart items');
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchCartItems();
    }
  }, [user]);

  const handleDelete = async (cartId) => {
    try {
      await cartService.deleteCart(user._id, cartId);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== cartId));
      updateCartCount(user._id); // Update cart count after deletion
    } catch (err) {
      console.error('Failed to delete item:', err);
      setError(err.message || 'Failed to delete item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.websiteDetails?.price 
        ? typeof item.websiteDetails.price === 'object' 
          ? parseFloat(item.websiteDetails.price.$numberInt) 
          : parseFloat(item.websiteDetails.price)
        : 0;
      return total + price;
    }, 0);
  };

  const getItemPrice = (item) => {
    if (!item.websiteDetails?.price) return 0;
    
    const price = typeof item.websiteDetails.price === 'object'
      ? parseFloat(item.websiteDetails.price.$numberInt)
      : parseFloat(item.websiteDetails.price);
      
    return isNaN(price) ? 0 : price;
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-6">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 md:px-8 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-4 text-foundations-dark">Shopping Cart</h1>
      
      {/* Info Messages */}
      <div className="space-y-2 mb-6">
        <p className="text-emerald-500">
          You will be able to fill all the needed information after checkout in the Orders section.
        </p>
        <p className="text-red-500">
          Orders must be posted within 3 months of the order date.
        </p>
      </div>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-foundations-light border border-foundations-hover rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                {/* Domain Name */}
                <div className="space-y-2 flex-1">
                  <h2 className="font-bold text-xl text-foundations-dark">
                    {item.websiteDetails?.webDomain || 'Unknown Domain'}
                  </h2>
                  <div className="text-sm text-foundations-secondary">
                    {item.websiteDetails?.mediaName || 'Unknown Media'}
                  </div>
                </div>

                {/* Price and Delete Button */}
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-foundations-primary">
                    {getItemPrice(item).toFixed(2)} €
                  </span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-foundations-secondary hover:text-foundations-primary transition-colors p-2"
                    aria-label="Delete item"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Cart Total */}
          <div className="border-t border-foundations-hover pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-foundations-dark">Total:</span>
              <span className="text-2xl font-bold text-foundations-primary">
                {calculateTotal().toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-12">
          Your cart is empty
        </div>
      )}

      {/* Footer Links */}
      <div className="text-sm text-foundations-secondary pt-8">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span className="mx-2">•</span>
        <Link to="/" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Cart;