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
                <div className={styles.revieverItemTop}>
                  <div className={styles.reviewerLogo}>
                    <p className={styles.reviewerLogoIcon}>
                      {review.reviewer_name[0]}
                    </p>
                  </div>
                  <div className={styles.reviewerDetails}>
                    <b>
                      <p>{review.reviewer_name}</p>
                    </b>
                    <StarRating rating={review.reviewer_rating} />
                  </div>
                </div>
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

const StarRating = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#FFC107' : '#E0E0E0' }}>
          ★
        </span>
      ))}
    </div>
  );
};
