import styles from './HomePage.module.css';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { selectLoading, selectError } from '../../redux/campersSlice';
import CampersList from '../../components/CampersList/CampersList';

import { useSelector } from 'react-redux';

const HomePage = () => {
  // const isLoading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  return (
    <div className={styles.background}>
      <div className={styles.pageContent}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <a href="/catalog">
          <button className={styles.viewNowBtn}>View Now</button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
