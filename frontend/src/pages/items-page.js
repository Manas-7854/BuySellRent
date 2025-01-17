import { useState } from 'react';

// import components
import Item from '../components/item';
import Navbar from '../components/navbar';

const ItemsPage = ({itemsData}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  // Filter items based on search query, selected category, and price range
  const filteredItems = itemsData.filter((item) => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesPrice = item.sellingPrice >= minPrice && item.sellingPrice <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="items-page">
        <Navbar></Navbar>
        <div className='content'>
            <div className="filters">
                <h2>Filters</h2>
                <div>
                    <label>Category:</label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="">All</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        {/* Add more categories here */}
                    </select>
                </div>

                <div>
                    <label>Price Range:</label>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
            </div>
        
            <div className="items-list">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="items">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => <Item key={item.id} item={item} />)
                    ) : (
                        <p>No items found</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ItemsPage;
