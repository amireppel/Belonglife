import { useState, useCallback, useEffect } from 'react';
import { List } from 'immutable';

import { CountryData } from '../types/countries';

import useIndexedDB from './useIndexedDB';

const useLocalListCountries = () => {

  const [localList, setLocalList] = useState<List<CountryData>>(List());

  const { countriesList, handleAddCountry, isDBLoaded } = useIndexedDB();
  useEffect(() => {
    setLocalList(localList.concat(countriesList));
  },
    [isDBLoaded]
  );

  const addCountryToList = useCallback((country: CountryData, navigate: Function, idIndex: number) => {

    if (!localList.some(item => item.name.common === country.name.common)) {

      setLocalList(localList.push(country))
      handleAddCountry(country)
      navigate(`/countries/${localList.size + 1}`)
      return;
    }
    navigate(`/countries/${idIndex + 1}`)
  }, [localList]);

  return { localData: { localList, isLocalLoaded: isDBLoaded }, addCountryToList };
};

export default useLocalListCountries;
