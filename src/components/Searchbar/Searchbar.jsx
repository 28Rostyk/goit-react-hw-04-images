import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import initialState from './initialState';
import css from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleOnSubmit = e => {
    e.preventDefault();
    if (state.search.trim() === '') {
      toast.info('Nothing selected!');
      return;
    }
    onSubmit(state.search);
    setState({ ...initialState });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ [name]: value });
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleOnSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <AiOutlineSearch className={css.SearchBtnIcon} />
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          name="search"
          value={state.search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
