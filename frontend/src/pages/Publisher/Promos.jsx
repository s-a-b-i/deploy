import React, { useState } from "react";
import { Link } from "react-router-dom";
import PromoForm from "../../components/Forms/PromoForm.jsx";

const Promos = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <PromoForm onCancel={() => setShowForm(false)} />;
  }

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Manage promotions</h1>
      
      <p className="text-gray-600">
        Here you can enter your temporary promotions for your already approved media on Rankister.
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add new promo
        </button>
      </div>

      <div className="flex gap-2 text-[#3D52A0] mt-auto">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span>•</span>
        <Link to="https://rankister.com" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Promos;