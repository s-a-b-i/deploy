import React, { useState, useEffect } from "react";
import Header from "../components/Faq/Header";
import HeroSection from "../components/Faq/HeroSection";
import ViewToggle from "../components/Faq/ViewToggle";
import Card from "../components/Faq/Card";
// import Footer from "../components/Faq/Footer";
import { faqService } from "../utils/services";

const Faq = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [language, setLanguage] = useState("Italian");
  const [categories, setCategories] = useState([]);
  const [faqs, setFaqs] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await faqService.getAllCategoriesPublic();
      setCategories(categoriesData);
      // Fetch FAQs for each category
      categoriesData.forEach(category => {
        fetchFAQsByCategory(category._id);
      });
    } catch (err) {
      setError("Error fetching categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFAQsByCategory = async (categoryId) => {
    try {
      const faqsData = await faqService.getFAQsByCategoryPublic(categoryId);
      setFaqs(prev => ({
        ...prev,
        [categoryId]: faqsData
      }));
    } catch (err) {
      console.error(`Error fetching FAQs for category ${categoryId}:`, err);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await faqService.searchFAQsPublic(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Error searching FAQs:", err);
    }
  };

  // Transform categories and FAQs into card format
  const transformToCards = () => {
    return categories.map(category => ({
      id: category._id,
      title: category.name,
      articles: `${faqs[category._id]?.length || 0} Articles`,
      updated: "Last updated recently",
      language: language,
      questions: faqs[category._id] || []
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header selectedLanguage={language} onLanguageChange={setLanguage} />
      <HeroSection onSearch={handleSearch} />
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      <section className="bg-white py-10">
        <div
          className={`container mx-auto px-6 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {searchResults.length > 0
            ? searchResults.map((faq) => (
                <Card
                  key={faq._id}
                  card={{
                    id: faq._id,
                    title: faq.question,
                    content: faq.answer,
                    language: language
                  }}
                  viewMode={viewMode}
                />
              ))
            : transformToCards().map((card) => (
                <Card key={card.id} card={card} viewMode={viewMode} />
              ))}
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Faq;