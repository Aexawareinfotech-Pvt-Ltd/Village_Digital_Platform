import { useState } from "react";
import AdminCropAdvisory from "./AdminCropAdvisory";
import AdminGovernmentSchemes from "./AdminGovernmentSchemes";
import AdminSoilTesting from "./AdminSoilTesting";
import AdminIrrigation from "./AdminIrrigation";

export default function Agricultures() {
  const [activeTab, setActiveTab] = useState("mandi");

  // Mandi Price Filters
  const [selectedState, setSelectedState] = useState("Gujarat");
  const [selectedDistrict, setSelectedDistrict] = useState("Rajkot");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8 bg-gray-50 min-h-screen ">
      {/* Tabs */}
      <div className="flex gap-19 mb-6 mt-0 flex-wrap">
        <button
          onClick={() => setActiveTab("weather")}
          className={`px-4 py-2 rounded-2xl font-medium transition-all ${
            activeTab === "weather"
              ? "bg-latte-peach text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
           Weather Updates
        </button>
        <button
          onClick={() => setActiveTab("crop")}
          className={`px-4 py-2 rounded-2xl font-medium transition-all ${
            activeTab === "crop"
              ? "bg-latte-peach text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
           Crop Advisory
        </button>
        <button
          onClick={() => setActiveTab("schemes")}
          className={`px-4 py-2 rounded-2xl font-medium transition-all ${
            activeTab === "schemes"
              ? "bg-latte-peach text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
           Government Schemes
        </button>
        <button
          onClick={() => setActiveTab("soil")}
          className={`px-4 py-2 rounded-2xl font-medium transition-all ${
            activeTab === "soil"
              ? "bg-latte-peach text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
           Soil Testing
        </button>
        <button
          onClick={() => setActiveTab("irrigation")}
          className={`px-4 py-2 rounded-2xl font-medium transition-all ${
            activeTab === "irrigation"
              ? "bg-latte-peach text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
           Irrigation Guide
        </button>
      </div>

      {activeTab === "weather" && <WeatherTab />}

      {activeTab === "crop" && <AdminCropAdvisory />}

      {activeTab === "schemes" && <AdminGovernmentSchemes />}

      {activeTab === "soil" && <AdminSoilTesting />}

      {activeTab === "irrigation" && <AdminIrrigation />}

    </div>
  );
}