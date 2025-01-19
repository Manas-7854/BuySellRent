import {Link} from 'react-router-dom';

const Item = ({ item, userId }) => (
    <div className="item">
      <img src={item.image} alt={item.description} />
      <h3>{item.description}</h3>
      <p>Original Price: ${item.originalPrice}</p>
      <p>Selling Price: ${item.sellingPrice}</p>
      <p>Category: {item.category}</p>
      <Link to={`/item/${item.id}/${userId}`}>View Details</Link>
    </div>
  );

export default Item;
  