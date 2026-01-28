import { useState, useEffect } from "react";
import { Loader2, AlertCircle , Eye } from "lucide-react";

const API_BASE_URL = 'http://localhost:3000/api/agriculture/crop-advisory';

export default function CropAdvisoryTab() {
  const [expandedSections, setExpandedSections] = useState({});
  const [cropAdvisories, setCropAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCropAdvisories();
  }, []);

  const fetchCropAdvisories = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        setCropAdvisories(data.data || []);
      } else {
        setError(data.message || 'Failed to load advisories');
      }
    } catch (err) {
      console.error('Error fetching crop advisories:', err);
      setError('Failed to load crop advisories');
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading crop advisories...</p>
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

  if (cropAdvisories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6c6f85]">No crop advisories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cropAdvisories.map((crop) => (
        <div
          key={crop._id}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#fe640b]/5 to-transparent text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <div>
                 <h2 className="text-[#fe640b] font-semibold text-left text-xl mb-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                    {crop.cropName} Crop Advisory
                  </h2>
                <p className="text-[#fe640b] text-left mt-1">
                  {crop.season.charAt(0).toUpperCase() +
                    crop.season.slice(1)}{" "}
                  Season
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left rounded-b-xl bg-gradient-to-br from-[#fe640b]/5 to-transparent]">
            {[
              ["", "Best Sowing Time", "sowing", crop.sowingTime],
              ["", "Seed Selection", "seed", crop.seedGuidance],
              ["", "Fertilizer", "fertilizer", crop.fertilizerAdvice],
              ["", "Irrigation", "irrigation", crop.irrigationAdvice],
              ["", "Pest Control", "pest", crop.pestControl],
              ["", "Weather Precaution", "weather", crop.weatherPrecaution],
              ["", "Harvesting", "harvest", crop.harvesting],
              ["", "Do's & Don'ts", "dos", crop.dosAndDonts],
            ].map(([icon, title, key, value]) => {
              const sectionKey = `${crop._id}-${key}`;
              const isExpanded = expandedSections[sectionKey];

              return (
                <div
                  key={sectionKey}
                  className="bg-[#fff7f0] rounded-2xl p-4 border border-[#fe640b]/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{icon}</span>
                    <h3 className="text-[#fe640b] font-semibold">{title}</h3>
                  </div>

                  <p className="text-[#4c4f69] whitespace-pre-line break-words">
                    {isExpanded || !value || value.length <= 100
                      ? value
                      : truncateText(value)}
                  </p>

                  {value && value.length > 100 && (
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="flex items-center gap-2 text-[#fe640b] text-sm font-semibold mt-2 hover:underline"
                    >
                      <Eye className="w-4 h-4 text-[#fe640b]" />
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}