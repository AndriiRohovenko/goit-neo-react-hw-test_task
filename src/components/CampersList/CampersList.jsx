import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCampers, selectFilteredCampers } from '../../redux/campersSlice';

function CampersList({ itemsCount = -1 }) {
  const campers = useSelector(selectCampers);
  const fileredCampers = useSelector(selectFilteredCampers);
  const location = useLocation();

  // Handle empty state
  if (campers.total === 0) {
    return <p className={styles.noCampersMessage}>No campers available.</p>;
  }
  return (
    <>
      <div className={styles.campersListWrapper}>
        <ul>
          {fileredCampers
            .map(camper => (
              <li key={camper.id}>
                <Link to={`/catalog/${camper.id}`} state={location}>
                  {camper.name}
                </Link>
              </li>
            ))
            .slice(0, itemsCount)}
        </ul>
      </div>
    </>
  );
}

export default CampersList;
