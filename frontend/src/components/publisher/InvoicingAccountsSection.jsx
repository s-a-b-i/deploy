// // InvoicingAccountsSection.jsx
// import React from 'react';

// const InvoicingAccountsSection = ({
//   isOpen,
//   toggleSection,
//   invoicingAccounts,
//   handleEditInvoicingAccount,
//   handleRemoveInvoicingAccount,
//   setShowEditForm,
//   setIsEditingOrAdding,
//   setEditingAccount
// }) => {
//   return (
//     <>
//       <div 
//         className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4 rounded-lg cursor-pointer flex justify-between items-center mt-6"
//         onClick={toggleSection}
//       >
//         <h2 className="font-medium">
//           {isOpen ? '▼' : '►'} Invoicing Accounts
//         </h2>
//         <span>{isOpen ? 'Close' : 'Open'}</span>
//       </div>

//       {isOpen && (
//         <div className="space-y-8 p-6">
//           {invoicingAccounts.length === 0 ? (
//             <div className="flex items-center gap-8 border-t pt-6">
//               <div className="w-1/4"></div>
//               <div className="w-3/4 text-gray-500 text-center">
//                 No invoicing accounts found
//               </div>
//             </div>
//           ) : (
//             invoicingAccounts.map((account, index) => (
//               <div
//                 key={account._id}
//                 className={`flex items-center gap-8 ${index !== 0 ? 'border-t pt-6' : ''}`}
//               >
//                 <div className="w-1/4">
//                   <span
//                     className={`px-2 py-1 text-xs font-semibold rounded-lg ${
//                       account.accountType === 'business'
//                         ? 'bg-blue-100 text-blue-700'
//                         : 'bg-green-100 text-green-700'
//                     }`}
//                   >
//                     {account.accountType === 'business' ? 'Business' : 'Personal'}
//                   </span>
//                 </div>
//                 <div className="w-3/4 flex justify-between items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
//                   <div>
//                     <span className="text-lg font-bold text-gray-700">
//                       {account.accountType === 'business'
//                         ? account.organizationName
//                         : `${account.firstName} ${account.lastName}`}
//                     </span>
//                     <div className="text-sm text-gray-500 mt-1">{account.address}</div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       className="text-yellow-500 hover:text-yellow-600"
//                       onClick={() => handleEditInvoicingAccount(account)}
//                       title="Edit"
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       type="button"
//                       className="text-red-500 hover:text-red-600"
//                       onClick={() => handleRemoveInvoicingAccount(account._id)}
//                       title="Remove"
//                     >
//                       ✖️
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}

//           <div className="flex items-center gap-8 border-t pt-6">
//             <div className="w-1/4"></div>
//             <div className="w-3/4">
//               <button
//                 type="button"
//                 className="flex items-center gap-2 text-white bg-foundations-primary px-4 py-2 rounded-lg"
//                 onClick={() => {
//                   setShowEditForm(true);
//                   setIsEditingOrAdding(true);
//                   setEditingAccount(null);
//                 }}
//               >
//                 <span>+</span> Add Invoicing Account
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default InvoicingAccountsSection;
// InvoicingAccountsSection.jsx
import React from 'react';

const InvoicingAccountsSection = ({
  isOpen,
  toggleSection,
  invoicingAccounts,
  handleEditInvoicingAccount,
  handleRemoveInvoicingAccount,
  setShowEditForm,
  setIsEditingOrAdding,
  setEditingAccount
}) => {
  return (
    <>
      <div 
        className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4 rounded-lg cursor-pointer flex justify-between items-center mt-6"
        onClick={toggleSection}
      >
        <h2 className="font-medium">
          {isOpen ? '▼' : '►'} Invoicing Accounts
        </h2>
        <span>{isOpen ? 'Close' : 'Open'}</span>
      </div>

      {isOpen && (
        <div className="space-y-8 p-6">
          {invoicingAccounts.length === 0 ? (
            <div className="flex justify-center items-center border-t pt-6">
              <div className="text-gray-500 text-center">
                No invoicing accounts found
              </div>
            </div>
          ) : (
            invoicingAccounts.map((account, index) => (
              <div
                key={account._id}
                className={`flex items-center gap-8 ${index !== 0 ? 'border-t pt-6' : ''}`}
              >
                <div className="w-1/4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      account.accountType === 'business'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {account.accountType === 'business' ? 'Business' : 'Personal'}
                  </span>
                </div>
                <div className="w-3/4 flex justify-between items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                  <div>
                    <span className="text-lg font-bold text-gray-700">
                      {account.accountType === 'business'
                        ? account.organizationName
                        : `${account.firstName} ${account.lastName}`}
                    </span>
                    <div className="text-sm text-gray-500 mt-1">{account.address}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-yellow-500 hover:text-yellow-600"
                      onClick={() => handleEditInvoicingAccount(account)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveInvoicingAccount(account._id)}
                      title="Remove"
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="flex items-center gap-8 border-t pt-6 justify-end">
  <button
    type="button"
    className="flex items-center gap-2 text-white bg-foundations-primary px-4 py-2 rounded-lg"
    onClick={() => {
      setShowEditForm(true);
      setIsEditingOrAdding(true);
      setEditingAccount(null);
    }}
  >
    <span>+</span> Add Invoicing Account
  </button>
</div>

        </div>
      )}
    </>
  );
};

export default InvoicingAccountsSection;