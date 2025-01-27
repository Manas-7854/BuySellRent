import { Link } from 'react-router-dom';

const Navbar = ({ userId }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>
      <ul style={styles.navLinks}>
        <li>
          <Link to={`/chat/${userId}`} style={styles.link}>
            Support
          </Link>
        </li>
        <li>
          <Link to={`/add-item/${userId}`} style={styles.link}>
            Add Item
          </Link>
        </li>
        <li>
          <Link to={`/home/${userId}`} style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to={`/items/${userId}`} style={styles.link}>
            Items
          </Link>
        </li>
        <li>
          <Link to={`/mycart/${userId}`} style={styles.link}>
            Cart
          </Link>
        </li>
        <li>
          <Link to={`/orders/${userId}`} style={styles.link}>
            Orders
          </Link>
        </li>
        <li>
          <Link to={`/delivery/${userId}`} style={styles.link}>
            Delivery
          </Link>
        </li>
        <li>
          <Link to={`/logout`} style={styles.link}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#155E95', /* Deep Blue */
    color: '#FFF6B3', /* Pale Yellow */
    padding: '10px 20px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#FFF6B3', /* Pale Yellow */
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#FFF6B3', /* Pale Yellow */
    fontSize: '1rem',
    fontWeight: '500',
  },
  linkHover: {
    color: '#6A80B9', /* Light Blue */
  },
};

export default Navbar;
