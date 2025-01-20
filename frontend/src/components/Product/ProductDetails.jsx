import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ productId = 'li5V2G3JzawIfZVAhQpp' }) => {
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
  const [productData, setProductData] = useState({
    mediaData: {
      country: 'Italy',
      name: 'NewsCucina.it',
      addedDate: '29/05/2023',
      categories: 'Food & Beverages',
      googleNews: 'Yes',
      link: 'https://newscucina.it/',
      onlyNofollow: 'No'
    },
    metrics: {
      domainAuthority: 16,
      ascore: 8,
      zoomAuthority: 15
    },
    backlinks: {
      total: 4849,
      dofollow: 4783,
      nofollow: 66
    },
    sensitiveTopic: {
      gambling: false,
      trading: false,
      adult: false,
      cbd: false
    },
    publicationGuidelines: {
      duration: 'Permanent',
      avgPublicationTime: 'Max 24h',
      guidelines: 'Fino a due link DOFOLLOW ad articolo. Non ci sono limiti sulla lunghezza del testo.'
    },
    availableExtras: {
      notification: {
        name: 'Notifica 50k utenti',
        price: '€30.00'
      }
    },
    screenshot: {
      url: '/screenshots/newscucina.jpg'
    },
    reviews: {
      total: 6,
      averageRating: 4
    },
    price: 50.00
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section }) => (
    <div 
      className="flex justify-between items-center bg-foundations-primary text-white p-3 cursor-pointer"
      onClick={() => toggleSection(section)}
    >
      <h2 className="font-semibold">{title}</h2>
      {expandedSections[section] ? <FaAngleUp /> : <FaAngleDown />}
    </div>
  );

  const TransitionSection = ({ isExpanded, children }) => (
    <div 
      className={`overflow-hidden transition-all duration-300 ${
        isExpanded 
          ? 'max-h-[1000px] opacity-100' 
          : 'max-h-0 opacity-0'
      }`}
    >
      {children}
    </div>
  );

  const Section = ({ title, section, children }) => (
    <div className="border rounded-lg shadow-sm">
      <SectionHeader title={title} section={section} />
      <TransitionSection isExpanded={expandedSections[section]}>
        {children}
      </TransitionSection>
    </div>
  );

  const DataRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b last:border-b-0">
      <span className="text-gray-700">{label}</span>
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

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/advertiser/catalogue')}
          className="text-blue-600 hover:underline"
        >
          ← Back to catalog
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold">{productData.price.toFixed(2)} €</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
              <div className="flex justify-between items-center">
                <span>{productData.availableExtras.notification.name}</span>
                <span>{productData.availableExtras.notification.price}</span>
              </div>
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
                      className={index < productData.reviews.averageRating ? 'text-yellow-400' : 'text-gray-300'}
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