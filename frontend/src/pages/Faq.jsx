import React, { useState } from "react";
import Header from "../components/Faq/Header";
import HeroSection from "../components/Faq/HeroSection";
import ViewToggle from "../components/Faq/ViewToggle";
import Card from "../components/Faq/Card";
import Footer from "../components/Faq/Footer";

const Faq = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [language, setLanguage] = useState("Italian"); // Default language

  // Sample data for cards
  const cards = [
    // Italian Cards
    {
      id: 1,
      title: "Come usare Rankister?",
      articles: "5 Articoli",
      updated: "Ultimo aggiornamento 2 giorni fa",
      language: "Italian",
    },
    {
      id: 2,
      title: "Come contattare il supporto?",
      articles: "7 Articoli",
      updated: "Ultimo aggiornamento 3 giorni fa",
      language: "Italian",
    },
    {
      id: 3,
      title: "Come resettare la password?",
      articles: "2 Articoli",
      updated: "Ultimo aggiornamento 5 giorni fa",
      language: "Italian",
    },
    // English Cards
    {
      id: 4,
      title: "How to use Rankister?",
      articles: "5 Articles",
      updated: "Last updated 2 days ago",
      language: "English",
    },
    {
      id: 5,
      title: "How to contact support?",
      articles: "7 Articles",
      updated: "Last updated 3 days ago",
      language: "English",
    },
    {
      id: 6,
      title: "How to reset your password?",
      articles: "2 Articles",
      updated: "Last updated 5 days ago",
      language: "English",
    },
  ];

  // Filter cards based on the selected language
  const filteredCards = cards.filter((card) => card.language === language);

  return (
    <div className="min-h-screen bg-white">
      <Header selectedLanguage={language} onLanguageChange={setLanguage} />
      <HeroSection />
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      <section className="bg-white py-10">
        <div
          className={`container mx-auto px-6 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredCards.map((card) => (
            <Card key={card.id} card={card} viewMode={viewMode} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Faq;