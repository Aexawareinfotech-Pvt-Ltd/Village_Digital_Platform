import { useState } from "react";
const cropAdvisories = [
  {
    id: "1",
    cropName: "Cotton",
    season: "kharif",
    sowingTime: "June to July is best for cotton sowing",
    seedGuidance: "Use certified cotton seeds for better yield",
    fertilizerAdvice: "Apply urea after 20 days. Avoid overuse",
    irrigationAdvice: "Irrigate every 7 days. Stop irrigation if rain is expected",
    pestControl: "Use recommended pesticide for bollworm",
    weatherPrecaution: "Avoid sowing during heavy monsoon period",
    harvesting: "Harvest after 120 days. Avoid rainy days",
    dosAndDonts:
      "• Do use drip irrigation\n• Don't overwater\n• Do spray pesticide in evening",
  },
  {
    id: "2",
    cropName: "Wheat",
    season: "rabi",
    sowingTime: "November to December is ideal for wheat sowing",
    seedGuidance: "Use disease-resistant wheat varieties",
    fertilizerAdvice:
      "Use fertilizer after 20 days. Apply NPK in recommended ratio",
    irrigationAdvice:
      "Irrigate at critical growth stages - Crown root, tillering, flowering",
    pestControl: "Monitor for aphids and apply neem-based pesticides",
    weatherPrecaution: "Protect from frost during early growth stage",
    harvesting: "Harvest when grain moisture is 20-25%. Avoid delay",
    dosAndDonts:
      "• Do maintain proper spacing\n• Don't spray before rain\n• Do ensure proper drainage",
  },
  {
    id: "3",
    cropName: "Rice",
    season: "kharif",
    sowingTime: "June to July, with onset of monsoon",
    seedGuidance:
      "Use high-yielding certified varieties suitable for your region",
    fertilizerAdvice:
      "Apply urea in 3 splits - basal, tillering, and panicle initiation",
    irrigationAdvice:
      "Maintain 2-3 inches water level. Drain before harvesting",
    pestControl:
      "Watch for stem borer and leaf folder. Use IPM methods",
    weatherPrecaution:
      "Ensure good drainage during heavy rainfall",
    harvesting:
      "Harvest when 80% grains turn golden yellow",
    dosAndDonts:
      "• Do transplant at 21-25 days\n• Don't let field dry completely\n• Do practice SRI method for better yield",
  },
];

export default function CropAdvisoryTab() {
  const [expandedSections, setExpandedSections] = useState({});

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="space-y-6">
      {cropAdvisories.map((crop) => (
        <div
          key={crop.id}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#fe640b] to-[#f97316] text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              {/* <Sprout className="w-8 h-8" /> */}
              <div>
                <h2 className="text-white text-2xl font-bold text-left ">
                  {crop.cropName} Crop Advisory
                </h2>
                <p className="text-white/90 text-left mt-1">
                  {crop.season.charAt(0).toUpperCase() +
                    crop.season.slice(1)}{" "}
                  Season
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left rounded-b-xl bg-[#fff7f0]">
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
              const sectionKey = `${crop.id}-${key}`;
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
                    {isExpanded || value.length <= 100
                      ? value
                      : truncateText(value)}
                  </p>

                  {value.length > 100 && (
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="text-[#fe640b] text-sm font-semibold mt-2 hover:underline"
                    >
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
