import './App.module.css';

import { Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';

const Header = lazy(() => import('../Header/Header'));
const CamperFeatures = lazy(() =>
  import('../../components/CamperFeatures/CamperFeatures')
);
const CamperReviews = lazy(() =>
  import('../../components/CamperReviews/CamperReviews')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ErrorPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const CampersPage = lazy(() => import('../../pages/CampersPage/CampersPage'));
const CamperDetailsPage = lazy(() =>
  import('../../pages/CamperDetailsPage/CamperDetailsPage')
);

const Loader = lazy(() => import('../../components/Loader/Loader'));
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCampersThunk } from '../../redux/campersOps';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCampersThunk());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CampersPage />} />
          <Route path="/catalog/:camperId" element={<CamperDetailsPage />}>
            <Route index element={<CamperFeatures />} />
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
