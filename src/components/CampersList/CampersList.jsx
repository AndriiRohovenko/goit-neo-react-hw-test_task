import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCampers } from '../../redux/campersSlice';

function CampersList() {
  const campers = useSelector(selectCampers);

  const location = useLocation();

  // Handle empty state
  if (campers.total === 0) {
    return <p className={styles.noCampersMessage}>No campers available.</p>;
  }
  return (
    <>
      <div className={styles.campersListWrapper}>
        <ul>
          {campers.items.map(camper => (
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
