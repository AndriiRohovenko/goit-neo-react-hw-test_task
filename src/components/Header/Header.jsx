import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <div className={styles.navigationWrapper}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to={'/catalog'}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Catalog
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
