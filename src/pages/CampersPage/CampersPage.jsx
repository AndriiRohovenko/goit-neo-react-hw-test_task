import './CampersPage.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getMoviesByQuery } from '../../api/movies';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const CampersPage = () => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  useEffect(() => {
    const tranding_movies_fetching = async () => {
      try {
        if (!searchQuery.trim()) {
          setHits([]);
          setError(false);
          return;
        }

        setIsLoading(true);

        const data = await getMoviesByQuery(searchQuery, 1);

        if (data.results.length > 0) {
          setHits(data.results);
          setError(false);
        } else {
          setHits([]);
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    tranding_movies_fetching();
  }, [searchQuery]);

  const handleSearch = searchValue => {
    if (!searchValue.trim()) {
      setSearchParams({});
      return;
    }
    searchParams.set('search', searchValue);
    setSearchParams(searchParams);
  };
  return (
    <div>
      <p>CampersPage</p>
      <SearchBar onSearch={handleSearch} value={searchQuery} />
      {error && <ErrorMessage message={'Try Different Query!'} />}
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <MoviesList movies={hits} />
      )}
    </div>
  );
};

export default CampersPage;
