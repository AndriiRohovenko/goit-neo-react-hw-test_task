import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';

function CampersList({ campers }) {
  const location = useLocation();
  console.log(campers);
  return (
    <>
      <div className={styles.campersListWrapper}>
        <ul>
          {campers.map(camper => (
            <li key={camper.id}>
              <Link to={`/catalog/${camper.id}`} state={location}>
                {camper.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CampersList;
