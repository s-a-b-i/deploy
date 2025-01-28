// import React, { useState, useEffect, useCallback } from "react";
// import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";
// import { websiteService, searchService } from "../../utils/services";
// import SearchAndFilter from "../../components/Advertiser/Dashboard/SearchAndFilter";
// import { debounce } from 'lodash';

// const Catalog = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const [websites, setWebsites] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [favorites, setFavorites] = useState(new Set());
//   const [showColumnModal, setShowColumnModal] = useState(false);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
//   const [da, setDa] = useState(0);
//   const [ascore, setAscore] = useState(0);
//   const [mediaType, setMediaType] = useState('');
//   const [category, setCategory] = useState('');
//   const [country, setCountry] = useState('');
//   const [googleNews, setGoogleNews] = useState('');
//   const [sensitiveTopics, setSensitiveTopics] = useState([]);

//   const [visibleColumns, setVisibleColumns] = useState({
//     country: true,
//     name: true,
//     price: true,
//     type: true,
//     category: true,
//     da: true,
//     ascore: true,
//     za: true,
//     gambling: true,
//     adult: true,
//     cbd: true,
//     trading: true,
//     gnews: true,
//     bl: true,
//     edu: true,
//     gov: true,
//     date: true,
//   });

//   const handleSearch = useCallback(
//     debounce(async () => {
//       try {
//         const searchParams = {};

//         if (searchQuery) {
//           searchParams.searchQuery = searchQuery.toLowerCase();
//         }

//         if (priceRange.min > 0 || priceRange.max < 50000) {
//           searchParams.minPrice = priceRange.min;
//           searchParams.maxPrice = priceRange.max;
//         }
//         if (da > 0) searchParams.da = da;
//         if (ascore > 0) searchParams.ascore = ascore;
//         if (mediaType) searchParams.mediaType = mediaType;
//         if (category) searchParams.category = category;
//         if (country) searchParams.country = country;
//         if (googleNews) searchParams.googleNews = googleNews === "Yes";

//         if (sensitiveTopics.length > 0) {
//           sensitiveTopics.forEach((topic) => {
//             searchParams[topic.toLowerCase()] = true;
//           });
//         }

//         const data = await searchService.searchWebsites(searchParams);

//         const normalizedSearchQuery = searchQuery
//           .replace(/^https?:\/\//, "")
//           .replace(/\/$/, "")
//           .toLowerCase();

//         const filteredData = data.filter((website) => {
//           const domain = website.webDomain?.toLowerCase();
//           return (
//             domain.includes(normalizedSearchQuery) ||
//             website.category?.some((cat) =>
//               cat.toLowerCase().includes(normalizedSearchQuery)
//             ) ||
//             website.mediaType?.toLowerCase().includes(normalizedSearchQuery) ||
//             website.language?.toLowerCase().includes(normalizedSearchQuery) ||
//             (website.sensitiveTopics &&
//               website.sensitiveTopics.some((topic) =>
//                 topic.toLowerCase().includes(normalizedSearchQuery)
//               ))
//           );
//         });

//         setWebsites(filteredData);
//       } catch (error) {
//         console.error("Error searching websites:", error);
//       }
//     }, 300),
//     [searchQuery, priceRange, da, ascore, mediaType, category, country, googleNews, sensitiveTopics]
//   );

//   useEffect(() => {
//     const performSearch = debounce(async () => {
//       try {
//         const searchParams = {};
  
//         if (searchQuery) {
//           searchParams.searchQuery = searchQuery.toLowerCase();
//         }
//         if (priceRange.min > 0 || priceRange.max < 50000) {
//           searchParams.minPrice = priceRange.min;
//           searchParams.maxPrice = priceRange.max;
//         }
//         if (da > 0) searchParams.da = da;
//         if (ascore > 0) searchParams.ascore = ascore;
//         if (mediaType) searchParams.mediaType = mediaType;
//         if (category) searchParams.category = category;
//         if (country) searchParams.country = country;
//         if (googleNews) searchParams.googleNews = googleNews === "Yes";
//         if (sensitiveTopics.length > 0) {
//           sensitiveTopics.forEach((topic) => {
//             searchParams[topic.toLowerCase()] = true;
//           });
//         }
  
