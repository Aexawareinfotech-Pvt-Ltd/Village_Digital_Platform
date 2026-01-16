const Stat = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-orange-500">{icon}</div>
      </div>

      <div className="text-right">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl">{value}</h2>
      </div>
    </div>
  );
};

export default Stat;
