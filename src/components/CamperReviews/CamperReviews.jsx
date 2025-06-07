import styles from './CamperReviews.module.css';

// import { getMovieDetailsReviews } from '../../api/movies';

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Loader from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';

function CamperReviews() {
  return (
    <>
      <div className={styles.camperReviewsWrapper}>
        <p>Here will be Camper Reviews Soon ..</p>
        {/* {error == true && (
          <ErrorMessage message={"We don't have any reviews for this movie"} />
        )}
        <ul>
          {isLoading ? (
            <Loader />
          ) : (
            hits.map(author => (
              <li className={styles.reviewItemWrapper} key={author.id}>
                <b>
                  <p>{author.author}</p>
                </b>
                <p>
                  {author.content.length > 200 ? (
                    <>
                      {author.content.slice(0, 200)}...
                      <a href={author.url} className={styles.readMoreLink}>
                        Read more
                      </a>
                    </>
                  ) : (
                    author.content
                  )}
                </p>
              </li>
            ))
          )}
        </ul> */}
      </div>
    </>
  );
}

export default CamperReviews;
