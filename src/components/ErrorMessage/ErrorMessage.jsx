import styles from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  return (
    <>
      <div className={styles.errorMsgWrapper}>
        <p>No results found. {message} </p>
      </div>
    </>
  );
}

export default ErrorMessage;
