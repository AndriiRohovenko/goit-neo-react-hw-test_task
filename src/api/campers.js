import axios from 'axios';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const getCampers = async () => {
  const { data } = await axios({
    url: `/campers`,
    method: 'get',
  });
  return data;
};

// export const getMoviesByQuery = async (searchValue, page) => {
//   const { data } = await axios({
//     url: `/3/search/movie`,
//     method: 'get',
//     params: {
//       query: searchValue,
//       include_adult: 'false',
//       language: 'en-US',
//       page,
//     },
//   });
//   return data;
// };

// export const getMovieDetails = async movie_id => {
//   const { data } = await axios({
//     url: `/3/movie/${movie_id}`,
//     method: 'get',
//     params: {
//       language: 'en-US',
//     },
//   });
//   return data;
// };

// export const getMovieDetailsCredits = async movie_id => {
//   const { data } = await axios({
//     url: `/3/movie/${movie_id}/credits`,
//     method: 'get',
//     params: {
//       language: 'en-US',
//     },
//   });
//   return data;
// };

// export const getMovieDetailsReviews = async movie_id => {
//   const { data } = await axios({
//     url: `/3/movie/${movie_id}/reviews`,
//     method: 'get',
//     params: {
//       language: 'en-US',
//     },
//   });
//   return data;
// };
