import styles from './CamperDetailsPage.module.css';
import { useEffect } from 'react';
import { useParams, useLocation, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/campersSlice';
import { fetchCamperByIdThunk } from '../../redux/campersOps';
import { selectSingleCamper } from '../../redux/campersSlice';

import BookCamperForm from '../../components/BookCamperForm/BookCamperForm';

const CamperDetailsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { camperId } = useParams();
  const camper = useSelector(state => selectSingleCamper(state, camperId));
  useEffect(() => {
    if (!camper || camper.id !== camperId) {
      dispatch(fetchCamperByIdThunk(camperId));
    }
  }, [dispatch, camper, camperId]);

  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage message="Failed to load camper details. Please try again." />
    );
  }

  if (!camper) {
    return <p>Camper not found or still loading...</p>;
  }

  return (
    <>
      <div className={styles.pageContent}>
        <div className={styles.contentHead}>
          <h1>{camper.name}</h1>
          <div className={styles.reviewsWrapper}>
            <img
              className={styles.ratingIcon}
              src="/icons/ratingIcon.svg"
              alt="rating icon"
            />
            <u>
              <p>{`${camper.rating}(${camper.reviews.length} Reviews)`}</p>
            </u>
            <div className={styles.locationWrapper}>
              <img src="/icons/locationIcon.svg" alt="location icon" />
              <p>{camper.location}</p>
            </div>
          </div>
          <b>
            <p className={styles.camperPrice}>€{camper.price.toFixed(2)}</p>
          </b>
        </div>
        <div className={styles.camperGallery}>
          {camper.gallery.map(img => (
            <img
              key={img.thumb}
              src={img.thumb}
              alt={`thumb image of ${camper.name}`}
            />
          ))}
        </div>
        <p className={styles.camperDescription}>{camper.description}</p>
        <div className={styles.camperAdditionalDetails}>
          <div className={styles.additionalDetailsTop}>
            <ul className={styles.additionalDetailsTopNav}>
              <li className={styles.navLinkWrapper}>
                <NavLink
                  to="features"
                  state={location.state}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                >
                  Features
                </NavLink>
              </li>
              <li className={styles.navLinkWrapper}>
                <NavLink
                  to="reviews"
                  state={location.state}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.additionalDetailsBottom}>
            <Outlet />
            <div className={styles.bookingForm}>
              <BookCamperForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CamperDetailsPage;
