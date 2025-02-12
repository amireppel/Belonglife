import { useEffect } from 'react';
import { BrowserRouter, Routes, Route , Navigate} from "react-router";

import Countries from './components/countries';
import CountryDetails from './components/countrydetails';
import UseCountriesRemoteList from './hooks/useCountriesRemoteList';

import './App.scss'

function App() {

  const { isRemoteLoaded ,countriesRemoteList, isRemoteError } = UseCountriesRemoteList();
  useEffect(()=>{
 
  }, [])
  return (
    <>
      <div>

      </div>
      <BrowserRouter>
        <Routes>

          <Route path="countries"
                 element={
                  <Countries
                    remoteListCountries={ countriesRemoteList  }
                    isRemoteError={ isRemoteError }
                    isRemoteLoaded={ isRemoteLoaded }
                  />}
          />
          <Route path="countries/:id" element={< CountryDetails />} />
          <Route path="*" element={<Navigate to="countries" />} />

          </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
