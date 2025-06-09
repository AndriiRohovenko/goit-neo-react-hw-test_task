import styles from './CampersList.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredCampers } from '../../redux/campersSlice';
import { useState } from 'react';
import {
  addFavorite,
  removeFavoriteByID,
  selectFavorites,
} from '../../redux/favoritesSlice';

function CampersList() {
  const dispatch = useDispatch();
  const filteredCampers = useSelector(selectFilteredCampers);
  const favoritesItems = useSelector(selectFavorites);
  const location = useLocation();
  const itemsPerPage = 4;

  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  if (filteredCampers.total === 0) {
    return <p className={styles.noCampersMessage}>No campers available.</p>;
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  const isLastPage = visibleCount >= filteredCampers.length;

  const toggleFavorite = camper => {
    const isFavorite = favoritesItems.some(item => item.id === camper.id);
    if (isFavorite) {
      dispatch(removeFavoriteByID(camper.id));
    } else {
      dispatch(addFavorite(camper));
    }
  };
  return (
    <>
      <div className={styles.contentWrapper}>
        <ul className={styles.campersListWrapper}>
          {filteredCampers.slice(0, visibleCount).map(camper => {
            const isFavorite = favoritesItems.some(
              item => item.id === camper.id
            );
            return (
              <li className={styles.cardWrapper} key={camper.id}>
                <div className={styles.cardLeftSection}>
                  <img
                    className={styles.cardFeaturedImg}
                    src={camper.gallery[0].thumb}
                    alt={`camper featured image:${camper.name}`}
                  />
                </div>
                <div className={styles.cardRightSection}>
                  <div className={styles.cardRightTop}>
                    <p className={styles.cardName}>{camper.name}</p>
                    <div className={styles.cardRightTopRight}>
                      <p>€{camper.price.toFixed(2)}</p>
                      <button
                        className={`${styles.favoriteBtn} ${
                          isFavorite ? styles.activeFavorite : ''
                        }`}
                        onClick={() => toggleFavorite(camper)}
                      >
                        <img
                          src="/src/assets/icons/favoriteIcon.svg"
                          alt="Favorite"
                          className={styles.favoriteIcon}
                        />
                      </button>
                    </div>
                  </div>
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
            );
          })}
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
