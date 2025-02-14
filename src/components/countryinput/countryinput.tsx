import { ChangeEvent } from 'react';
import { FilterProps } from '../../types/generics';

import theme from './countryInput.module.scss'


const CountryInput = ({ filter, setFilter }: FilterProps) => {

  const placeholder = "Search a country"; // Define placeholder here
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleClear = () => {
    setFilter('');
  };

  return (
    <div className={theme.container}>
      <input
        type="text"
        value={filter}
        onChange={handleInputChange}
        placeholder={placeholder}
        data-testid="search-input"
      />
      {filter && (
        <button
          onClick={handleClear}
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default CountryInput;