// import React, { useState } from "react";
// // import "./Dashboard.css";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
//   const navigate = useNavigate();

//   const cards = [
//     {
//       title: "MODE",
//       value: "Advertiser",
//       bgColor: "bg-foundations-primary",
//       onClick: () => {},
//     },
//     {
//       title: "PENDING ORDERS",
//       value: "0",
//       bgColor: "bg-foundations-primary",
//       onClick: () => navigate("/advertiser/orders"),
//     },
//     {
//       title: "ACCOUNT BALANCE",
//       value: "€ 0,00",
//       bgColor: "bg-foundations-primary",
//       onClick: () => navigate("/balance"),
//     },
//     {
//       title: "CART ITEMS",
//       value: "0",
//       bgColor: "bg-foundations-primary",
//       onClick: () => navigate("/advertiser/cart"),
//     },
//   ];

//   const recentServices = [
//     { type: "web", name: "wiki-tech.it", price: "€ 50,00", icons: ["🌐"] },
//     { type: "web", name: "letteralmente.net", price: "€ 49,99", icons: ["🌐"] },
//     {
//       type: "web",
//       name: "Vesuviolive.it",
//       price: "€ 400,00",
//       icons: ["🌐", "facebook", "instagram", "tiktok"],
//     },
//     { type: "web", name: "Reviewonline.it", price: "€ 24,50", icons: ["🌐"] },
//     { type: "web", name: "Galiciapress.es", price: "€ 450,00", icons: ["🌐"] },
//   ];

//   const rankisterPromo = [
//     { name: "Italia150.it", discount: true },
//     { name: "GiornaleSocial.it" },
//     {
//       name: "legnostorto.com",
//       price: "€ 193,00",
//       discountPrice: "€ 185,28",
//       discount: "4,00%",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {cards.map((card) => (
//           <div
//             key={card.title}
//             className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer`}
//             onClick={card.onClick}
//           >
//             <div className={`${card.bgColor} h-3`} />
//             <div className="p-6">
//               <h3 className="text-sm text-gray-600">{card.title}</h3>
//               <p className="text-2xl font-bold mt-2">{card.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search Section */}
//       <div className="flex gap-4">
//         <input
//           type="text"
//           placeholder="Search by Domain name / Social..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 p-2 border rounded"
//         />
//         <button className="px-6 py-2 bg-foundations-primary text-white rounded">
//           SUBMIT
//         </button>
//         <button className="px-6 py-2 bg-foundations-secondary border rounded">RESET</button>
//       </div>

//       {/* Filters Section */}
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             placeholder="Minimum price"
//             value={priceRange.min}
//             className="p-2 border rounded"
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, min: e.target.value })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Maximum price"
//             value={priceRange.max}
//             className="p-2 border rounded"
//             onChange={(e) =>
//               setPriceRange({ ...priceRange, max: e.target.value })
//             }
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2">DA: 0 - 100</label>
//             <input type="range" min="0" max="100" className="w-full" />
//           </div>
//           <div>
//             <label className="block mb-2">Ascore: 0 - 100</label>
//             <input type="range" min="0" max="100" className="w-full" />
//           </div>
//         </div>

