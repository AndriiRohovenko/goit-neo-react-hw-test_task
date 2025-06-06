import styles from './SearchBar.module.css';
import { useId } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { GoSearch } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const filterData = useSelector(selectNameFilter);
  const handleChange = ev => {
    dispatch(changeFilter(ev.target.value.toLowerCase()));
  };

  const searchFieldID = useId();
  const handleSubmit = ev => {
    ev.preventDefault();
    const input_value = ev.target.elements.searchBarInput.value;
    if (!input_value) {
      toast.error('Please insert search text!');
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            className={styles.searchBar}
            name="searchBarInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search Movies"
            id={searchFieldID}
            value={filterData}
            onChange={handleChange}
          />
          <button type="submit" className={styles.searchBtn}>
            <GoSearch />
          </button>
          <Toaster position="top-right" />
        </form>
      </header>
    </>
  );
}

export default SearchBar;
