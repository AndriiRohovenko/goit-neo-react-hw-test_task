import styles from './CamperDetailsPage.module.css';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
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
  const camper = useSelector(selectSingleCamper);
  useEffect(() => {
    dispatch(fetchCamperByIdThunk(camperId));
  }, [dispatch, camperId]);

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
      <ul className={styles.camperGallery}>
        {camper.gallery.map(img => (
          <li>
            <img src={img.thumb} alt={`original image of ${camper.name}`} />
          </li>
        ))}
      </ul>

      <p>{camper.description}</p>

      <Outlet />
    </>
  );
};

export default CamperDetailsPage;
