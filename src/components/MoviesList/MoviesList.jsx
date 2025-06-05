import styles from './MoviesList.module.css';
import { Link, useLocation } from 'react-router-dom';

function MoviesList({ movies }) {
  const location = useLocation();
  return (
    <>
      <div className={styles.moviesListWrapper}>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MoviesList;
