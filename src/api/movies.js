import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzBmOGYzMGQ1OTgxMGY4ODA2NjE2MDdhNzBlMmI3NSIsIm5iZiI6MTc0NzU2NjYwMy4xODUsInN1YiI6IjY4MjljMDBiNWRjOTEwMDkwOGY1NTdlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e_jJfI0DWyeZw-7ZfkOgTEFN26EWV0T1UrCzAmqUmyo',
  },
};

export const getTrandingMovies = async page => {
  const { data } = await axios({
    url: `/3/trending/movie/day`,
    method: 'get',
    headers: { ...options.headers },
    params: {
      language: 'en-US',
      page,
    },
  });
  return data;
};

export const getMoviesByQuery = async (searchValue, page) => {
  const { data } = await axios({
    url: `/3/search/movie`,
    method: 'get',
    headers: { ...options.headers },
    params: {
      query: searchValue,
      include_adult: 'false',
      language: 'en-US',
      page,
    },
  });
  return data;
};

export const getMovieDetails = async movie_id => {
  const { data } = await axios({
    url: `/3/movie/${movie_id}`,
    method: 'get',
    headers: { ...options.headers },
    params: {
      language: 'en-US',
    },
  });
  return data;
};

export const getMovieDetailsCredits = async movie_id => {
  const { data } = await axios({
    url: `/3/movie/${movie_id}/credits`,
    method: 'get',
    headers: { ...options.headers },
    params: {
      language: 'en-US',
    },
  });
  return data;
};

export const getMovieDetailsReviews = async movie_id => {
  const { data } = await axios({
    url: `/3/movie/${movie_id}/reviews`,
    method: 'get',
    headers: { ...options.headers },
    params: {
      language: 'en-US',
    },
  });
  return data;
};
