import { useState } from 'react';

import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchBarHead,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
  };

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <SearchBarHead>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">Search</SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBarHead>
  );
};
