import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { cartService } from '../../../utils/services';
import useCartStore from '../../../store/cartStore';

const RankisterPromo = ({ isLoading, rankisterPromo, onViewProduct, onAddAllToCart }) => {
  const { updateCartCount } = useCartStore();

  // Handle add all items to cart
  const handleAddAllToCart = async () => {
    try {
      // Add all items to cart
      for (const promo of rankisterPromo) {
        for (const website of promo.websites) {
          await cartService.createCart(promo.userId, website.id);
          updateCartCount(promo.userId);
        }
      }
      
      // Show success notification
      toast.success("All items added to cart! 🛒");
    } catch (error) {
      // Show error notification
      toast.error(error?.message || "Failed to add items to cart. 🚨");
    }
  };

  const totalOriginalPrice = rankisterPromo.reduce((acc, promo) =>
    acc + promo.websites.reduce((sum, site) => sum + site.originalPrice, 0), 0);
  
  const totalDiscountedPrice = rankisterPromo.reduce((acc, promo) =>
    acc + promo.websites.reduce((sum, site) => sum + site.discountedPrice, 0), 0);
  
  const overallDiscount = 
    ((totalOriginalPrice - totalDiscountedPrice) / totalOriginalPrice) * 100;

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Rankister Promo</h2>
        <div className="animate-pulse">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Rankister Promo</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
            DISCOUNT
          </span>
          <button
            onClick={handleAddAllToCart}
            className="flex items-center justify-center w-12 h-12 bg-foundations-primary text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <FaShoppingCart className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          {rankisterPromo.map((promo, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  {promo.websites.map((website, idx) => (
                    <div key={idx} className="flex justify-between items-center mb-2">
                      <span
                        className="text-black cursor-pointer hover:underline text-lg"
                        onClick={() => onViewProduct(website.id, promo.userId)}
                      >
                        {website.webDomain}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total Original Price</span>
            <span className="text-gray-500 text-xl">€ {totalOriginalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total Discounted Price</span>
            <span className="text-orange-500 text-xl">€ {totalDiscountedPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-semibold">Total Discount</span>
            <span className="text-green-500 text-xl">(-{overallDiscount.toFixed(2)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankisterPromo;