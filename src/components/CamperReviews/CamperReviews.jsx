import styles from './CamperReviews.module.css';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectError,
  selectLoading,
  selectSingleCamper,
} from '../../redux/campersSlice';

function CamperReviews() {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { camperId } = useParams();
  const camper = useSelector(state => selectSingleCamper(state, camperId));
  return (
    <>
      <div className={styles.camperReviewsWrapper}>
        {error == true && (
          <ErrorMessage message={"We don't have any reviews for this movie"} />
        )}
        <ul className={styles.reviewItemsWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            camper.reviews.map(review => (
              <li className={styles.reviewItemWrapper} key={review.comment}>
                <b>
                  <p>{review.reviewer_name}</p>
                </b>
                <p className={styles.commentText}>{review.comment}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default CamperReviews;
