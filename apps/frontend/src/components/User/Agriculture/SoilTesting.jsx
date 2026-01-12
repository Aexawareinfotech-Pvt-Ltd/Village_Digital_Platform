import { useState, useEffect } from "react";
import { Building2, Phone, MapPin, Loader2, AlertCircle } from "lucide-react";

const API_BASE_URL = 'http://localhost:3000/api/agriculture/soil-testing';

export default function SoilTesting() {
  const [soilCenters, setSoilCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSoilCenters();
  }, []);

  const fetchSoilCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("tokens");
      const response = await fetch(`${API_BASE_URL}/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        setSoilCenters(data.data || []);
      } else {
        setError(data.message || 'Failed to load soil testing centers');
      }
    } catch (err) {
      console.error('Error fetching soil testing centers:', err);
      setError('Failed to load soil testing centers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading soil testing centers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (soilCenters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6c6f85]">No soil testing centers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Info Banner */}
      <div className="bg-gradient-to-br from-[#fe640b]/5 to-transparent border-l-4 border-[#fe640b] p-4 rounded-lg mb-6">
        <h3 className="text-[#fe640b] font-semibold mb-2 text-left">Why Soil Testing?</h3>
        <ul className="text-[#4c4f69] space-y-1 text-sm text-left">
          <li>✔ Better crop yield</li>
          <li>✔ Correct fertilizer usage</li>
          <li>✔ Save money on unnecessary inputs</li>
          <li>✔ Improve soil health</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {soilCenters.map((center) => (
          <div
            key={center._id}
            className="border-2 border-[#fe640b]/20 rounded-2xl p-5 hover:shadow-md transition-shadow bg-[#fffbf7]"
          >
            <div className="flex-1">
              <h3 className="text-[#fe640b] font-semibold mb-3 text-left">{center.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#6c6f85] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4c4f69] text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {center.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6c6f85]" />
                  <a href={`tel:${center.phone}`} className="text-[#1e66f5] hover:underline">
                    {center.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-[#6c6f85] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4c4f69] text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {center.testsOffered}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}