import {Link} from 'react-router-dom';


const CartItem = ({ order, userId }) => (
    <div className="item">
      <h3>{order.item_description}</h3>
      
      <p>Original Price: ${order.item_originalPrice}</p>
      <p>Selling Price: ${order.item_sellingPrice}</p>
      <p>Category: {order.item_category}</p>
      <Link to={`/item/${order.item_id}/${userId}`}>View Details</Link>
    </div>
  );

export default CartItem;
  