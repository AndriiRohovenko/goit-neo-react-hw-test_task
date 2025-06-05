import styles from './Loader.module.css';

import { ClipLoader } from 'react-spinners';

function Loader({ isLoading }) {
  return (
    <>
      <div className={styles.loaderWrapepr}>
        <ClipLoader
          color="green"
          loading={isLoading}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}

export default Loader;
