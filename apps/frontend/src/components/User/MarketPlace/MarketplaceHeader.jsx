import { Plus } from "lucide-react";

const MarketplaceHeader = ({ title, subtitle, sellLabel, onSellClick }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="text-left">
        <h1 className="text-latte-peach text-4xl mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      

      <button
        onClick={onSellClick}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
      >
        <Plus className="w-4 h-4" />
        {sellLabel}
      </button>
    </div>
  );
};

export default MarketplaceHeader;
