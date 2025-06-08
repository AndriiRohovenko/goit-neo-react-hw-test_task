import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCampers, selectFilteredCampers } from '../../redux/campersSlice';
import { useState } from 'react';

function CampersList() {
  const campers = useSelector(selectCampers);
  const filteredCampers = useSelector(selectFilteredCampers);
  const location = useLocation();
  const itemsPerPage = 4;

  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  if (campers.total === 0) {
    return <p className={styles.noCampersMessage}>No campers available.</p>;
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  const isLastPage = visibleCount >= filteredCampers.length;

  return (
    <>
      <div className={styles.contentWrapper}>
        <ul className={styles.campersListWrapper}>
          {filteredCampers.slice(0, visibleCount).map(camper => (
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
                  {camper.name} <span>€{camper.price.toFixed(2)}</span>
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
                  {camper.AC ? <p>AC</p> : null}
                  {camper.bathroom ? <p>bathroom</p> : null}
                  {camper.kitchen ? <p>Kitchen</p> : null}
                  {camper.TV ? <p>TV</p> : null}
                  {camper.radio ? <p>Radio</p> : null}
                  {camper.refrigerator ? <p>Refrigerator</p> : null}

                  {camper.microwave ? <p>Microwave</p> : null}
                  {camper.gas ? <p>Gas</p> : null}
                  {camper.water ? <p>Water</p> : null}
                </div>
                <Link to={`/catalog/${camper.id}`} state={location}>
                  <button className={styles.showMoreBtn}>Show More</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {!isLastPage && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default CampersList;
