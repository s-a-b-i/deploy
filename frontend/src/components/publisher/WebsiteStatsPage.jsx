// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import { FaChartLine, FaTimes } from 'react-icons/fa';
// import { statsService } from '../../utils/services';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';
// import Loader from '../../components/Loader';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const WebsiteStatsPage = () => {
//   const { websiteId } = useParams();
//   const user = useAuthStore((state) => state.user);
//   const [statsData, setStatsData] = useState({
//     monthly: null,
//     last30Days: null,
//     last12Months: null
//   });
//   const [activeTab, setActiveTab] = useState('monthly');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchStats();
//   }, [websiteId, user?._id]);

//   const fetchStats = async () => {
//     if (!websiteId || !user?._id) return;

//     setIsLoading(true);
//     try {
//       const currentDate = new Date();
//       const [monthlyStats, last30DaysStats, last12MonthsStats] = await Promise.all([
//         statsService.getMonthlyStats(user._id, websiteId, currentDate.getFullYear(), currentDate.getMonth() + 1),
//         statsService.getLast30DaysStats(user._id, websiteId),
//         statsService.getLast12MonthsStats(user._id, websiteId)
//       ]);

//       setStatsData({ monthly: monthlyStats, last30Days: last30DaysStats, last12Months: last12MonthsStats });
//     } catch (error) {
//       toast.error('Failed to fetch stats');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getChartData = (data) => {
//     if (!data) return null;

//     const metrics = ['impressions', 'clicks','addToCarts','favourites', 'revenues', 'sales'];
//     const labels = data[metrics[0]]?.map((_, index) => `Day ${index + 1}`);

//     return {
//       labels,
//       datasets: metrics.map((metric, index) => ({
//         label: metric.charAt(0).toUpperCase() + metric.slice(1),
//         data: data[metric]?.map(item => item.value) || [],
//         borderColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'][index],
//         tension: 0.1
//       }))
//     };
//   };

//   if (isLoading) return <div className="flex justify-center mt-10"><Loader /></div>;

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold mb-6 flex items-center">
//           <FaChartLine className="mr-2" /> Website Statistics
//         </h1>

//         <div className="flex mb-6 space-x-2">
//           {['monthly', 'last30Days', 'last12Months'].map((tab) => (
//             <button
//               key={tab}
//               className={`px-4 py-2 rounded ${
//                 activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//             </button>
//           ))}
//         </div>

//         <div className="h-[400px]">
//           {statsData[activeTab] && (
//             <Line
//               data={getChartData(statsData[activeTab])}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: { position: 'top' },
//                   title: { display: false }
//                 }
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebsiteStatsPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import { FaChevronDown } from 'react-icons/fa';
// import { statsService } from '../../utils/services';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';
// import Loader from '../../components/Loader';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Utility function to format dates
// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     month: '2-digit',
//     day: '2-digit'
//   });
// };

