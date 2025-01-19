import React, { useState } from 'react'
import { FaEye, FaShoppingCart, FaStar } from 'react-icons/fa'

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(50000)
  const [da, setDa] = useState([0, 100])
  const [ascore, setAscore] = useState([0, 100])
  const [favorites, setFavorites] = useState(new Set()) 
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState({
    country: true,
    name: true,
    price: true,
    type: true,
    category: true,
    da: true,
    ascore: true,
    za: true,
    gambling: true,
    adult: true,
    cbd: true,
    trading: true,
    gnews: true,
    bl: true,
    edu: true,
    gov: true,
    date: true
  })

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const toggleColumn = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName.toLowerCase()]: !prev[columnName.toLowerCase()]
    }))
  }

  const dummyData = [
    {
      id: 1,
      country: 'IT',
      name: 'NewsCucina.it',
      price: 50.00,
      originalPrice: null,
      type: 'Blog',
      category: 'Food & Beverages',
      da: 16,
      ascore: 8,
      za: 15,
      gnews: true,
      bl: 4849,
      badge: 'AD',
      edu: true,
      gov: false,
      date: '2024-01-16'
    },
    {
      id: 2,
      country: 'IT',
      name: 'GiornataMondiale.it',
      price: 80.00,
      originalPrice: null,
      type: 'Blog',
      category: 'News & Media',
      da: 25,
      ascore: 30,
      za: 40,
      gnews: false,
      bl: 17918,
      badge: 'AD',
      categoryBadge: '+29',
      edu: false,
      gov: true,
      date: '2024-01-15'
    }
  ]

  const ColumnModal = () => {
    if (!showColumnModal) return null

    const columnList = [
      ['Country', 'Name'],
      ['Price', 'Type'],
      ['Category', 'DA'],
      ['Ascore', 'ZA'],
      ['Gambling', 'CBD'],
      ['Adult', 'Trading'],
      ['GNews', 'BL'],
      ['EDU', 'GOV'],
      ['Date']
    ]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-bold mb-4">Change view columns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ... Keep existing modal content ... */}
{columnList.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((column) => (
                  <div key={column} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={column}
                      checked={visibleColumns[column.toLowerCase()]}
                      onChange={() => toggleColumn(column)}
                      className="w-4 h-4 accent-foundations-primary"
                    />
                    <label htmlFor={column} className="text-gray-700">
                      {column}
                    </label>
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowColumnModal(false)}
            className="w-full sm:w-auto bg-foundations-primary text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>


    )
  }

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Catalog</h1>
      
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Search by Domain name / Social..."
            className="flex-1 p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2 sm:gap-4">
            <button className="flex-1 sm:flex-none bg-foundations-primary text-white px-4 md:px-6 py-2 rounded">
              SUBMIT
            </button>
            <button className="flex-1 sm:flex-none border bg-foundations-secondary px-4 md:px-6 py-2 rounded">
              RESET
            </button>
          </div>
        </div>

        {/* Price and Range Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div>
            <label className="block text-sm mb-2">Minimum price</label>
            <input
              type="number"
              className="p-2 border rounded w-full"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Maximum price</label>
            <input
              type="number"
              className="p-2 border rounded w-full"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-2">DA: 0 - 100</label>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="100"
                  value={da[1]}
                  onChange={(e) => setDa([da[0], parseInt(e.target.value)])}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Ascore: 0 - 100</label>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="100"
                  value={ascore[1]}
                  onChange={(e) => setAscore([ascore[0], parseInt(e.target.value)])}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select className="p-2 border rounded">
            <option>Media type</option>
            {/* ... Keep existing options ... */}
          </select>
          <select className="p-2 border rounded">
            <option>Category</option>
            {/* ... Keep existing options ... */}
          </select>
          <select className="p-2 border rounded">
            <option>Country</option>
            {/* ... Keep existing options ... */}
          </select>
          <select className="p-2 border rounded">
            <option>Google News</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Accepts Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="font-medium">ACCEPTS:</span>
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4">
            {['Gambling', 'CBD', 'Adult', 'Trading'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded"
            onClick={() => setShowColumnModal(true)}
          >
            CHANGE COLUMNS
          </button>
        </div>

        {/* Table with horizontal scroll */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {/* ... Keep existing table headers ... */}
<th className="p-3 text-left">Actions</th>
                {visibleColumns.country && <th className="p-3 text-left">Country</th>}
                {visibleColumns.name && <th className="p-3 text-left">Name</th>}
                {visibleColumns.price && <th className="p-3 text-left">Price</th>}
                {visibleColumns.type && <th className="p-3 text-left">Type</th>}
                {visibleColumns.category && <th className="p-3 text-left">Category</th>}
                {visibleColumns.da && <th className="p-3 text-left">DA</th>}
                {visibleColumns.ascore && <th className="p-3 text-left">Ascore</th>}
                {visibleColumns.za && <th className="p-3 text-left">ZA</th>}
                {visibleColumns.gnews && <th className="p-3 text-left">GNews</th>}
                {visibleColumns.bl && <th className="p-3 text-left">BL</th>}
                {visibleColumns.edu && <th className="p-3 text-left">EDU</th>}
                {visibleColumns.gov && <th className="p-3 text-left">GOV</th>}
                {visibleColumns.date && <th className="p-3 text-left">Date</th>}
              </tr>
                  
                </thead>
                <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-2 bg-foundations-primary rounded-full text-white">
                        <FaEye />
                      </button>
                      <button className="p-2 bg-foundations-primary rounded-full text-white">
                        <FaShoppingCart />
                      </button>
                      <button 
                        className={`p-2 rounded-full ${favorites.has(item.id) ? 'bg-foundations-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        <FaStar />
                      </button>
                    </div>
                  </td>
                  {visibleColumns.country && (
                    <td className="p-3">
                      <img src={`/flags/${item.country}.png`} alt={item.country} className="w-6" />
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {item.name}
                        {item.badge && (
                          <span className="bg-foundations-secondary text-white text-xs px-1 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  {visibleColumns.price && (
                    <td className="p-3">
                      {item.originalPrice && (
                        <span className="line-through text-gray-400 mr-2">
                          € {item.originalPrice.toFixed(2)}
                        </span>
                      )}
                      € {item.price.toFixed(2)}
                    </td>
                  )}
                  {visibleColumns.type && <td className="p-3">{item.type}</td>}
                  {visibleColumns.category && (
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {item.category}
                        {item.categoryBadge && (
                          <span className="bg-foundations-secondary text-white text-xs px-1 rounded">
                            {item.categoryBadge}
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  {visibleColumns.da && <td className="p-3">{item.da}</td>}
                  {visibleColumns.ascore && <td className="p-3">{item.ascore}</td>}
                  {visibleColumns.za && <td className="p-3">{item.za}</td>}
                  {visibleColumns.gnews && (
                    <td className="p-3">
                      {item.gnews ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                  )}
                  {visibleColumns.bl && <td className="p-3">{item.bl}</td>}
                  {visibleColumns.edu && (
                    <td className="p-3">
                      {item.edu ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                  )}
                  {visibleColumns.gov && (
                    <td className="p-3">
                      {item.gov ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                  )}
                  {visibleColumns.date && <td className="p-3">{item.date}</td>}
                </tr>
              ))}
            </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ColumnModal />
    </div>
  )
}
  


export default Catalog
