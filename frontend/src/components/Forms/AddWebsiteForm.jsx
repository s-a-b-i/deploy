// // components/AddWebsiteForm.jsx
// import React, { useState } from 'react';
// import BasicInfo from './BasicInfo';
// import CategorySelection from './CategorySelection';
// import PriceSection from './PriceSection';
// import EditorSection from './EditorSection';
// import ExtrasSection from './ExtrasSection';
// import SocialMediaSection from './SocialMediaSection';

// const initialFormData = {
//   language: "",
//   mediaType: "",
//   nofollow: false,
//   category: [],
//   webDomain: "",
//   mediaName: "",
//   price: "",
//   commission: 0,
//   netProfit: 0,
//   description: "",
//   publicationGuidelines: "",
//   publicationDuration: "",
//   averagePublicationTime: "",
//   extra: [],
//   facebook: "",
//   instagram: "",
//   tiktok: "",
//   reddit: "",
//   telegram: "",
//   sensitiveTopics: [],
//   googleNews: false,
// };

// const AddWebsiteForm = () => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [extras, setExtras] = useState([{ select: "", price: "" }]);
//   const [description, setDescription] = useState("");
//   const [publicationGuidelines, setPublicationGuidelines] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name === "price") {
//       const cleanedValue = value.replace(/^0+/, '').replace(/[^\d]/g, '');
//       const numValue = parseInt(cleanedValue) || 0;
//       const commission = numValue * 0.1;
//       const netProfit = numValue * 0.9;
      
