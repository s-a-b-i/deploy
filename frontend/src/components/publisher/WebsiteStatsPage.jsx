import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { FaChartLine, FaTimes } from 'react-icons/fa';
import { statsService } from '../../utils/services';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WebsiteStatsPage = () => {
  const { websiteId } = useParams();
  const user = useAuthStore((state) => state.user);
  const [statsData, setStatsData] = useState({
    monthly: null,
    last30Days: null,
    last12Months: null
  });
  const [activeTab, setActiveTab] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, [websiteId, user?._id]);

  const fetchStats = async () => {
    if (!websiteId || !user?._id) return;

    setIsLoading(true);
    try {
      const currentDate = new Date();
      const [monthlyStats, last30DaysStats, last12MonthsStats] = await Promise.all([
        statsService.getMonthlyStats(user._id, websiteId, currentDate.getFullYear(), currentDate.getMonth() + 1),
        statsService.getLast30DaysStats(user._id, websiteId),
        statsService.getLast12MonthsStats(user._id, websiteId)
      ]);

      setStatsData({ monthly: monthlyStats, last30Days: last30DaysStats, last12Months: last12MonthsStats });
    } catch (error) {
      toast.error('Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  };

  const getChartData = (data) => {
    if (!data) return null;

    const metrics = ['impressions', 'clicks', 'revenues', 'sales'];
    const labels = data[metrics[0]]?.map((_, index) => `Day ${index + 1}`);

    return {
      labels,
      datasets: metrics.map((metric, index) => ({
        label: metric.charAt(0).toUpperCase() + metric.slice(1),
        data: data[metric]?.map(item => item.value) || [],
        borderColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'][index],
        tension: 0.1
      }))
    };
  };

  if (isLoading) return <div className="flex justify-center mt-10"><Loader /></div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <FaChartLine className="mr-2" /> Website Statistics
        </h1>

        <div className="flex mb-6 space-x-2">
          {['monthly', 'last30Days', 'last12Months'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="h-[400px]">
          {statsData[activeTab] && (
            <Line
              data={getChartData(statsData[activeTab])}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false }
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteStatsPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
// import { statsService } from '../../utils/services';
// import { useAuthStore } from '../../store/authStore';

// const WebsiteStatsPage = () => {
//  const { websiteId } = useParams();
//  const { user } = useAuthStore();
//  const [expandedSections, setExpandedSections] = useState({
//    impressions: true,
//    clicks: true,
//    addToCart: true, 
//    revenues: true,
//    conversions: true,
//    pageViews: true
//  });
//  const [loading, setLoading] = useState(true);
//  const [statsData, setStatsData] = useState(null);

//  useEffect(() => {
//    fetchStats();
//  }, [websiteId, user?._id]);

//  const fetchStats = async () => {
//    if (!websiteId || !user?._id) return;
   
//    try {
//      setLoading(true);
//      const response = await statsService.getWebsiteStats(websiteId, user._id);
//      setStatsData(response);
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }
//  };

//  const toggleSection = (section) => {
//    setExpandedSections(prev => ({
//      ...prev,
//      [section]: !prev[section]
//    }));
//  };

//  const SectionHeader = ({ title, section }) => (
//    <div 
//      className="flex justify-between items-center bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-3 cursor-pointer rounded-t-lg"
//      onClick={() => toggleSection(section)}
//    >
//      <h2 className="font-semibold">{title}</h2>
//      {expandedSections[section] ? <FaAngleUp /> : <FaAngleDown />}
//    </div>
//  );

//  const TransitionSection = ({ isExpanded, children }) => (
//    <div className={`overflow-hidden transition-all duration-300 ${
//      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//    }`}>
//      {children}
//    </div>
//  );

//  const getMetricColor = (metric) => {
//    const colors = {
//      impressions: '#4F46E5',
//      clicks: '#10B981',
//      addToCart: '#F59E0B', 
//      revenues: '#EF4444',
//      conversions: '#8B5CF6',
//      pageViews: '#EC4899'
//    };
//    return colors[metric];
//  };

//  const Section = ({ title, section, data }) => (
//    <div className="border rounded-lg shadow-sm mb-4">
//      <SectionHeader title={title} section={section} />
//      <TransitionSection isExpanded={expandedSections[section]}>
//        <div className="p-4 h-[300px]">
//          <Line
//            data={{
//              labels: ['2025-02-01', '2025-02-02'],
//              datasets: [{
//                label: title,
//                data: [0, 0],
//                borderColor: getMetricColor(section),
//                backgroundColor: `${getMetricColor(section)}33`,
//                fill: true,
//                tension: 0.1
//              }]
//            }}
//            options={{
//              responsive: true,
//              maintainAspectRatio: false,
//              plugins: {
//                legend: { display: false },
//                tooltip: {
//                  mode: 'index',
//                  intersect: false,
//                }
//              },
//              scales: {
//                y: {
//                  beginAtZero: true,
//                  min: -1,
//                  max: 1,
//                  grid: {
//                    color: 'rgba(0, 0, 0, 0.1)',
//                  }
//                },
//                x: {
//                  grid: {
//                    display: false
//                  }
//                }
//              },
//              interaction: {
//                mode: 'nearest',
//                axis: 'x',
//                intersect: false
//              }
//            }}
//          />
//        </div>
//      </TransitionSection>
//    </div>
//  );

//  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//  return (
//    <div className="space-y-6 px-4 md:px-8 lg:px-12">
//      <h1 className="text-2xl font-bold mb-6">Website Statistics</h1>
     
//      <div className="grid md:grid-cols-2 gap-4">
//        <Section 
//          title="Impressions"
//          section="impressions" 
//          data={statsData?.impressions}
//        />
//        <Section
//          title="Clicks"
//          section="clicks"
//          data={statsData?.clicks}
//        />
//        <Section
//          title="Adds to Cart"
//          section="addToCart"
//          data={statsData?.addToCart}
//        />
//        <Section
//          title="Revenues"
//          section="revenues"
//          data={statsData?.revenues}
//        />
//        <Section
//          title="Conversions"
//          section="conversions"
//          data={statsData?.conversions}
//        />
//        <Section
//          title="Page Views"
//          section="pageViews"
//          data={statsData?.pageViews}
//        />
//      </div>
//    </div>
//  );
// };

// export default WebsiteStatsPage;