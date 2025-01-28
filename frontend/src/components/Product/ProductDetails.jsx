import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp, FaStar } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { websiteService } from '../../utils/services';

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('action');

  const [expandedSections, setExpandedSections] = useState({
    mediaData: true,
    metrics: true,
    backlinks: true,
    sensitiveTopic: true,
    publicationGuidelines: true,
    availableExtras: true,
    screenshot: true,
    reviews: true
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('ID:', id);
    console.log('User ID:', userId);

    const fetchProductData = async () => {
      try {
        setLoading(true);
        console.log('Fetching product data...');
        const data = await websiteService.viewWebsite(id, userId);
        console.log('API Response:', data);

        const transformedData = {
          mediaData: {
            country: data.language,
            name: data.webDomain,
            addedDate: new Date(data.createdAt).toLocaleDateString(),
            categories: data.category.join(', '),
            googleNews: data.googleNews ? 'Yes' : 'No',
            link: data.webDomain.startsWith('http') ? data.webDomain : `https://${data.webDomain}`,
            onlyNofollow: data.onlyNofollow ? 'Yes' : 'No'
          },
          metrics: {
            domainAuthority: data.domainAuthority || '-',
            ascore: data.ascore || '-',
            zoomAuthority: data.zoomAuthority || '-'
          },
          backlinks: {
            total: data.backlinks?.total || 0,
            dofollow: data.backlinks?.dofollow || 0,
            nofollow: data.backlinks?.nofollow || 0
          },
          sensitiveTopic: {
            gambling: data.sensitiveTopics?.includes('Gambling') || false,
            trading: data.sensitiveTopics?.includes('Trading') || false,
            adult: data.sensitiveTopics?.includes('Adult') || false,
            cbd: data.sensitiveTopics?.includes('CBD') || false
          },
          publicationGuidelines: {
            duration: data.publicationDuration || 'Permanent',
            avgPublicationTime: data.publicationTime || 'Max 24h',
            guidelines: data.guidelines || 'No specific guidelines provided'
          },
          availableExtras: data.extras || {},
          screenshot: {
            url: data.screenshot || '/placeholder-screenshot.jpg'
          },
          reviews: {
            total: data.reviews?.length || 0,
            averageRating: data.averageRating || 0
          },
          price: data.price || 0
        };

        setProductData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError(err.message || 'Failed to fetch product details');
        setLoading(false);
      }
    };

    if (id && userId) {
      fetchProductData();
    } else {
      console.error('ID or User ID is missing');
      setError('ID or User ID is missing');
      setLoading(false);
    }
  }, [id, userId]);

  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

  useEffect(() => {
    console.log('Product data:', productData);
  }, [productData]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section }) => (
    <div 
      className="flex justify-between items-center bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-3 cursor-pointer rounded-t-lg"
      onClick={() => toggleSection(section)}
    >
      <h2 className="font-semibold">{title}</h2>
      {expandedSections[section] ? <FaAngleUp className="transition-transform duration-300" /> : <FaAngleDown className="transition-transform duration-300" />}
    </div>
  );

  const TransitionSection = ({ isExpanded, children }) => (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded 
          ? 'max-h-[1000px] opacity-100' 
          : 'max-h-0 opacity-0'
      }`}
    >
      {children}
    </div>
  );

  const Section = ({ title, section, children }) => (
    <div className="border rounded-lg shadow-sm mb-4">
      <SectionHeader title={title} section={section} />
      <TransitionSection isExpanded={expandedSections[section]}>
        {children}
      </TransitionSection>
    </div>
  );

  const DataRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b last:border-b-0">
      <span className="text-gray-700"><strong>{label}</strong></span>
      <span className="text-gray-900">
        {React.isValidElement(value) ? value : String(value ?? '')}
      </span>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!productData) {
    return <div className="text-center">No product data available.</div>;
  }

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button 
            onClick={() => navigate('/advertiser/catalogue')}
            className="text-blue-600 hover:underline font-bold text-lg"
          >
            ← Back to catalog
          </button>
          <div className="mt-2 text-xl font-bold flex items-center">
            {productData.mediaData.name}
            <FaStar className="text-yellow-400 ml-2" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold">{productData.price.toFixed(2)} €</span>
          <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 font-bold">
            + Add to cart
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Section title="Media data" section="mediaData">
            <div className="p-4 space-y-2">
              <DataRow label="Country" value={productData.mediaData.country} />
              <DataRow label="Name" value={productData.mediaData.name} />
              <DataRow label="Added date" value={productData.mediaData.addedDate} />
              <DataRow label="Categories" value={productData.mediaData.categories} />
              <DataRow label="Google News" value={productData.mediaData.googleNews} />
              <DataRow label="Link" value={
                <a href={productData.mediaData.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {productData.mediaData.link}
                </a>
              } />
              <DataRow label="Only nofollow" value={productData.mediaData.onlyNofollow} />
            </div>
          </Section>

          <Section title="Metrics" section="metrics">
            <div className="p-4 space-y-2">
              <DataRow label="Domain authority" value={productData.metrics.domainAuthority} />
              <DataRow label="Ascore" value={productData.metrics.ascore} />
              <DataRow label="Zoom authority" value={productData.metrics.zoomAuthority} />
            </div>
          </Section>

          <Section title="Backlinks" section="backlinks">
            <div className="p-4 space-y-2">
              <DataRow label="Total" value={productData.backlinks.total.toLocaleString()} />
              <DataRow label="Dofollow" value={productData.backlinks.dofollow.toLocaleString()} />
              <DataRow label="Nofollow" value={productData.backlinks.nofollow.toLocaleString()} />
            </div>
          </Section>

          <Section title="Sensitive topics" section="sensitiveTopic">
            <div className="p-4 space-y-2">
              {Object.entries(productData.sensitiveTopic).map(([key, value]) => (
                <DataRow 
                  key={key} 
                  label={key.charAt(0).toUpperCase() + key.slice(1)} 
                  value={value ? '✓' : '✗'}
                />
              ))}
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Publication guidelines" section="publicationGuidelines">
            <div className="p-4 space-y-2">
              <DataRow label="Publication duration" value={productData.publicationGuidelines.duration} />
              <DataRow label="Average publication time" value={productData.publicationGuidelines.avgPublicationTime} />
              <div className="mt-4 text-gray-700">
                {productData.publicationGuidelines.guidelines}
              </div>
            </div>
          </Section>

          <Section title="Available extras" section="availableExtras">
            <div className="p-4">
              {productData.availableExtras?.notification ? (
                <div className="flex justify-between items-center">
                  <span>{productData.availableExtras.notification.name}</span>
                  <span>{productData.availableExtras.notification.price}</span>
                </div>
              ) : (
                <div className="text-gray-500">No extras available</div>
              )}
            </div>
          </Section>

          <Section title="Screenshot" section="screenshot">
            <div className="p-4">
              <img 
                src={productData.screenshot.url} 
                alt="Website screenshot" 
                className="w-full rounded-lg shadow-sm"
              />
            </div>
          </Section>

          <Section title="Reviews" section="reviews">
            <div className="p-4 space-y-2">
              <DataRow label="Total reviews" value={productData.reviews.total} />
              <div className="flex items-center gap-2">
                <span>Average rating:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index}
                      className={`transition-colors duration-300 ${index < productData.reviews.averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;