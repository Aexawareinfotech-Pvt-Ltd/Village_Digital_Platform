import { useState } from "react";
import MandiPrices from "./MandiPrices";
import WeatherTab from "./Weather";
import CropAdvisory from "./CropAdvisory";
import GovernmentSchemes from "./GovernmentSchemes";
import SoilTesting from "./SoilTesting";
import Irrigation from "./Irrigation";


export default function Agricultures() {
  const [activeTab, setActiveTab] = useState("mandi");

  // Mandi Price Filters
  const [selectedState, setSelectedState] = useState("Gujarat");
  const [selectedDistrict, setSelectedDistrict] = useState("Rajkot");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-6xl mx-auto mt-12">
      {/* HEADER */}
      <div className="mb-6 text-left">
        <h1 className="text-latte-peach mb-2 text-4xl">Agriculture Services</h1>
        <p className="text-gray-600">Access farming resources, crop guidance, and agricultural updates</p>
      </div>
      {/* Tabs */}
      <div className="flex gap-22 mb-6 mt-8 flex-wrap">
        <button
          onClick={() => setActiveTab("mandi")}
          className={`px-4 py-2 rounded-2xl font-medium transition-all ${
            activeTab === "mandi"
              ? "bg-latte-peach text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
           Mandi Prices
        </button>
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

      {/* Tab Content */}
      {activeTab === "mandi" && (
        <MandiPrices
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {activeTab === "weather" && <WeatherTab />}

      {activeTab === "crop" && <CropAdvisory />}

      {activeTab === "schemes" && <GovernmentSchemes />}

      {activeTab === "soil" && <SoilTesting />}

      {activeTab === "irrigation" && <Irrigation />}

      {activeTab === "resources" && <ResourcesTab />}
    </div>
  );
}