import './App.module.css';

import { Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';

const Header = lazy(() => import('../Header/Header'));
// const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
// const MovieReviews = lazy(() =>
//   import('../../components/MovieReviews/MovieReviews')
// );
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ErrorPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const CampersPage = lazy(() => import('../../pages/CampersPage/CampersPage'));
const CamperDetailsPage = lazy(() =>
  import('../../pages/CamperDetailsPage/CamperDetailsPage')
);

const Loader = lazy(() => import('../../components/Loader/Loader'));

const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CampersPage />} />
          <Route path="/catalog/:camperId" element={<CamperDetailsPage />}>
            {/* <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} /> */}
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
