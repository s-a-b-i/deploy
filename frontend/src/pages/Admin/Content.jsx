import React, { useState, useEffect } from "react";
import {
 EyeIcon as EyeIconOutline,
 CheckCircleIcon as CheckCircleIconOutline,
 XCircleIcon as XCircleIconOutline,
 FlagIcon as FlagIconOutline,
 TrashIcon as TrashIconOutline,
 MailIcon as MailIconOutline,
} from "@heroicons/react/outline";

import {
 CheckCircleIcon as CheckCircleIconSolid,
 XCircleIcon as XCircleIconSolid,
 FlagIcon as FlagIconSolid,
} from "@heroicons/react/solid";

const Content = () => {
 const [pendingContent, setPendingContent] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [statusFilter, setStatusFilter] = useState("");
 const [loadingActionId, setLoadingActionId] = useState(null);

 useEffect(() => {
   setTimeout(() => {
     setPendingContent([
       {
         id: 1,
         mediaType: "image",
         title: "Gaming Laptop XPS 15",
         status: "pending",
         dateSubmitted: "2025-01-28",
       },
       {
         id: 2,
         mediaType: "video", 
         title: "Summer Sale Campaign",
         status: "flagged",
         dateSubmitted: "2025-01-29",
       },
     ]);
     setLoading(false);
   }, 2000);
 }, []);

 const handleAction = async (id, newStatus) => {
   setLoadingActionId(id);
   try {
     setPendingContent((prevContent) =>
       prevContent.map((item) =>
         item.id === id ? { ...item, status: newStatus } : item
       )
     );
   } finally {
     setLoadingActionId(null);
   }
 };

 const filteredContent = pendingContent.filter(
   (item) =>
     item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
     (statusFilter ? item.status === statusFilter : true)
 );

 return (
   <div className="min-h-screen p-6 bg-gray-50">
     <div className="max-w-7xl mx-auto">
       <div className="mb-8">
         <h1 className="text-3xl font-bold text-gray-900">
           Content Management
         </h1>
         <p className="mt-2 text-gray-600">Manage and moderate site content</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         {loading ? (
           [1, 2, 3, 4].map((index) => (
             <div
               key={index}
               className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
             >
               <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
               <div className="h-10 bg-gray-300 rounded w-1/2"></div>
             </div>
           ))
         ) : (
           <>
             <StatCard
               title="Pending Review"
               value={
                 pendingContent.filter((item) => item.status === "pending")
                   .length
               }
               status="pending"
             />
             <StatCard
               title="Flagged Content"
               value={
                 pendingContent.filter((item) => item.status === "flagged")
                   .length
               }
               status="flagged"
             />
             <StatCard
               title="Approved Content"
               value={
                 pendingContent.filter((item) => item.status === "approved")
                   .length
               }
               status="approved"
             />
             <StatCard
               title="Rejected Content"
               value={
                 pendingContent.filter((item) => item.status === "rejected")
                   .length
               }
               status="rejected"
             />
           </>
         )}
       </div>

       <div className="mb-4 flex space-x-4">
         <input
           type="text"
           placeholder="Search"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-1/2 p-2 border rounded-lg"
         />
         <select
           value={statusFilter}
           onChange={(e) => setStatusFilter(e.target.value)}
           className="p-2 border rounded-lg"
         >
           <option value="">All Statuses</option>
           <option value="pending">Pending</option>
           <option value="flagged">Flagged</option>
           <option value="approved">Approved</option>
           <option value="rejected">Rejected</option>
         </select>
       </div>

       <div className="bg-white border rounded-xl shadow-sm">
         <div>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
               <thead>
                 <tr>
                   {[
                     "View",
                     "Title",
                     "Media Type",
                     "Status",
                     "Date",
                     "Moderation Actions",
                     "Management Actions",
                   ].map((heading) => (
                     <th
                       key={heading}
                       className="px-6 py-3 text-left text-xs font-medium  bg-gray-50 text-gray-500 uppercase tracking-wider"
                     >
                       {heading}
                     </th>
                   ))}
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                 {loading
                   ? [1, 2].map((index) => (
                       <tr key={index} className="animate-pulse">
                         {Array(7)
                           .fill()
                           .map((_, i) => (
                             <td key={i} className="px-6 py-4">
                               <div className="h-6 bg-gray-300 rounded w-full"></div>
                             </td>
                           ))}
                       </tr>
                     ))
                   : filteredContent.map((item) => (
                       <tr key={item.id}>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <EyeIconOutline className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                           {item.title}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                           {item.mediaType}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <span
                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                               item.status === "pending"
                                 ? "bg-yellow-100 text-yellow-800"
                                 : item.status === "flagged"
                                 ? "bg-red-100 text-red-800"
                                 : item.status === "approved"
                                 ? "bg-green-100 text-green-800"
                                 : "bg-gray-100 text-gray-800"
                             }`}
                           >
                             {item.status}
                           </span>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {item.dateSubmitted}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           <div className="flex justify-center space-x-2">
                             {loadingActionId === item.id ? (
                               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                             ) : (
                               <>
                                 <CheckCircleIconOutline
                                   onClick={() => handleAction(item.id, "approved")}
                                   className="h-5 w-5 text-green-600 hover:text-green-900 cursor-pointer"
                                   title="Approve"
                                 />
                                 <XCircleIconOutline
                                   onClick={() => handleAction(item.id, "rejected")}
                                   className="h-5 w-5 text-red-600 hover:text-red-900 cursor-pointer"
                                   title="Reject"
                                 />
                                 <FlagIconOutline
                                   onClick={() => handleAction(item.id, "flagged")}
                                   className="h-5 w-5 text-yellow-600 hover:text-yellow-900 cursor-pointer"
                                   title="Flag"
                                 />
                               </>
                             )}
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           <div className="flex justify-center space-x-2">
                             <MailIconOutline
                               onClick={() => {}}
                               className="h-5 w-5 text-blue-600 hover:text-blue-900 cursor-pointer"
                               title="Send Message"
                             />
                             <TrashIconOutline
                               onClick={() => {
                                 setPendingContent((prevContent) =>
                                   prevContent.filter(
                                     (content) => content.id !== item.id
                                   )
                                 );
                               }}
                               className="h-5 w-5 text-red-600 hover:text-gray-900 cursor-pointer"
                               title="Delete"
                             />
                           </div>
                         </td>
                       </tr>
                     ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

const StatCard = ({ title, value, status }) => {
 const getIcon = () => {
   switch (status) {
     case "pending":
       return "⏳";
     case "flagged":
       return <FlagIconSolid className="h-6 w-6 text-yellow-500" />;
     case "approved":
       return <CheckCircleIconSolid className="h-6 w-6 text-green-500" />;
     case "rejected":
       return <XCircleIconSolid className="h-6 w-6 text-red-500" />;
     default:
       return "📊";
   }
 };

 return (
   <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
     <div className="flex items-center justify-between mb-4">
       <span className="text-2xl">{getIcon()}</span>
     </div>
     <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
     <p className="text-2xl font-bold text-gray-900">{value}</p>
   </div>
 );
};

export default Content;