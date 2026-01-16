const MarketplaceType = ({ selectedType, setSelectedType }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6 bg-white rounded-xl shadow-sm border border-orange-100 p-2">
      {["sell", "rent"].map((type) => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={`px-4 py-3 rounded-xl capitalize ${
            selectedType === type
              ? "bg-orange-500 text-white"
              : "bg-gray-100"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
export default MarketplaceType;
