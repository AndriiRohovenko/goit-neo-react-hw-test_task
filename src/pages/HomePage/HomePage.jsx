import styles from './HomePage.module.css';

const HomePage = () => {
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
