import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCampers, selectFilteredCampers } from '../../redux/campersSlice';

function CampersList() {
  const campers = useSelector(selectCampers);
  const fileredCampers = useSelector(selectFilteredCampers);
  const location = useLocation();

  // Handle empty state
  if (campers.total === 0) {
    return <p className={styles.noCampersMessage}>No campers available.</p>;
  }
  return (
    <>
      <div>
        <ul className={styles.campersListWrapper}>
          {fileredCampers.map(camper => (
            <li className={styles.cardWrapper} key={camper.id}>
              <div className={styles.cardLeftSection}>
                <img
                  className={styles.cardFeaturedImg}
                  src={camper.gallery[0].thumb}
                  alt={`camper featured image:${camper.name}`}
                />
              </div>
              <div className={styles.cardRightSection}>
                <p className={styles.cardName}>
                  {camper.name} <span>€{camper.price}</span>
                </p>
                <div className={styles.cardContentHead}>
                  <p>{`${camper.rating}(${camper.reviews.length} Reviews)`}</p>
                  <p>{camper.location}</p>
                </div>
                <p className={styles.cardDescription}>
                  {camper.description &&
                    camper.description.slice(0, 100) + '...'}
                </p>
                <div className={styles.cardCamperOptions}>
                  <p>{camper.transmission}</p>
                  <p>{camper.engine}</p>
                  <p>{camper.AC && 'AC'}</p>
                  <p>{camper.bathroom && 'Bathroom'}</p>
                  <p>{camper.kitchen && 'Kitchen'}</p>
                  <p>{camper.TV && 'TV'}</p>
                  <p>{camper.radio && 'Radio'}</p>
                  <p>{camper.refrigerator && 'Refrigerator'}</p>
                  <p>{camper.microwave && 'Microwave'}</p>
                  <p>{camper.gas && 'Gas'}</p>
                  <p>{camper.water && 'Water'}</p>
                </div>
                <Link to={`/catalog/${camper.id}`} state={location}>
                  <button>Show More</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CampersList;
