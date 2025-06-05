import './App.module.css';

import { Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';

const Navigation = lazy(() => import('../../components/Navigation/Navigation'));
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ErrorPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const Movies = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieInfo = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);

const Loader = lazy(() => import('../../components/Loader/Loader'));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieInfo />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
