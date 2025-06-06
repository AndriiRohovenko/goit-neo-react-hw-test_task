import styles from './HomePage.module.css';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { selectLoading, selectError } from '../../redux/campersSlice';
import CampersList from '../../components/CampersList/CampersList';

import { useSelector } from 'react-redux';

const HomePage = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div>
      <h1 className={styles.trandingSectionTitle}>Top Campers</h1>
      {error == true && (
        <ErrorMessage message={'Please try to reload the page!'} />
      )}
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <CampersList itemsCount={5} />
      )}
    </div>
  );
};

export default HomePage;
