import { Search, Filter, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_MANDI_API_KEY;
const API_URL = import.meta.env.VITE_MANDI_BASE_URL;

export default function MandiPrices({ selectedState, setSelectedState, selectedDistrict, setSelectedDistrict, searchQuery, setSearchQuery }) {
  const [mandiPriceData, setMandiPriceData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch districts when state changes
  useEffect(() => {
    if (selectedState) {
      fetchDistricts();
    }
  }, [selectedState]);

  // Fetch mandi prices when district changes
  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetchMandiPrices();
    }
  }, [selectedState, selectedDistrict]);

  const fetchDistricts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_URL}?api-key=${API_KEY}&format=json&offset=0&filters[state]=${selectedState}&limit=1000`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.records) {
        const uniqueDistricts = Array.from(
          new Set(data.records.map((item) => item.district))
        ).sort();
        
        setDistricts(uniqueDistricts);
        
        if (uniqueDistricts.length > 0 && !uniqueDistricts.includes(selectedDistrict)) {
          setSelectedDistrict(uniqueDistricts[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching districts:", err);
      setError("Failed to fetch districts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMandiPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_URL}?api-key=${API_KEY}&format=json&offset=0&filters[state]=${selectedState}&filters[district]=${selectedDistrict}&limit=100`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.records) {
        setMandiPriceData(data.records);
      } else {
        setMandiPriceData([]);
      }
    } catch (err) {
      console.error("Error fetching mandi prices:", err);
      setError("Failed to fetch market prices. Please try again.");
      setMandiPriceData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMandiPrices = mandiPriceData.filter((item) => {
    const matchSearch =
      searchQuery === "" ||
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase());

    return matchSearch;
  });

  const statesData = ["Gujarat"];

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-latte-peach" />
          <h2 className="text-xl font-bold text-latte-peach">Filter Market Prices</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict("");
              }}
              disabled={loading}
              className="w-full px-4 py-2 border-2 border-latte-peach rounded-2xl focus:outline-none text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {statesData.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select District/City
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={loading || districts.length === 0}
              className="w-full px-4 py-2 border-2 border-latte-peach rounded-2xl focus:outline-none text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {districts.length === 0 ? (
                <option value="">Select a state first</option>
              ) : (
                districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Search Commodity
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by commodity or market..."
                disabled={loading}
                className="w-full px-4 py-2 pl-10 border-2 border-latte-peach rounded-2xl focus:outline-none text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-latte-peach animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading market data...</p>
          </div>
        ) : filteredMandiPrices.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No market data available for the selected location.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-latte-peach text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">State</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">District</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Market</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Commodity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Variety</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Min Price (₹)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Max Price (₹)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Modal Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {filteredMandiPrices.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 hover:bg-orange-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-700 text-sm">{item.state}</td>
                    <td className="px-4 py-3 text-gray-700 text-sm">{item.district}</td>
                    <td className="px-4 py-3 text-gray-700 text-sm font-medium">{item.market}</td>
                    <td className="px-4 py-3 text-orange-600 text-sm font-semibold">{item.commodity}</td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {item.variety}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {item.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{item.arrival_date}</td>
                    <td className="px-4 py-3 text-right text-red-600 text-sm font-semibold">
                      ₹{item.min_price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600 text-sm font-semibold">
                      ₹{item.max_price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-blue-600 text-sm font-bold">
                      ₹{item.modal_price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}