//         <div className="grid grid-cols-4 gap-4">
//           <select className="p-2 border rounded">
//             <option value="">Media type</option>
//             <option value="Blog">Blog</option>
//             <option value="Social Pages">Social Pages</option>
//             <option value="Newspaper">Newspaper</option>
//             {/* Add media type options */}
//           </select>
//           <select className="p-2 border rounded">
//             <option value="">Category</option>
//             <option value="Technology">Technology</option>
//             <option value="Health">Health</option>
//             <option value="Education">Education</option>
//             <option value="Science">Science</option>
//             <option value="Business">Business</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Sports">Sports</option>
//             <option value="Travel">Travel</option>
//             <option value="Fashion">Fashion</option>
//             <option value="Food">Food</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Finance">Finance</option>
//             <option value="Art">Art</option>
//             <option value="Music">Music</option>
//             <option value="Politics">Politics</option>
//             <option value="Environment">Environment</option>
//             <option value="Automotive">Automotive</option>
//             <option value="Gaming">Gaming</option>
//             <option value="Real Estate">Real Estate</option>
//             <option value="Law">Law</option>
//             <option value="Religion">Religion</option>
//             <option value="Philosophy">Philosophy</option>
//             <option value="History">History</option>
//             <option value="Literature">Literature</option>
//             <option value="Technology & Gadgets">Technology & Gadgets</option>
//             <option value="Social Media">Social Media</option>
//             <option value="Parenting">Parenting</option>
//             <option value="Pets">Pets</option>
//             <option value="Health & Fitness">Health & Fitness</option>
//             <option value="Psychology">Psychology</option>
//             <option value="Self-Help">Self-Help</option>
//             <option value="Personal Development">Personal Development</option>
//             <option value="Photography">Photography</option>
//             <option value="Architecture">Architecture</option>
//             <option value="Interior Design">Interior Design</option>
//             <option value="Crafts & DIY">Crafts & DIY</option>
//             <option value="E-commerce">E-commerce</option>
//             <option value="Mobile Apps">Mobile Apps</option>
//             <option value="Web Development">Web Development</option>
//             <option value="Software Development">Software Development</option>
//             <option value="Artificial Intelligence">
//               Artificial Intelligence
//             </option>
//             <option value="Virtual Reality">Virtual Reality</option>
//             <option value="Augmented Reality">Augmented Reality</option>
//             <option value="Data Science">Data Science</option>
//             <option value="Cryptocurrency">Cryptocurrency</option>
//             <option value="Blockchain">Blockchain</option>
//             <option value="Startups">Startups</option>
//             <option value="Marketing">Marketing</option>
//             <option value="Sales">Sales</option>
//             <option value="Investment">Investment</option>
//             <option value="Nonprofit">Nonprofit</option>
//             <option value="Education & Learning">Education & Learning</option>
//             <option value="Career">Career</option>
//             {/* Add category options */}
//           </select>
//           <select className="p-2 border rounded">
//             <option value="">Country</option>
//             <option value="">Country</option>
//             <option value="United States">United States</option>
//             <option value="Canada">Canada</option>
//             <option value="United Kingdom">United Kingdom</option>
//             <option value="France">France</option>
//             <option value="Germany">Germany</option>
//             <option value="Italy">Italy</option>
//             <option value="Spain">Spain</option>
//             <option value="Australia">Australia</option>
//             <option value="New Zealand">New Zealand</option>
//             <option value="Japan">Japan</option>
//             <option value="China">China</option>
//             <option value="South Korea">South Korea</option>
//             <option value="India">India</option>
//             <option value="Brazil">Brazil</option>
//             <option value="Mexico">Mexico</option>
//             <option value="Russia">Russia</option>
//             <option value="South Africa">South Africa</option>
//             <option value="Argentina">Argentina</option>
//             <option value="Turkey">Turkey</option>
//             <option value="Saudi Arabia">Saudi Arabia</option>
//             <option value="United Arab Emirates">United Arab Emirates</option>
//             <option value="Singapore">Singapore</option>
//             <option value="Thailand">Thailand</option>
//             <option value="Malaysia">Malaysia</option>
//             <option value="Switzerland">Switzerland</option>
//             <option value="Netherlands">Netherlands</option>
//             <option value="Sweden">Sweden</option>
//             <option value="Norway">Norway</option>
//             <option value="Denmark">Denmark</option>
//             <option value="Ireland">Ireland</option>
//             <option value="Portugal">Portugal</option>
//             <option value="Poland">Poland</option>
//             <option value="Austria">Austria</option>
//             <option value="Belgium">Belgium</option>
//             <option value="Czech Republic">Czech Republic</option>
//             <option value="Greece">Greece</option>
//             <option value="Israel">Israel</option>
//             <option value="Egypt">Egypt</option>
//             <option value="Morocco">Morocco</option>
//             <option value="Vietnam">Vietnam</option>
//             <option value="Philippines">Philippines</option>
//             <option value="Indonesia">Indonesia</option>
//             <option value="Pakistan">Pakistan</option>
//             <option value="Bangladesh">Bangladesh</option>
//             <option value="Chile">Chile</option>
//             <option value="Colombia">Colombia</option>
//             <option value="Peru">Peru</option>
//             <option value="Venezuela">Venezuela</option>
//             <option value="Qatar">Qatar</option>
//             <option value="Kuwait">Kuwait</option>
//             <option value="Iceland">Iceland</option>
//             <option value="Finland">Finland</option>
//             <option value="Luxembourg">Luxembourg</option>
//             <option value="Hong Kong">Hong Kong</option>
//             <option value="Taiwan">Taiwan</option>

//             {/* Add country options */}
//           </select>
//           <select className="p-2 border rounded">
//             <option value="">Google News</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-4">
//           <span>ACCEPTS:</span>
//           {["Gambling", "CBD", "Adult", "Trading"].map((item) => (
//             <label key={item} className="flex items-center gap-2">
//               <input type="checkbox" />
//               {item}
//             </label>
//           ))}
//         </div>

//         <button className="px-6 py-2 bg-foundations-primary text-white rounded float-right">
//           Search
//         </button>
//       </div>

