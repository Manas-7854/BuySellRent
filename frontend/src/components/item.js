// Component for displaying an item in the list of items

import {Link} from 'react-router-dom';

const Item = ({ item, userId }) => (
    <div className="item">
      <h3>{item.description}</h3>
      
      <p>Original Price: ${item.originalPrice}</p>
      <p>Selling Price: ${item.sellingPrice}</p>
      <p>Category: {item.category}</p>
      <Link to={`/item/${item._id}/${userId}`}>View Details</Link>
    </div>
  );

export default Item;
  