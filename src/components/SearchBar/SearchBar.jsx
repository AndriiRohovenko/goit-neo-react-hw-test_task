import styles from './SearchBar.module.css';
import { useId } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { GoSearch } from 'react-icons/go';
import { useState, useEffect } from 'react';

function SearchBar({ onSearch, value }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const searchFieldID = useId();
  const handleSubmit = ev => {
    ev.preventDefault();
    const input_value = ev.target.elements.searchBarInput.value;
    if (!input_value) {
      toast.error('Please insert search text!');
    }
    onSearch(input_value);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
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
            value={inputValue}
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
