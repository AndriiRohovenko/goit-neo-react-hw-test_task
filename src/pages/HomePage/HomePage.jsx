import styles from './HomePage.module.css';
import sharedStyles from '../../components/App/App.module.css';

const HomePage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.pageContent}>
        <h1 className={styles.hpTitle}>Campers of your dreams</h1>
        <p className={styles.hpDescription}>
          You can find everything you want in our catalog
        </p>
        <a href="/catalog">
          <button className={sharedStyles.mainBtn}>View Now</button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
