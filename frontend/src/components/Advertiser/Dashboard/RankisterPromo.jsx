// import React from 'react';

// const RankisterPromo = ({ isLoading, rankisterPromo }) => {
//     return (
//       <div className="bg-gray-100 p-4 rounded-lg shadow-sm mt-6">
//         <h3 className="text-2xl font-bold mb-6">Rankister Promo</h3>
//         {isLoading ? (
//           <div className="text-center py-4">Loading...</div>
//         ) : (
//           <div className="space-y-4">
//             {rankisterPromo.map((promo, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm border border-gray-200"
//               >
//                 <div>
//                   <p className="text-lg font-semibold text-gray-600">
//                     {promo.webDomain}
//                   </p>
//                   <span className="text-sm text-red-500 font-semibold">
//                     DISCOUNT AVAILABLE
//                   </span>
//                 </div>
//                 {promo.price && (
//                   <div className="text-right">
//                     <p className="line-through text-gray-500">{promo.price}</p>
//                     <p className="text-orange-500 font-bold">{promo.discountPrice}</p>
//                     <p className="text-gray-500 text-sm">(-{promo.discount})</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

// export default RankisterPromo;
import React from 'react';

const RankisterPromo = ({ isLoading, rankisterPromo }) => {
  // Calculate totals for original price and discounted price
  const totalOriginalPrice = rankisterPromo.reduce((acc, promo) => acc + parseFloat(promo.price.replace('€', '').replace(',', '.')), 0);
  const totalDiscountedPrice = rankisterPromo.reduce((acc, promo) => acc + parseFloat(promo.discountPrice.replace('€', '').replace(',', '.')), 0);

  // Calculate the overall discount percentage
  const overallDiscount = totalOriginalPrice > 0 ? ((totalOriginalPrice - totalDiscountedPrice) / totalOriginalPrice) * 100 : 0;

  return (
    <div className="p-6 ">
      {/* Heading outside the box */}
      <h2 className="text-2xl font-bold mb-4">Rankister Promo</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
            DISCOUNT
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl">Generalisti</h3>
              {rankisterPromo.map((promo, index) => (
                <div key={index} className="space-y-2">
                  <a 
                    href={promo.webDomain}
                    className="block text-blue-600 underline"
                  >
                    {promo.webDomain}
                  </a>
                </div>
              ))}
            </div>

            {/* Unified Calculation */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Original Price</span>
                <span className="text-gray-500">€ {totalOriginalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Discounted Price</span>
                <span className="text-orange-500">€ {totalDiscountedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-semibold">Total Discount</span>
                <span className="text-green-500">(-{overallDiscount.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankisterPromo;
