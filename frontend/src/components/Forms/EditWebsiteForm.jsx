// // components/EditWebsiteForm.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { websiteService } from '../../utils/services';
// import AddWebsiteForm from './AddWebsiteForm';

// const EditWebsiteForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [initialData, setInitialData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchWebsiteData = async () => {
//       try {
//         const data = await websiteService.getWebsiteById(id);
//         setInitialData(data);
//       } catch (error) {
//         toast.error('Error fetching website data');
//         navigate('/websites');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchWebsiteData();
//   }, [id, navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AddWebsiteForm 
//       initialData={initialData}
//       isEditing={true}
//       websiteId={id}
//     />
//   );
// };

// export default EditWebsiteForm;

// components/EditWebsiteForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { websiteService } from '../../utils/services';
import AddWebsiteForm from './AddWebsiteForm';
import Loader from '../Loader';

const EditWebsiteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const data = await websiteService.getWebsiteById(id);
        setInitialData(data);
      } catch (error) {
        toast.error('Error fetching website data');
        navigate('/websites');
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchWebsiteData();
  }, [id, navigate]);

  if (isLoading) {
    return  <Loader />;
  }

  return (
    <AddWebsiteForm 
      initialData={initialData}
      isEditing={true}
      websiteId={id}
    />
  );
};

export default EditWebsiteForm;