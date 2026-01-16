import MarketplaceCard from "./MarketplaceCard";

const MarketplaceList = ({
  listings,
  currentUser,
  onEdit,
  onDelete,
  view,
}) => {
  if (!listings.length) {
    return <p className="text-gray-500 text-center">No products found</p>;
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-6">
      {listings.map((item) => (
        <MarketplaceCard
          key={item._id}
          item={item}
          currentUser={currentUser}
          onEdit={onEdit}
          onDelete={onDelete}
          view={view}  
        />
      ))}
    </div>
  );
};

export default MarketplaceList;