//         const data = await searchService.searchWebsites(searchParams);
//         setWebsites(data);
//       } catch (error) {
//         console.error("Error searching websites:", error);
//       }
//     }, 300);
  
//     performSearch();
  
//     // Cleanup
//     return () => performSearch.cancel();
//   }, [searchQuery, priceRange, da, ascore, mediaType, category, country, googleNews, sensitiveTopics]);

 
//   useEffect(() => {
//     const handleInitialLoad = async () => {
//       const params = new URLSearchParams(location.search);
//       const queryFromURL = params.get('query');
//       const minPriceFromURL = params.get('minPrice');
//       const maxPriceFromURL = params.get('maxPrice');
  
//       // Set initial states from URL if they exist
//       if (queryFromURL || minPriceFromURL || maxPriceFromURL) {
//         if (queryFromURL) setSearchQuery(queryFromURL);
//         if (minPriceFromURL || maxPriceFromURL) {
//           setPriceRange({
//             min: parseInt(minPriceFromURL) || 0,
//             max: parseInt(maxPriceFromURL) || 50000,
//           });
//         }
//       } else {
//         // If no search parameters, fetch all websites
//         try {
//           const data = await websiteService.getAllWebsites();
//           setWebsites(data);
//         } catch (error) {
//           console.error("Error fetching websites:", error);
//         }
//       }
//     };
  
//     handleInitialLoad();
//   }, []); // Only run on component mount

//   const handleReset = async () => {
//     // First reset all states
//     setSearchQuery("");
//     setPriceRange({ min: 0, max: 50000 });
//     setDa(0);
//     setAscore(0);
//     setMediaType("");
//     setCategory("");
//     setCountry("");
//     setGoogleNews("");
//     setSensitiveTopics([]);
  
//     // Clear URL parameters
//     navigate('/advertiser/catalogue', { replace: true });
  
//     // Fetch all websites
//     try {
//       const data = await websiteService.getAllWebsites();
//       setWebsites(data);
//     } catch (error) {
//       console.error("Error fetching websites:", error);
//     }
//   };

//   const toggleFavorite = (id) => {
//     setFavorites((prev) => {
//       const newFavorites = new Set(prev);
//       newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
//       return newFavorites;
//     });
//   };

//   const toggleColumn = (columnName) => {
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [columnName.toLowerCase()]: !prev[columnName.toLowerCase()],
//     }));
//   };

//   const handleViewProduct = (id) => {
//     navigate(`/advertiser/products/view/${id}`);
//   };


//   const ColumnModal = () => {
//     if (!showColumnModal) return null;

