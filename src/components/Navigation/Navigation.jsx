import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
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
          to={'/movies'}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Movies
        </NavLink>
      </div>
    </>
  );
}

export default Navigation;
