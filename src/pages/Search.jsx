import Header from "../components/Header";
import ItemCard from "../components/ItemCard";

const Search = ({ items }) => {
  return (
    <div className="pb-16 min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Temukan Barang</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
