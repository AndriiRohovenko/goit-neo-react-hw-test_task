import './CampersPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import CampersList from '../../components/CampersList/CampersList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
// import { useId } from 'react';
import { selectError, selectLoading } from '../../redux/campersSlice';

import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

const CampersPage = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // const searchFieldID = useId();

  return (
    <div>
      <p>CampersPage</p>
      <SearchBar />
      {error && <ErrorMessage message={'Try Different Query!'} />}
      {isLoading ? <Loader isLoading={isLoading} /> : <CampersList />}
    </div>
  );
};

export default CampersPage;
