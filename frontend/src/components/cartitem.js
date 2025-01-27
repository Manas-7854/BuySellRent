// Component for showing Orders

import {Link} from 'react-router-dom';

const CartItem = ({ order, userId }) => (
    <div className="item">
      <h3>{order.item_description}</h3>
      
      <p>Original Price: ${order.item_originalPrice}</p>
      <p>Selling Price: ${order.item_sellingPrice}</p>
      <p>Category: {order.item_category}</p>
    </div>
  );

export default CartItem;
  