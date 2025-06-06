import styles from './HomePage.module.css';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getCampers } from '../../api/campers';
import CampersList from '../../components/CampersList/CampersList';

const HomePage = () => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const campers_items_fetching = async () => {
      try {
        setIsLoading(true);

        const { items } = await getCampers();

        if (items) {
          setHits(items);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    campers_items_fetching();
  }, []);
  console.log(hits);

  return (
    <div>
      <h1 className={styles.trandingSectionTitle}>Top Campers</h1>
      {error == true && (
        <ErrorMessage message={'Please try to reload the page!'} />
      )}
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <CampersList campers={hits} />
      )}
    </div>
  );
};

export default HomePage;
