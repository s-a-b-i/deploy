// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { websiteService, promoService } from "../../utils/services";
// import DashboardCards from '../../components/Advertiser/Dashboard/DashboardCards';
// import SearchAndFilter from '../../components/Advertiser/Dashboard/SearchAndFilter';
// import RecentServices from '../../components/Advertiser/Dashboard/RecentServices';
// import RankisterPromo from '../../components/Advertiser/Dashboard/RankisterPromo';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
//   const [recentServices, setRecentServices] = useState([]);
//   const [rankisterPromo, setRankisterPromo] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [da, setDa] = useState(0);
//   const [ascore, setAscore] = useState(0);
//   const [mediaType, setMediaType] = useState('');
//   const [category, setCategory] = useState('');
//   const [country, setCountry] = useState('');
//   const [googleNews, setGoogleNews] = useState('');
//   const [sensitiveTopics, setSensitiveTopics] = useState([]);

//   useEffect(() => {
//     fetchRecentData();
//   }, []);

//   const handleSearch = () => {
//     const searchParams = new URLSearchParams();

//     if (searchQuery) {
//       searchParams.append('query', searchQuery);
//     }
//     if (priceRange.min > 0 || priceRange.max < 50000) {
//       searchParams.append('minPrice', priceRange.min.toString());
//       searchParams.append('maxPrice', priceRange.max.toString());
//     }
//     if (da > 0) searchParams.append('da', da.toString());
//     if (ascore > 0) searchParams.append('ascore', ascore.toString());
//     if (mediaType) searchParams.append('mediaType', mediaType);
//     if (category) searchParams.append('category', category);
//     if (country) searchParams.append('country', country);
//     if (googleNews) searchParams.append('googleNews', googleNews);
//     if (sensitiveTopics.length > 0) {
//       sensitiveTopics.forEach(topic => {
//         searchParams.append('sensitiveTopics', topic);
//       });
//     }

//     navigate(`/advertiser/catalogue?${searchParams.toString()}`);
//   };

//   const handleReset = () => {
//     setSearchQuery("");
//     setPriceRange({ min: 0, max: 50000 });
//     setDa(0);
//     setAscore(0);
//     setMediaType('');
//     setCategory('');
//     setCountry('');
//     setGoogleNews('');
//     setSensitiveTopics([]);
//   };

//   const fetchRecentData = async () => {
//     try {
//       setIsLoading(true);
      
//       // Fetch recent websites
//       const websitesData = await websiteService.getRecentlyCreatedWebsites(5);
//       const formattedWebsites = websitesData.map(website => ({
//         type: website.mediaType,
//         name: website.webDomain,
//         price: `€ ${website.price.toFixed(2)}`,
//         icons: website.mediaType === "Social Pages" ? ["🌐"] : ["🌐"]
//       }));
//       setRecentServices(formattedWebsites);
  
//       // Fetch recent promos
//       const promosData = await promoService.getRecentlyCreatedPromos(3);
      
//       // Fetch website details for each promo
//       const formattedPromos = await Promise.all(promosData.map(async promo => {
//         const websiteId = promo.products[0];
        
//         try {
//           const websiteDetails = await websiteService.getWebsiteById(websiteId);
          
//           return {
//             name: promo.promoName,
//             webDomain: websiteDetails.webDomain,
//             price: websiteDetails?.price ? `€ ${websiteDetails.price.toFixed(2)}` : "N/A",
//             discountPrice: websiteDetails?.price ? 
//               `€ ${(websiteDetails.price * (1 - promo.discount/100)).toFixed(2)}` : "N/A",
//             discount: `${promo.discount}%`
//           };
//         } catch (error) {
//           console.error(`Error fetching website details for ID ${websiteId}:`, error);
//           return {
//             name: promo.promoName,
//             webDomain: "N/A",
//             price: "N/A",
//             discountPrice: "N/A",
//             discount: `${promo.discount}%`
//           };
//         }
//       }));
      
