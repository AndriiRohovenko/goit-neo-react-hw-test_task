import styles from './CamperDetailsPage.module.css';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/campersSlice';
import { fetchCamperByIdThunk } from '../../redux/campersOps';
import { selectSingleCamper } from '../../redux/campersSlice';

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

  console.log(camper);

  const navigate = useNavigate();
  const location = useLocation();

  const backButtonHandler = () => {
    navigate(location.state ?? '/catalog');
  };

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
      <button className={styles.goBackBtn} onClick={backButtonHandler}>
        Go Back
      </button>
      <h1>{camper.name}</h1>

      <p>{`${camper.rating}(${camper.reviews.length} Reviews)`}</p>
      <p>{camper.location}</p>
      <p>€{camper.price}</p>
      <div className={styles.camperGallery}>
        {camper.gallery.map(img => (
          <img
            key={img.thumb}
            src={img.thumb}
            alt={`original image of ${camper.name}`}
          />
        ))}
      </div>

      <p>{camper.description}</p>

      <div>
        <p>Additional Information</p>
        <ul>
          <li>
            <NavLink to="features" state={location.state}>
              Features
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default CamperDetailsPage;
