import styles from './HomePage.module.css';
import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { selectLoading, selectError } from '../../redux/campersSlice';
import CampersList from '../../components/CampersList/CampersList';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCampersThunk } from '../../redux/campersOps';

const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchCampersThunk());
  }, [dispatch]);

  return (
    <div>
      <h1 className={styles.trandingSectionTitle}>Top Campers</h1>
      {error == true && (
        <ErrorMessage message={'Please try to reload the page!'} />
      )}
      {isLoading ? <Loader isLoading={isLoading} /> : <CampersList />}
    </div>
  );
};

export default HomePage;
