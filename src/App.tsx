import { useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Countries from './components/countries';
import CountryDetails from './components/countryDetails';
import useCountriesRemoteList from './hooks/useCountriesRemoteList';
import useLocalListCountries from './hooks/useCountriesLocalList';
import useDisplayListCountries from './hooks/useCountriesDisplayList';
import { CountryData } from './types/countries';

import './App.scss'

function App() {

  const remoteData = useCountriesRemoteList();
  const { localData, addCountryToList } = useLocalListCountries();

  const { isfinaliesd, isError, displayList } = useDisplayListCountries({
    remoteData,
    localData,
    filter: '',
  });

  const countryClickHandler = useCallback((countryData: CountryData, navigate: Function, idIndex: number) => {
    addCountryToList(countryData, navigate, idIndex)
  }, [displayList, addCountryToList])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="countries"
            element={
              <Countries
                countriesList={displayList}
                isError={isError}
                isLoaded={isfinaliesd}
                selectCountryHandler={countryClickHandler}
              />
            }
          />
          <Route
            path="countries/:id"
            element={
              <CountryDetails
                countriesList={displayList}
                isLoaded={isfinaliesd}
              />
            }
          />
          <Route path="*" element={<Navigate to="countries" />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