// const MetricSection = ({ title, data, color, isLoading }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const chartData = {
//     labels: data?.map(item => formatDate(item.date)) || [],
//     datasets: [
//       {
//         label: title,
//         data: data?.map(item => item.value) || [],
//         borderColor: color,
//         backgroundColor: color,
//         tension: 0.1,
//         pointRadius: 4,
//         fill: false
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: (context) => {
//             return `${title}: ${context.raw}`;
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 0.5
//         }
//       },
//       x: {
//         grid: {
//           display: false
//         }
//       }
//     },
//     interaction: {
//       mode: 'nearest',
//       axis: 'x',
//       intersect: false
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow mb-6">
//       <div 
//         className="flex justify-between items-center p-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white cursor-pointer rounded-t-lg"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <h2 className="font-bold">{title}</h2>
//         <FaChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
//       </div>
//       {isExpanded && (
//         <div className="p-4 h-[200px]">
//           {isLoading ? (
//             <div className="h-full flex items-center justify-center">
//               <Loader />
//             </div>
//           ) : (
//             <Line data={chartData} options={options} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const WebsiteStatsPage = () => {
//   const { websiteId } = useParams();
//   const navigate = useNavigate();
//   const user = useAuthStore((state) => state.user);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for filters
//   const [period, setPeriod] = useState('last30days');
//   const [selectedMonth, setSelectedMonth] = useState(() => {
//     const date = new Date();
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//   });

//   // State for metrics data
//   const [metricsData, setMetricsData] = useState({
//     impressions: [],
//     clicks: [],
//     addToCarts: [],
//     revenues: [],
//     sales: [],
//     positions: []
//   });

//   // Generate available months for dropdown
//   const getAvailableMonths = () => {
//     const months = [];
//     const currentDate = new Date();
//     for (let i = 0; i < 12; i++) {
//       const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
//       const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//       months.push({
//         value: monthStr,
//         label: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
//       });
//     }
//     return months;
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       if (!websiteId || !user?._id) return;

//       setIsLoading(true);
//       setError(null);

//       try {
//         let stats;
//         if (period === 'last30days') {
//           stats = await statsService.getLast30DaysStats(user._id, websiteId);
//         } else {
//           const [year, month] = selectedMonth.split('-');
//           stats = await statsService.getMonthlyStats(user._id, websiteId, parseInt(year), parseInt(month));
//         }

//         setMetricsData({
//           impressions: stats.impressions || [],
//           clicks: stats.clicks || [],
//           addToCarts: stats.addToCarts || [],
//           revenues: stats.revenues || [],
//           sales: stats.sales || [],
//           positions: stats.positions || []
//         });
//       } catch (err) {
//         setError(err.message || 'Failed to fetch statistics');
//         toast.error('Failed to load statistics');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStats();
//   }, [websiteId, user?._id, period, selectedMonth]);

//   const handlePeriodChange = (e) => {
//     setPeriod(e.target.value);
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-[50vh]">
//         <div className="text-red-500 text-center">
//           <p className="text-xl font-bold mb-2">Error loading statistics</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="flex items-center justify-between mb-6">
//         <button 
//           onClick={() => navigate('/publisher/products')}
//           className="text-blue-600 hover:underline font-bold flex items-center"
//         >
//           ← Back to my products
//         </button>
//         <div className="flex gap-4">
//           <select 
//             value={period}
//             onChange={handlePeriodChange}
//             className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="last30days">Last 30 days</option>
//             <option value="monthly">Monthly</option>
//           </select>
          
//           {period === 'monthly' && (
//             <select 
//               value={selectedMonth}
//               onChange={handleMonthChange}
//               className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {getAvailableMonths().map(month => (
//                 <option key={month.value} value={month.value}>
//                   {month.label}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <MetricSection 
//           title="Impressions" 
//           data={metricsData.impressions} 
//           color="#87CEEB"
//           isLoading={isLoading} 
//         />
//         <MetricSection 
//           title="Clicks" 
//           data={metricsData.clicks} 
//           color="#FFA07A"
//           isLoading={isLoading} 
//         />
//         <MetricSection 
//           title="Adds to cart" 
//           data={metricsData.addToCarts} 
//           color="#4169E1"
//           isLoading={isLoading} 
//         />
//         <MetricSection 
//           title="Revenues" 
//           data={metricsData.revenues} 
//           color="#800080"
//           isLoading={isLoading} 
//         />
//         <MetricSection 
//           title="Sales" 
//           data={metricsData.sales} 
//           color="#32CD32"
//           isLoading={isLoading} 
//         />
//         <MetricSection 
//           title="Positions" 
//           data={metricsData.positions} 
//           color="#FF0000"
//           isLoading={isLoading} 
//         />
//       </div>
//     </div>
//   );
// };

// export default WebsiteStatsPage;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';
// import { statsService, websiteService } from '../../utils/services';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';
// import Loader from '../../components/Loader';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const METRIC_COLORS = {
//   impressions: '#4CAF50',
//   clicks: '#2196F3',
//   addToCarts: '#FF9800',
//   revenues: '#9C27B0',
//   sales: '#F44336',
//   positions: '#607D8B'
// };

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     month: '2-digit',
//     day: '2-digit'
//   });
// };

// const MetricSection = ({ title, data, color, isLoading }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const chartData = {
//     labels: data?.map(item => formatDate(item.date)) || [],
//     datasets: [
//       {
//         label: title,
//         data: data?.map(item => item.value) || [],
//         borderColor: color,
//         backgroundColor: color,
//         tension: 0.1,
//         pointRadius: 4,
//         fill: false
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: (context) => `${title}: ${context.raw}`
//         }
//       }
//     },
//     scales: {
//       y: { 
//         beginAtZero: true, 
//         ticks: { 
//           stepSize: 0.5,
//           maxTicksLimit: 8
//         }
//       },
//       x: { 
//         grid: { display: false },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45,
//           maxTicksLimit: 12
//         }
//       }
//     },
//     interaction: { mode: 'nearest', axis: 'x', intersect: false }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow mb-6">
//       <div 
//         className="flex justify-between items-center p-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white cursor-pointer rounded-t-lg"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         <h2 className="font-bold text-sm sm:text-base">{title}</h2>
//         <FaChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
//       </div>
//       {isExpanded && (
//         <div className="p-2 sm:p-4" style={{ height: '250px', minHeight: '250px' }}>
//           {isLoading ? (
//             <div className="h-full flex items-center justify-center">
//               <Loader />
//             </div>
//           ) : data?.length === 0 ? (
//             <div className="h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
//               No data available yet
//             </div>
//           ) : (
//             <Line data={chartData} options={options} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const WebsiteStatsPage = () => {
//   const { websiteId } = useParams();
//   const navigate = useNavigate();
//   const user = useAuthStore((state) => state.user);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [websiteCreatedAt, setWebsiteCreatedAt] = useState(null);

//   const [period, setPeriod] = useState('last30days');
//   const [selectedMonth, setSelectedMonth] = useState(() => {
//     const date = new Date();
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//   });

//   const [metricsData, setMetricsData] = useState({
//     impressions: [],
//     clicks: [],
//     addToCarts: [],
//     revenues: [],
//     sales: [],
//     favourites: []
//   });

//   useEffect(() => {
//     if (!websiteId || !user?._id) {
//       toast.error('Invalid website ID or user not authenticated');
//       navigate('/publisher/products');
//       return;
//     }

//     const fetchWebsiteDetails = async () => {
//       try {
//         const websiteData = await websiteService.getWebsiteById(websiteId, user._id);
//         if (!websiteData) throw new Error('Website not found');

//         const createdAt = websiteData.createdAt;
//         if (createdAt) {
//           setWebsiteCreatedAt(new Date(
//             createdAt.$date?.$numberLong || 
//             createdAt.$date || 
//             createdAt
//           ));
//         }
//       } catch (err) {
//         toast.error(err.message || 'Failed to load website details');
//         navigate('/publisher/products');
//       }
//     };

//     fetchWebsiteDetails();
//   }, [websiteId, user?._id, navigate]);

//   useEffect(() => {
//     if (!websiteId || !user?._id) return;

//     const fetchStats = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         let stats;
//         if (period === 'last30days') {
//           stats = await statsService.getLast30DaysStats(user._id, websiteId);
//         } else {
//           const [year, month] = selectedMonth.split('-');
//           stats = await statsService.getMonthlyStats(user._id, websiteId, parseInt(year), parseInt(month));
//         }

//         setMetricsData({
//           impressions: stats.impressions || [],
//           clicks: stats.clicks || [],
//           addToCarts: stats.addToCarts || [],
//           revenues: stats.revenues || [],
//           sales: stats.sales || [],
//           favourites: stats.favourites || []
//         });
//       } catch (err) {
//         setError(err.message || 'Failed to fetch statistics');
//         toast.error(err.message || 'Failed to load statistics');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStats();
//   }, [websiteId, user?._id, period, selectedMonth]);

//   return (
//     <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <button 
//           onClick={() => navigate('/publisher/products')}
//           className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm sm:text-base"
//         >
//           <FaArrowLeft className="text-sm" />
//           Back to Products
//         </button>
        
//         <div className="flex flex-wrap gap-3 items-center">
//           <select 
//             className="p-2 border rounded-md text-sm sm:text-base min-w-[120px]"
//             value={period}
//             onChange={(e) => setPeriod(e.target.value)}
//           >
//             <option value="last30days">Last 30 Days</option>
//             <option value="monthly">Monthly</option>
//           </select>
          
//           {period === 'monthly' && (
//             <input
//               type="month"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="p-2 border rounded-md text-sm sm:text-base"
//               max={new Date().toISOString().slice(0, 7)}
//             />
//           )}
//         </div>
//       </div>

//       {error ? (
//         <div className="flex flex-col justify-center items-center h-[50vh] text-red-500 text-center p-4">
//           <p className="text-lg sm:text-xl font-bold mb-2">Error loading statistics</p>
//           <p className="text-sm sm:text-base">{error}</p>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
//           {Object.entries(metricsData).map(([key, data]) => (
//             <MetricSection 
//               key={key}
//               title={key.charAt(0).toUpperCase() + key.slice(1)}
//               data={data}
//               color={METRIC_COLORS[key]}
//               isLoading={isLoading}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebsiteStatsPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { statsService, websiteService } from '../../utils/services';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Color constants for metrics
const METRIC_COLORS = {
  impressions: '#4CAF50',
  clicks: '#2196F3',
  addToCarts: '#FF9800',
  revenues: '#9C27B0',
  sales: '#F44336',
  positions: '#607D8B',
  favourites: '#FF5722'
};

// Date formatting utility
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit'
  });
};

