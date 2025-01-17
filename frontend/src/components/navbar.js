
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/items" style={styles.link}>
            Items
          </Link>
        </li>
        <li>
          <Link to="/mycart" style={styles.link}>
            Cart
          </Link>
        </li>
        <li>
          <Link to="/orders" style={styles.link}>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/delivery" style={styles.link}>
            Delivery
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
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
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
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
  },
};

export default Navbar;
