import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

const API_BASE_URL = 'http://localhost:3000/api/agriculture/irrigation';

export default function Irrigation() {
  const [irrigationSchedules, setIrrigationSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIrrigationSchedules();
  }, []);

  const fetchIrrigationSchedules = async () => {
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
        setIrrigationSchedules(data.data || []);
      } else {
        setError(data.message || 'Failed to load irrigation schedules');
      }
    } catch (err) {
      console.error('Error fetching irrigation schedules:', err);
      setError('Failed to load irrigation schedules');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading irrigation schedules...</p>
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

  if (irrigationSchedules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6c6f85]">No irrigation schedules available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-[#fe640b] font-bold text-2xl mb-6 text-left">
         Irrigation Schedule & Water Guide
      </h2>

      <div className="space-y-4">
        {irrigationSchedules.map((schedule) => (
          <div
            key={schedule._id}
            className="border-2 border-[#fe640b]/20 rounded-2xl p-6 bg-gradient-to-r from-[#fe640b]/5 to-transparent"
          >
            <h3 className="text-[#fe640b] font-semibold text-lg mb-4 text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
              {schedule.cropName}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#fe640b]/30 rounded-2xl p-4">
                <p className="text-[#6c6f85] text-sm mb-2 text-left">
                   Irrigation Timing
                </p>
                <p className="text-[#4c4f69] font-semibold text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                  {schedule.timing}
                </p>
              </div>
              <div className="bg-white border border-[#fe640b]/30 rounded-2xl p-4">
                <p className="text-[#6c6f85] text-sm mb-2 text-left">
                   Water Quantity
                </p>
                <p className="text-[#4c4f69] font-semibold text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                  {schedule.waterQuantity}
                </p>
              </div>
              <div className="bg-[#fff7f0] border border-[#fe640b]/30 rounded-2xl p-4">
                <p className="text-[#6c6f85] text-sm mb-2 text-left">⚠️ Important</p>
                <p className="text-[#fe640b] font-semibold text-left" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                  {schedule.specialAlert}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}