//       {/* Services Section */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h3 className="text-xl font-bold mb-4">Recently added services</h3>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left">TYPE</th>
//                 <th className="text-left">NAME</th>
//                 <th className="text-right">PRICE</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentServices.map((service, index) => (
//                 <tr key={index} className="border-t">
//                   <td className="py-2">
//                     {service.icons.map((icon, i) => (
//                       <span key={i}>{icon} </span>
//                     ))}
//                   </td>
//                   <td className="py-2">{service.name}</td>
//                   <td className="py-2 text-right">{service.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h3 className="text-xl font-bold mb-4">Rankister Promo</h3>
//           <div className="space-y-2">
//             {rankisterPromo.map((promo, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <span>{promo.name}</span>
//                 {promo.discount && (
//                   <span className="text-red-500">DISCOUNT</span>
//                 )}
//                 {promo.price && (
//                   <div className="text-right">
//                     <span className="line-through text-gray-500">
//                       {promo.price}
//                     </span>
//                     <span className="text-orange-500 ml-2">
//                       {promo.discountPrice}
//                     </span>
//                     <span className="text-gray-500 ml-2">
//                       (-{promo.discount})
//                     </span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const navigate = useNavigate();

  const cards = [
    {
      title: "MODE",
      value: "Advertiser",
      bgColor: "bg-foundations-primary",
      onClick: () => {},
    },
    {
      title: "PENDING ORDERS",
      value: "0",
      bgColor: "bg-foundations-primary",
      onClick: () => navigate("/advertiser/orders"),
    },
    {
      title: "ACCOUNT BALANCE",
      value: "€ 0,00",
      bgColor: "bg-foundations-primary",
      onClick: () => navigate("/balance"),
    },
    {
      title: "CART ITEMS",
      value: "0",
      bgColor: "bg-foundations-primary",
      onClick: () => navigate("/advertiser/cart"),
    },
  ];

  const recentServices = [
    { type: "Web", name: "wiki-tech.it", price: "€ 50,00", icons: ["🌐"] },
    { type: "Web", name: "letteralmente.net", price: "€ 49,99", icons: ["🌐"] },
    {
      type: "Web",
      name: "Vesuviolive.it",
      price: "€ 400,00",
      icons: ["🌐", "📘", "📷", "🎵"],
    },
    { type: "Web", name: "Reviewonline.it", price: "€ 24,50", icons: ["🌐"] },
    { type: "Web", name: "Galiciapress.es", price: "€ 450,00", icons: ["🌐"] },
  ];

  const rankisterPromo = [
    { name: "Italia150.it", discount: true },
    { name: "GiornaleSocial.it", discount: false },
    {
      name: "legnostorto.com",
      price: "€ 193,00",
      discountPrice: "€ 185,28",
      discount: "4,00%",
    },
  ];

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
            onClick={card.onClick}
          >
            <div className={`${card.bgColor} h-3`} />
            <div className="p-6">
              <h3 className="text-sm text-gray-600">{card.title}</h3>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Domain name / Social..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button className="px-6 py-2 bg-foundations-primary text-white rounded">
          SUBMIT
        </button>
        <button className="px-6 py-2 bg-foundations-secondary border rounded">
          RESET
        </button>
      </div>

      {/* Filters Section */}
      <div className="space-y-4">
        {/* Price Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Minimum price"
            value={priceRange.min}
            className="p-2 border rounded w-full"
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Maximum price"
            value={priceRange.max}
            className="p-2 border rounded w-full"
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
          />
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">DA: 0 - 100</label>
            <input type="range" min="0" max="100" className="w-full" />
          </div>
          <div>
            <label className="block mb-2">Ascore: 0 - 100</label>
            <input type="range" min="0" max="100" className="w-full" />
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select className="p-2 border rounded w-full">
            <option value="">Media type</option>
            <option value="Blog">Blog</option>
            <option value="Social Pages">Social Pages</option>
            <option value="Newspaper">Newspaper</option>
          </select>
          <select className="p-2 border rounded w-full">
            <option value="">Category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          <select className="p-2 border rounded w-full">
            <option value="">Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
          </select>
          <select className="p-2 border rounded w-full">
            <option value="">Google News</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Checkbox Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <span>ACCEPTS:</span>
          {["Gambling", "CBD", "Adult", "Trading"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="checkbox" />
              {item}
            </label>
          ))}
        </div>

        <button className="px-6 py-2 bg-foundations-primary text-white rounded float-right">
          Search
        </button>
      </div>

      {/* Recently Added Services Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Recently Added Services</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border border-gray-300">Type</th>
                <th className="text-left p-3 border border-gray-300">Website Name</th>
                <th className="text-right p-3 border border-gray-300">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentServices.map((service, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="p-3 border border-gray-300 text-gray-700">
                    {service.icons.map((icon, i) => (
                      <span key={i}>{icon} </span>
                    ))}
                    {service.type}
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-700">
                    {service.name}
                  </td>
                  <td className="p-3 border border-gray-300 text-right font-semibold text-gray-800">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rankister Promo Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4">Rankister Promo</h3>
        <div className="space-y-4">
          {rankisterPromo.map((promo, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm border border-gray-200"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {promo.name}
                </p>
                {promo.discount && (
                  <span className="text-sm text-red-500 font-semibold">
                    DISCOUNT AVAILABLE
                  </span>
                )}
              </div>
              {promo.price && (
                <div className="text-right">
                  <p className="line-through text-gray-500">{promo.price}</p>
                  <p className="text-orange-500 font-bold">{promo.discountPrice}</p>
                  <p className="text-gray-500 text-sm">(-{promo.discount})</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