//       setRankisterPromo(formattedPromos);
//     } catch (error) {
//       console.error("Error fetching recent data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <DashboardCards />
//       <SearchAndFilter 
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//         da={da}
//         setDa={setDa}
//         ascore={ascore}
//         setAscore={setAscore}
//         mediaType={mediaType}
//         setMediaType={setMediaType}
//         category={category}
//         setCategory={setCategory}
//         country={country}
//         setCountry={setCountry}
//         googleNews={googleNews}
//         setGoogleNews={setGoogleNews}
//         sensitiveTopics={sensitiveTopics}
//         setSensitiveTopics={setSensitiveTopics}
//         onSearch={handleSearch}
//         onReset={handleReset}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//         <RecentServices isLoading={isLoading} recentServices={recentServices} />
//         <RankisterPromo isLoading={isLoading} rankisterPromo={rankisterPromo} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { websiteService, promoService } from "../../utils/services";
import DashboardCards from '../../components/Advertiser/Dashboard/DashboardCards';
import SearchAndFilter from '../../components/Advertiser/Dashboard/SearchAndFilter';
import RecentServices from '../../components/Advertiser/Dashboard/RecentServices';
import RankisterPromo from '../../components/Advertiser/Dashboard/RankisterPromo';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [recentServices, setRecentServices] = useState([]);
  const [rankisterPromo, setRankisterPromo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [da, setDa] = useState(0);
  const [ascore, setAscore] = useState(0);
  const [mediaType, setMediaType] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [googleNews, setGoogleNews] = useState('');
  const [sensitiveTopics, setSensitiveTopics] = useState([]);

  useEffect(() => {
    fetchRecentData();
  }, []);

  const handleViewProduct = (id, userId) => {
    navigate(`/advertiser/products/view/${id}?action=${userId}`);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (searchQuery) {
      searchParams.append('query', searchQuery);
    }
    if (priceRange.min > 0 || priceRange.max < 50000) {
      searchParams.append('minPrice', priceRange.min.toString());
      searchParams.append('maxPrice', priceRange.max.toString());
    }
    if (da > 0) searchParams.append('da', da.toString());
    if (ascore > 0) searchParams.append('ascore', ascore.toString());
    if (mediaType) searchParams.append('mediaType', mediaType);
    if (category) searchParams.append('category', category);
    if (country) searchParams.append('country', country);
    if (googleNews) searchParams.append('googleNews', googleNews);
    if (sensitiveTopics.length > 0) {
      sensitiveTopics.forEach(topic => {
        searchParams.append('sensitiveTopics', topic);
      });
    }

    navigate(`/advertiser/catalogue?${searchParams.toString()}`);
  };

  const handleReset = () => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: 50000 });
    setDa(0);
    setAscore(0);
    setMediaType('');
    setCategory('');
    setCountry('');
    setGoogleNews('');
    setSensitiveTopics([]);
  };

  const fetchRecentData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch recent websites
      const websitesData = await websiteService.getRecentlyCreatedWebsites(5);
      const formattedWebsites = websitesData.map(website => ({
        id: website._id,
        userId: website.userId,
        type: website.mediaType,
        name: website.webDomain,
        price: `€ ${website.price.toFixed(2)}`,
        icons: website.mediaType === "Social Pages" ? ["🌐"] : ["🌐"]
      }));
      setRecentServices(formattedWebsites);
    
      // Fetch recent promos
      const promosData = await promoService.getRecentlyCreatedPromos(3);
      
      // Find the promo with the maximum number of products
      const maxProductsPromo = promosData.reduce((max, current) => 
        current.products.length > max.products.length ? current : max
      , promosData[0]);
      
      if (maxProductsPromo) {
        // Fetch website details for all products in the promo
        const websiteDetails = await Promise.all(
          maxProductsPromo.products.map(websiteId => 
            websiteService.getWebsiteById(websiteId)
          )
        );
        
        const formattedPromo = {
          id: maxProductsPromo._id,
          userId: websiteDetails[0]?.userId,
          name: maxProductsPromo.promoName,
          webDomains: websiteDetails.map(website => website.webDomain),
          price: websiteDetails[0]?.price ? 
            `€ ${websiteDetails[0].price.toFixed(2)}` : "N/A",
          discountPrice: websiteDetails[0]?.price ? 
            `€ ${(websiteDetails[0].price * (1 - maxProductsPromo.discount/100)).toFixed(2)}` : "N/A",
          discount: `${maxProductsPromo.discount}%`,
          numberOfProducts: maxProductsPromo.products.length,
          // Include all website details
          websites: websiteDetails.map(website => ({
            id: website._id,
            webDomain: website.webDomain,
            price: website.price ? `€ ${website.price.toFixed(2)}` : "N/A",
            discountPrice: website.price ? 
              `€ ${(website.price * (1 - maxProductsPromo.discount/100)).toFixed(2)}` : "N/A"
          }))
        };
        
        setRankisterPromo([formattedPromo]);
      } else {
        setRankisterPromo([]);
      }
    } catch (error) {
      console.error("Error fetching recent data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <DashboardCards />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <RecentServices 
          isLoading={isLoading} 
          recentServices={recentServices} 
          onViewProduct={handleViewProduct}
        />
        <RankisterPromo 
          isLoading={isLoading} 
          rankisterPromo={rankisterPromo} 
          onViewProduct={handleViewProduct}
        />
      </div>
    </div>
  );
};

export default Dashboard;