//       setFormData(prevData => ({
//         ...prevData,
//         price: cleanedValue,
//         commission,
//         netProfit
//       }));
//     } else {
//       setFormData(prevData => ({
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleCategoryChange = (selectedOptions) => {
//     const categories = selectedOptions ? selectedOptions.map(option => option.value) : [];
//     setFormData({ ...formData, category: categories });
//   };

//   const handleAddExtra = () => {
//     setExtras([...extras, { select: "", price: "" }]);
//   };

//   const handleRemoveExtra = (index) => {
//     if (extras.length > 1) {
//       const newExtras = extras.filter((_, i) => i !== index);
//       setExtras(newExtras);
//     }
//   };

//   const handleExtraChange = (index, field, value) => {
//     const newExtras = extras.map((extra, i) => {
//       if (i === index) {
//         return { ...extra, [field]: value };
//       }
//       return extra;
//     });
//     setExtras(newExtras);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const finalFormData = {
//       ...formData,
//       description,
//       publicationGuidelines,
//       extras,
//     };
//     console.log("Form Data Submitted: ", finalFormData);
//     // Add your form submission logic here
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
//       <h1 className="text-2xl font-bold mb-6">Add Website / Fanpage</h1>
      
//       <p className="text-gray-600 mb-6">
//         {/* Your introduction text */}
//         In this section you can put descriptions for your Media. Rankister is
//         designed as an outside Salesperson for your Company and retains 20% of
//         orders, so please enter the price you normally charge for your sales and
//         do not increase price. Rankister provides the platform and technology to
//         make you sell more. In this you will get more orders monthly. Publishers
//         who charge increased prices from their public prices will NOT be
//         approved! First you need to name your Media, for example if the website
//         is Rankister.com you can put the name Rankister. You can sell
//         publications on the website by putting the domain name in the Website
//         Domain field. If the website also has social channels and to share an
//         article you ask for extra you can add in the Extras field for example:
//         Share on Facebook Page and put the price in the Box next to it.
//         Rankister was also designed for companies or people who do not own a
//         website but have pages or groups on social, for example who work as
//         Influencers and have only Social profiles. In that case the Site Domain
//         Name is left Blank and only the Social part is filled in by putting the
//         link of the page or Group. If you want more information before
//         proceeding, you can contact us from the Contact page.

//       </p>

//       <BasicInfo 
//         formData={formData} 
//         handleInputChange={handleInputChange} 
//       />

//       <CategorySelection 
//         formData={formData}
//         handleCategoryChange={handleCategoryChange} 
//       />

//       <PriceSection 
//         formData={formData} 
//         handleInputChange={handleInputChange} 
//       />

//       <EditorSection 
//         description={description}
//         publicationGuidelines={publicationGuidelines}
//         handleDescriptionChange={setDescription}
//         setPublicationGuidelines={setPublicationGuidelines}
//         formData={formData}
//         handleInputChange={handleInputChange}
//       />

//       <ExtrasSection 
//         extras={extras}
//         handleAddExtra={handleAddExtra}
//         handleRemoveExtra={handleRemoveExtra}
//         handleExtraChange={handleExtraChange}
//         formData={formData}  // Add this
//         handleInputChange={handleInputChange} 
//       />

//       <SocialMediaSection 
//         formData={formData}
//         handleInputChange={handleInputChange}
//       />

//       <button
//         type="submit"
//         className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
//       >
//         Save Product
//       </button>
//     </form>
//   );
// };

// export default AddWebsiteForm;

// components/AddWebsiteForm.jsx
import React, { useState } from 'react';
import BasicInfo from './BasicInfo';
import CategorySelection from './CategorySelection';
import PriceSection from './PriceSection';
import EditorSection from './EditorSection';
import SocialMediaSection from './SocialMediaSection';

const initialFormData = {
  language: "",
  mediaType: "",
  nofollow: false,
  category: [],
  webDomain: "",
  mediaName: "",
  price: "",
  commission: 0,
  netProfit: 0,
  description: "",
  publicationGuidelines: "",
  publicationDuration: "",
  averagePublicationTime: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  reddit: "",
  telegram: "",
  sensitiveTopics: [],
  googleNews: false,
};

const AddWebsiteForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [description, setDescription] = useState("");
  const [publicationGuidelines, setPublicationGuidelines] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "price") {
      const cleanedValue = value.replace(/^0+/, '').replace(/[^\d]/g, '');
      const numValue = parseInt(cleanedValue) || 0;
      const commission = numValue * 0.1;
      const netProfit = numValue * 0.9;

      setFormData(prevData => ({
        ...prevData,
        price: cleanedValue,
        commission,
        netProfit
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    const categories = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({ ...formData, category: categories });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      description,
      publicationGuidelines,
    };
    console.log("Form Data Submitted: ", finalFormData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Add Website / Fanpage</h1>

      <p className="text-gray-600 mb-6">
        {/* Your introduction text */}
        In this section you can put descriptions for your Media. Rankister is
        designed as an outside Salesperson for your Company and retains 20% of
        orders, so please enter the price you normally charge for your sales and
        do not increase price. Rankister provides the platform and technology to
        make you sell more. In this you will get more orders monthly. Publishers
        who charge increased prices from their public prices will NOT be
        approved! First you need to name your Media, for example if the website
        is Rankister.com you can put the name Rankister. You can sell
        publications on the website by putting the domain name in the Website
        Domain field. If the website also has social channels and to share an
        article you ask for extra you can add in the Extras field for example:
        Share on Facebook Page and put the price in the Box next to it.
        Rankister was also designed for companies or people who do not own a
        website but have pages or groups on social, for example who work as
        Influencers and have only Social profiles. In that case the Site Domain
        Name is left Blank and only the Social part is filled in by putting the
        link of the page or Group. If you want more information before
        proceeding, you can contact us from the Contact page.
      </p>

      <BasicInfo 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />

      <CategorySelection 
        formData={formData}
        handleCategoryChange={handleCategoryChange} 
      />

      <PriceSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />

      <EditorSection 
        description={description}
        publicationGuidelines={publicationGuidelines}
        handleDescriptionChange={setDescription}
        setPublicationGuidelines={setPublicationGuidelines}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <SocialMediaSection 
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Product
      </button>
    </form>
  );
};

export default AddWebsiteForm;