// MetricSection component for individual metric charts
const MetricSection = ({ title, data, color, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const chartData = {
    labels: data?.map(item => formatDate(item.date)) || [],
    datasets: [
      {
        label: title,
        data: data?.map(item => item.value) || [],
        borderColor: color,
        backgroundColor: color + '33', // Add slight transparency
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
        pointBorderColor: color,
        pointBackgroundColor: 'white',
        fill: 'start'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: (context) => `${title}: ${context.raw}`
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { 
          stepSize: 0.5,
          maxTicksLimit: 8,
          color: 'rgba(0, 0, 0, 0.6)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: { 
        grid: { display: false },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 12,
          color: 'rgba(0, 0, 0, 0.6)'
        }
      }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    elements: {
      line: {
        borderCapStyle: 'round'
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div 
        className="flex justify-between items-center p-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white cursor-pointer rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        <FaChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      {isExpanded && (
        <div className="p-2 sm:p-4" style={{ height: '300px', minHeight: '300px' }}>
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : data?.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
              No data available yet
            </div>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>
      )}
    </div>
  );
};

// Main WebsiteStatsPage component
const WebsiteStatsPage = () => {
  const { websiteId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [websiteCreatedAt, setWebsiteCreatedAt] = useState(null);

  const [period, setPeriod] = useState('last12months');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });

  const [metricsData, setMetricsData] = useState({
    impressions: [],
    clicks: [],
    addToCarts: [],
    revenues: [],
    sales: [],
    favourites: []
  });

  // Fetch website details on component mount
  useEffect(() => {
    if (!websiteId || !user?._id) {
      toast.error('Invalid website ID or user not authenticated');
      navigate('/publisher/products');
      return;
    }

    const fetchWebsiteDetails = async () => {
      try {
        const websiteData = await websiteService.getWebsiteById(websiteId, user._id);
        if (!websiteData) throw new Error('Website not found');

        const createdAt = websiteData.createdAt;
        if (createdAt) {
          setWebsiteCreatedAt(new Date(
            createdAt.$date?.$numberLong || 
            createdAt.$date || 
            createdAt
          ));
        }
      } catch (err) {
        toast.error(err.message || 'Failed to load website details');
        navigate('/publisher/products');
      }
    };

    fetchWebsiteDetails();
  }, [websiteId, user?._id, navigate]);

  // Fetch statistics based on selected period
  useEffect(() => {
    if (!websiteId || !user?._id) return;

    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let stats;
        switch (period) {
          case 'last30days':
            stats = await statsService.getLast30DaysStats(user._id, websiteId);
            break;
          case 'monthly':
            const [year, month] = selectedMonth.split('-');
            stats = await statsService.getMonthlyStats(user._id, websiteId, parseInt(year), parseInt(month));
            break;
          case 'last12months':
          default:
            stats = await statsService.getLast12MonthsStats(user._id, websiteId);
            break;
        }

        setMetricsData({
          impressions: stats.impressions || [],
          clicks: stats.clicks || [],
          addToCarts: stats.addToCarts || [],
          revenues: stats.revenues || [],
          sales: stats.sales || [],
          favourites: stats.favourites || []
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch statistics');
        toast.error(err.message || 'Failed to load statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [websiteId, user?._id, period, selectedMonth]);

  // Render the component
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/publisher/products')}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm sm:text-base"
        >
          <FaArrowLeft className="text-sm" />
          Back to Products
        </button>
        
        <div className="flex flex-wrap gap-3 items-center">
          <select 
            className="p-2 border rounded-md text-sm sm:text-base min-w-[120px]"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="last12months">Last 12 Months</option>
            <option value="last30days">Last 30 Days</option>
            <option value="monthly">Monthly</option>
          </select>
          
          {period === 'monthly' && (
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded-md text-sm sm:text-base"
              max={new Date().toISOString().slice(0, 7)}
            />
          )}
        </div>
      </div>

      {error ? (
        <div className="flex flex-col justify-center items-center h-[50vh] text-red-500 text-center p-4">
          <p className="text-lg sm:text-xl font-bold mb-2">Error loading statistics</p>
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {Object.entries(metricsData).map(([key, data]) => (
            <MetricSection 
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              data={data}
              color={METRIC_COLORS[key]}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsiteStatsPage;