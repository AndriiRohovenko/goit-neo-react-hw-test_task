import styles from './MovieDetailsPage.module.css';
import { getMovieDetails } from '../../api/movies';

import { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieDetailsPage = () => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const movies_details_fetching = async () => {
      try {
        setIsLoading(true);

        const data = await getMovieDetails(movieId);
        if (data) {
          setHits(data);
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

    movies_details_fetching();
  }, [movieId]);

  const navigate = useNavigate();

  const location = useLocation();

  const backButtonHandler = () => {
    navigate(location.state ?? '/movies');
  };

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  const movie_year = String(hits.release_date).split('-')[0];
  const movie_popularity = String(hits.popularity).split('.')[0];

  return (
    <>
      <button className={styles.goBackBtn} onClick={backButtonHandler}>
        Go Back
      </button>
      {error == true && (
        <ErrorMessage message={'Please try to reload the page!'} />
      )}
      <div className={styles.movieDetailsWrapper}>
        <div className={styles.moviePosterWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <img
              src={
                hits.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${hits.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
          )}
        </div>
        <div className={styles.movieDescriptionWrapper}>
          <h1>
            {hits.title} ({movie_year})
          </h1>
          <p>User Score: {movie_popularity}%</p>
          <h2>Overview</h2>
          <p> {hits.overview}</p>
          <h3>Genres</h3>
          <>
            {hits.genres ? (
              <p>{hits.genres.map(genre => genre.name + ' ')}</p>
            ) : (
              <Loader />
            )}
          </>
        </div>
      </div>

      <div>
        <p>Additional Information</p>
        <ul>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
