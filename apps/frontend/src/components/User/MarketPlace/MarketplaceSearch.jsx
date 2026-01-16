const MarketplaceSearch = ({ placeholder, value, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 mb-4">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

export default MarketplaceSearch;
