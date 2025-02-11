/*mport { useState } from 'react'*/
import { BrowserRouter, Routes, Route , Navigate} from "react-router";

import Countries from './components/countries';
import CountryDetails from './components/countrydetails';
import './App.scss'

function App() {
  /*const [count, setCount] = useState(0);*/

  return (
    <>
      <div>
        aaa
      </div>
      <BrowserRouter>
        <Routes>

          <Route path="countries" element={<Countries />} />
          <Route path="countries/:id" element={< CountryDetails />} />
          <Route path="*" element={<Navigate to="countries" />} />

          </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
