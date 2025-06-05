import styles from './MovieReviews.module.css';

import { getMovieDetailsReviews } from '../../api/movies';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MovieReviews() {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const movie_review_data_fetching = async () => {
      try {
        setIsLoading(true);

        const data = await getMovieDetailsReviews(movieId);
        if (data.results.length > 0) {
          setHits(data.results);
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

    movie_review_data_fetching();
  }, [movieId]);

  return (
    <>
      <div className={styles.movieCastWrapper}>
        {error == true && (
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
        </ul>
      </div>
    </>
  );
}

export default MovieReviews;