//     const columnList = [
//       ["Country", "Name"],
//       ["Price", "Type"],
//       ["Category", "DA"],
//       ["Ascore", "ZA"],
//       ["Gambling", "CBD"],
//       ["Adult", "Trading"],
//       ["GNews", "BL"],
//       ["EDU", "GOV"],
//       ["Date"],
//     ];

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
//           <h2 className="text-lg md:text-xl font-bold mb-4">
//             Change view columns
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {columnList.map((row, index) => (
//               <React.Fragment key={index}>
//                 {row.map((column) => (
//                   <div key={column} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id={column}
//                       checked={visibleColumns[column.toLowerCase()]}
//                       onChange={() => toggleColumn(column)}
//                       className="w-4 h-4 accent-foundations-primary"
//                     />
//                     <label htmlFor={column} className="text-gray-700">
//                       {column}
//                     </label>
//                   </div>
//                 ))}
//               </React.Fragment>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={() => setShowColumnModal(false)}
//               className="w-full sm:w-auto bg-foundations-primary text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Catalog</h1>

//       <div className="flex flex-col gap-4 md:gap-6">
//         <SearchAndFilter
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           da={da}
//           setDa={setDa}
//           ascore={ascore}
//           setAscore={setAscore}
//           mediaType={mediaType}
//           setMediaType={setMediaType}
//           category={category}
//           setCategory={setCategory}
//           country={country}
//           setCountry={setCountry}
//           googleNews={googleNews}
//           setGoogleNews={setGoogleNews}
//           sensitiveTopics={sensitiveTopics}
//           setSensitiveTopics={setSensitiveTopics}
//           onSearch={handleSearch}
//           onReset={handleReset}
//         />

//         <div className="flex justify-end mt-4">
//           <button
//             className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded"
//             onClick={() => setShowColumnModal(true)}
//           >
//             CHANGE COLUMNS
//           </button>
//         </div>

//         <div className="relative overflow-x-auto max-w-[1080px] shadow-md sm:rounded-lg">
//           <div className="min-w-full inline-block align-middle">
//             <div className="overflow-x-auto border rounded-lg">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="p-2 text-left">Actions</th>
//                     {visibleColumns.country && (
//                       <th className="p-2 text-left">Country</th>
//                     )}
//                     {visibleColumns.name && (
//                       <th className="p-2 text-left">Name</th>
//                     )}
//                     {visibleColumns.price && (
//                       <th className="p-2 text-left">Price</th>
//                     )}
//                     {visibleColumns.type && (
//                       <th className="p-2 text-left">Type</th>
//                     )}
//                     {visibleColumns.category && (
//                       <th className="p-2 text-left">Category</th>
//                     )}
//                     {visibleColumns.cbd && (
//                       <th className="p-2 text-left">CBD</th>
//                     )}
//                     {visibleColumns.trading && (
//                       <th className="p-2 text-left">Trading</th>
//                     )}
//                     {visibleColumns.adult && (
//                       <th className="p-2 text-left">Adult</th>
//                     )}
//                     {visibleColumns.gambling && (
//                       <th className="p-2 text-left">Gambling</th>
//                     )}
//                     {visibleColumns.da && <th className="p-2 text-left">DA</th>}
//                     {visibleColumns.ascore && (
//                       <th className="p-2 text-left">AScore</th>
//                     )}
//                     {visibleColumns.za && <th className="p-2 text-left">ZA</th>}
//                     {visibleColumns.gnews && (
//                       <th className="p-2 text-left">GNews</th>
//                     )}
//                     {visibleColumns.bl && <th className="p-2 text-left">BL</th>}
//                     {visibleColumns.edu && (
//                       <th className="p-2 text-left">EDU</th>
//                     )}
//                     {visibleColumns.gov && (
//                       <th className="p-2 text-left">GOV</th>
//                     )}
//                     {visibleColumns.date && (
//                       <th className="p-2 text-left">Date</th>
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {websites.map((item) => (
//                     <tr key={item._id} className="border-b hover:bg-gray-50">
//                       <td className="p-2">
//                         <div className="flex gap-2">
//                           <button
//                             className="p-2 bg-foundations-primary rounded-full text-white"
//                             onClick={() => handleViewProduct(item._id)}
//                           >
//                             <FaEye />
//                           </button>
//                           <button className="p-2 bg-foundations-primary rounded-full text-white">
//                             <FaShoppingCart />
//                           </button>
//                           <button
//                             className={`p-2 rounded-full ${
//                               favorites.has(item._id)
//                                 ? "bg-foundations-primary text-white"
//                                 : "bg-gray-200 text-gray-600"
//                             }`}
//                             onClick={() => toggleFavorite(item._id)}
//                           >
//                             <FaStar />
//                           </button>
//                         </div>
//                       </td>
//                       {visibleColumns.country && (
//                         <td className="p-2">{item.language}</td>
//                       )}
//                       {visibleColumns.name && (
//                         <td className="p-2">{item.webDomain}</td>
//                       )}
//                       {visibleColumns.price && (
//                         <td className="p-2">€ {item.price.toFixed(2)}</td>
//                       )}
//                       {visibleColumns.type && (
//                         <td className="p-2">{item.mediaType}</td>
//                       )}
//                       {visibleColumns.category && (
//                         <td className="p-2">{item.category.join(", ")}</td>
//                       )}
//                       {visibleColumns.cbd && (
//                         <td className="p-2">
//                           {item.sensitiveTopics.includes("CBD") ? "Yes" : "No"}
//                         </td>
//                       )}
//                       {visibleColumns.trading && (
//                         <td className="p-2">
//                           {item.sensitiveTopics.includes("Trading")
//                             ? "Yes"
//                             : "No"}
//                         </td>
//                       )}
//                       {visibleColumns.adult && (
//                         <td className="p-2">
//                           {item.sensitiveTopics.includes("Adult")
//                             ? "Yes"
//                             : "No"}
//                         </td>
//                       )}
//                       {visibleColumns.gambling && (
//                         <td className="p-2">
//                           {item.sensitiveTopics.includes("Gambling")
//                             ? "Yes"
//                             : "No"}
//                         </td>
//                       )}
//                       {visibleColumns.da && <td className="p-2">-</td>}
//                       {visibleColumns.ascore && <td className="p-2">-</td>}
//                       {visibleColumns.za && <td className="p-2">-</td>}
//                       {visibleColumns.gnews && (
//                         <td className="p-2">
//                           {item.googleNews ? "Yes" : "No"}
//                         </td>
//                       )}
//                       {visibleColumns.bl && <td className="p-2">-</td>}
//                       {visibleColumns.edu && (
//                         <td className="p-2">
//                           {item.category.includes("Education") ? "Yes" : "No"}
//                         </td>
//                       )}
//                       {visibleColumns.gov && <td className="p-2">No</td>}
//                       {visibleColumns.date && (
//                         <td className="p-2">
//                           {new Date(item.createdAt).toLocaleDateString()}
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ColumnModal />
//     </div>
//   );
// };

// export default Catalog;

import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { websiteService, searchService } from "../../utils/services";
import SearchAndFilter from "../../components/Advertiser/Dashboard/SearchAndFilter";
import { debounce } from 'lodash';

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [websites, setWebsites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [da, setDa] = useState(0);
  const [ascore, setAscore] = useState(0);
  const [mediaType, setMediaType] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [googleNews, setGoogleNews] = useState('');
  const [sensitiveTopics, setSensitiveTopics] = useState([]);

  const [visibleColumns, setVisibleColumns] = useState({
    country: true,
    name: true,
    price: true,
    type: true,
    category: true,
    da: true,
    ascore: true,
    za: true,
    gambling: true,
    adult: true,
    cbd: true,
    trading: true,
    gnews: true,
    bl: true,
    edu: true,
    gov: true,
    date: true,
  });

  const handleSearch = useCallback(
    debounce(async () => {
      try {
        const searchParams = {};

        if (searchQuery) {
          searchParams.searchQuery = searchQuery.toLowerCase();
        }

        if (priceRange.min > 0 || priceRange.max < 50000) {
          searchParams.minPrice = priceRange.min;
          searchParams.maxPrice = priceRange.max;
        }
        if (da > 0) searchParams.da = da;
        if (ascore > 0) searchParams.ascore = ascore;
        if (mediaType) searchParams.mediaType = mediaType;
        if (category) searchParams.category = category;
        if (country) searchParams.country = country;
        if (googleNews) searchParams.googleNews = googleNews === "Yes";

        if (sensitiveTopics.length > 0) {
          sensitiveTopics.forEach((topic) => {
            searchParams[topic.toLowerCase()] = true;
          });
        }

        const data = await searchService.searchWebsites(searchParams);

        const normalizedSearchQuery = searchQuery
          .replace(/^https?:\/\//, "")
          .replace(/\/$/, "")
          .toLowerCase();

        const filteredData = data.filter((website) => {
          const domain = website.webDomain?.toLowerCase();
          return (
            domain.includes(normalizedSearchQuery) ||
            website.category?.some((cat) =>
              cat.toLowerCase().includes(normalizedSearchQuery)
            ) ||
            website.mediaType?.toLowerCase().includes(normalizedSearchQuery) ||
            website.language?.toLowerCase().includes(normalizedSearchQuery) ||
            (website.sensitiveTopics &&
              website.sensitiveTopics.some((topic) =>
                topic.toLowerCase().includes(normalizedSearchQuery)
              ))
          );
        });

        setWebsites(filteredData);
      } catch (error) {
        console.error("Error searching websites:", error);
      }
    }, 300),
    [searchQuery, priceRange, da, ascore, mediaType, category, country, googleNews, sensitiveTopics]
  );

  useEffect(() => {
    const performSearch = debounce(async () => {
      try {
        const searchParams = {};
  
        if (searchQuery) {
          searchParams.searchQuery = searchQuery.toLowerCase();
        }
        if (priceRange.min > 0 || priceRange.max < 50000) {
          searchParams.minPrice = priceRange.min;
          searchParams.maxPrice = priceRange.max;
        }
        if (da > 0) searchParams.da = da;
        if (ascore > 0) searchParams.ascore = ascore;
        if (mediaType) searchParams.mediaType = mediaType;
        if (category) searchParams.category = category;
        if (country) searchParams.country = country;
        if (googleNews) searchParams.googleNews = googleNews === "Yes";
        if (sensitiveTopics.length > 0) {
          sensitiveTopics.forEach((topic) => {
            searchParams[topic.toLowerCase()] = true;
          });
        }
  
        const data = await searchService.searchWebsites(searchParams);
        setWebsites(data);
      } catch (error) {
        console.error("Error searching websites:", error);
      }
    }, 300);
  
    performSearch();
  
    // Cleanup
    return () => performSearch.cancel();
  }, [searchQuery, priceRange, da, ascore, mediaType, category, country, googleNews, sensitiveTopics]);

 
  useEffect(() => {
    const handleInitialLoad = async () => {
      const params = new URLSearchParams(location.search);
      
      // Handle all possible URL parameters
      const queryFromURL = params.get('query');
      const minPriceFromURL = params.get('minPrice');
      const maxPriceFromURL = params.get('maxPrice');
      const daFromURL = params.get('da');
      const ascoreFromURL = params.get('ascore');
      const mediaTypeFromURL = params.get('mediaType');
      const categoryFromURL = params.get('category');
      const countryFromURL = params.get('country');
      const googleNewsFromURL = params.get('googleNews');
      const sensitiveTopicsFromURL = params.getAll('sensitiveTopics');
  
      // Set initial states from URL if they exist
      if (queryFromURL || minPriceFromURL || maxPriceFromURL || daFromURL || 
          ascoreFromURL || mediaTypeFromURL || categoryFromURL || countryFromURL || 
          googleNewsFromURL || sensitiveTopicsFromURL.length > 0) {
        
        // Set all states based on URL parameters
        if (queryFromURL) setSearchQuery(queryFromURL);
        if (minPriceFromURL || maxPriceFromURL) {
          setPriceRange({
            min: parseInt(minPriceFromURL) || 0,
            max: parseInt(maxPriceFromURL) || 50000,
          });
        }
        if (daFromURL) setDa(parseInt(daFromURL));
        if (ascoreFromURL) setAscore(parseInt(ascoreFromURL));
        if (mediaTypeFromURL) setMediaType(mediaTypeFromURL);
        if (categoryFromURL) setCategory(categoryFromURL);
        if (countryFromURL) setCountry(countryFromURL);
        if (googleNewsFromURL) setGoogleNews(googleNewsFromURL);
        if (sensitiveTopicsFromURL.length > 0) {
          setSensitiveTopics(sensitiveTopicsFromURL);
        }
  
        // Perform search with all parameters
        const searchParams = {};
        if (queryFromURL) searchParams.searchQuery = queryFromURL.toLowerCase();
        if (minPriceFromURL) searchParams.minPrice = parseInt(minPriceFromURL);
        if (maxPriceFromURL) searchParams.maxPrice = parseInt(maxPriceFromURL);
        if (daFromURL) searchParams.da = parseInt(daFromURL);
        if (ascoreFromURL) searchParams.ascore = parseInt(ascoreFromURL);
        if (mediaTypeFromURL) searchParams.mediaType = mediaTypeFromURL;
        if (categoryFromURL) searchParams.category = categoryFromURL;
        if (countryFromURL) searchParams.country = countryFromURL;
        if (googleNewsFromURL) searchParams.googleNews = googleNewsFromURL === "Yes";
        if (sensitiveTopicsFromURL.length > 0) {
          sensitiveTopicsFromURL.forEach((topic) => {
            searchParams[topic.toLowerCase()] = true;
          });
        }
  
        try {
          const data = await searchService.searchWebsites(searchParams);
          setWebsites(data);
        } catch (error) {
          console.error("Error searching websites:", error);
        }
      } else {
        // If no search parameters, fetch all websites
        try {
          const data = await websiteService.getAllWebsites();
          setWebsites(data);
        } catch (error) {
          console.error("Error fetching websites:", error);
        }
      }
    };
  
    handleInitialLoad();
  }, [location.search]); // Add location.search as dependency

  const handleReset = async () => {
    // First reset all states
    setSearchQuery("");
    setPriceRange({ min: 0, max: 50000 });
    setDa(0);
    setAscore(0);
    setMediaType("");
    setCategory("");
    setCountry("");
    setGoogleNews("");
    setSensitiveTopics([]);
  
    // Clear URL parameters
    navigate('/advertiser/catalogue', { replace: true });
  
    // Fetch all websites
    try {
      const data = await websiteService.getAllWebsites();
      setWebsites(data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  const toggleColumn = (columnName) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName.toLowerCase()]: !prev[columnName.toLowerCase()],
    }));
  };

  const handleViewProduct = (id) => {
    navigate(`/advertiser/products/view/${id}`);
  };

  const ColumnModal = () => {
    if (!showColumnModal) return null;

    const columnList = [
      ["Country", "Name"],
      ["Price", "Type"],
      ["Category", "DA"],
      ["Ascore", "ZA"],
      ["Gambling", "CBD"],
      ["Adult", "Trading"],
      ["GNews", "BL"],
      ["EDU", "GOV"],
      ["Date"],
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Change view columns
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {columnList.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((column) => (
                  <div key={column} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={column}
                      checked={visibleColumns[column.toLowerCase()]}
                      onChange={() => toggleColumn(column)}
                      className="w-4 h-4 accent-foundations-primary"
                    />
                    <label htmlFor={column} className="text-gray-700">
                      {column}
                    </label>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowColumnModal(false)}
              className="w-full sm:w-auto bg-foundations-primary text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
    <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Catalog</h1>
  
    <div className="flex flex-col gap-4 md:gap-6">
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        da={da}
        setDa={setDa}
        ascore={ascore}
        setAscore={setAscore}
        mediaType={mediaType}
        setMediaType={setMediaType}
        category={category}
        setCategory={setCategory}
        country={country}
        setCountry={setCountry}
        googleNews={googleNews}
        setGoogleNews={setGoogleNews}
        sensitiveTopics={sensitiveTopics}
        setSensitiveTopics={setSensitiveTopics}
        onSearch={handleSearch}
        onReset={handleReset}
      />
  
      <div className="flex justify-end mt-4">
        <button
          className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded hover:bg-foundations-secondary transition-colors"
          onClick={() => setShowColumnModal(true)}
        >
          CHANGE COLUMNS
        </button>
      </div>
  
      <div className="w-full">
        <div className="table-wrapper overflow-x-auto shadow-md sm:rounded-lg">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg">
              <table className="min-w-full divide-y divide-foundations-tertiary bg-foundations-light">
                <thead className="bg-gradient-to-r from-foundations-primary to-foundations-secondary">
                  <tr>
                    <th className="sticky left-0 z-20 p-3 text-left text-white bg-gradient-to-r from-foundations-primary to-foundations-secondary">
                      Actions
                    </th>
                    {visibleColumns.country && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Country</th>
                    )}
                    {visibleColumns.name && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Name</th>
                    )}
                    {visibleColumns.price && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Price</th>
                    )}
                    {visibleColumns.type && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Type</th>
                    )}
                    {visibleColumns.category && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Category</th>
                    )}
                    {visibleColumns.cbd && (
                      <th className="p-3 text-left text-white whitespace-nowrap">CBD</th>
                    )}
                    {visibleColumns.trading && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Trading</th>
                    )}
                    {visibleColumns.adult && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Adult</th>
                    )}
                    {visibleColumns.gambling && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Gambling</th>
                    )}
                    {visibleColumns.da && (
                      <th className="p-3 text-left text-white whitespace-nowrap">DA</th>
                    )}
                    {visibleColumns.ascore && (
                      <th className="p-3 text-left text-white whitespace-nowrap">AScore</th>
                    )}
                    {visibleColumns.za && (
                      <th className="p-3 text-left text-white whitespace-nowrap">ZA</th>
                    )}
                    {visibleColumns.gnews && (
                      <th className="p-3 text-left text-white whitespace-nowrap">GNews</th>
                    )}
                    {visibleColumns.bl && (
                      <th className="p-3 text-left text-white whitespace-nowrap">BL</th>
                    )}
                    {visibleColumns.edu && (
                      <th className="p-3 text-left text-white whitespace-nowrap">EDU</th>
                    )}
                    {visibleColumns.gov && (
                      <th className="p-3 text-left text-white whitespace-nowrap">GOV</th>
                    )}
                    {visibleColumns.date && (
                      <th className="p-3 text-left text-white whitespace-nowrap">Date</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-foundations-tertiary">
                  {websites.map((item) => (
                    <tr 
                      key={item._id} 
                      className="hover:bg-foundations-secondary transition-colors"
                    >
                      <td className="sticky left-0 z-10 p-3 bg-white">
                        <div className="flex gap-2">
                          <button
                            className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                            onClick={() => handleViewProduct(item._id)}
                          >
                            <FaEye />
                          </button>
                          <button className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors">
                            <FaShoppingCart />
                          </button>
                          <button
                            className={`p-2 rounded-full ${
                              favorites.has(item._id)
                                ? "bg-foundations-primary text-white"
                                : "bg-foundations-tertiary text-foundations-dark"
                            } hover:bg-foundations-secondary transition-colors`}
                            onClick={() => toggleFavorite(item._id)}
                          >
                            <FaStar />
                          </button>
                        </div>
                      </td>
                      {visibleColumns.country && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">{item.language}</td>
                      )}
                      {visibleColumns.name && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">{item.webDomain}</td>
                      )}
                      {visibleColumns.price && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">€ {item.price.toFixed(2)}</td>
                      )}
                      {visibleColumns.type && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">{item.mediaType}</td>
                      )}
                      {visibleColumns.category && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          <div className="relative group">
                            <span>{item.category[0]}</span>
                            {item.category.length > 1 && (
                              <span className="ml-1 text-foundations-tertiary">
                                +{item.category.length - 1}
                              </span>
                            )}
                            {item.category.length > 1 && (
                              <div className="absolute hidden group-hover:block left-0 mt-1 p-2 bg-white border rounded shadow-lg z-20">
                                {item.category.join(", ")}
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                      {visibleColumns.cbd && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {item.sensitiveTopics.includes("CBD") ? "✔" : "✖"}
                        </td>
                      )}
                      {visibleColumns.trading && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {item.sensitiveTopics.includes("Trading") ? "✔" : "✖"}
                        </td>
                      )}
                      {visibleColumns.adult && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {item.sensitiveTopics.includes("Adult") ? "✔" : "✖"}
                        </td>
                      )}
                      {visibleColumns.gambling && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {item.sensitiveTopics.includes("Gambling") ? "✔" : "✖"}
                        </td>
                      )}
                      {visibleColumns.da && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>
                      )}
                      {visibleColumns.ascore && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>
                      )}
                      {visibleColumns.za && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>
                      )}
                      {visibleColumns.gnews && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {item.googleNews ? "✔" : "✖"}
                        </td>
                      )}
                      {visibleColumns.bl && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>
                      )}
                      {visibleColumns.edu && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {item.category.includes("Education") ? "✔" : "✖"}
                        </td>
                      )}
                      {visibleColumns.gov && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">✖</td>
                      )}
                      {visibleColumns.date && (
                        <td className="p-3 text-foundations-dark whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <ColumnModal />
  </div>
  );
};

export default Catalog;