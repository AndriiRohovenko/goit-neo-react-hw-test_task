import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCampers } from '../../redux/campersSlice';

function CampersList() {
  const campers = useSelector(selectCampers);
  console.log(campers);

  const location = useLocation();
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
