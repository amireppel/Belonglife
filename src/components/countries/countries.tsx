import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { FullCountriesListProps } from '../../types/countries';
import CountryInput from "../countryinput";

import theme from "./countries.module.scss";

const Countries = ({ countriesList, isLoaded, isError, selectCountryHandler }: FullCountriesListProps) => {

  const listWithIds = useMemo(() =>
    countriesList.map((item, index) => ({ country: item, keyIndex: index }))
    /* this allows attributing a more persistent id for  ac country,
    which will smoother use of the country flag page and display, in display and possible refresh at details page*/
    , [countriesList]);

  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const filteredList = useMemo(() => (
    listWithIds.filter((({ country }) => country.name.common.toLowerCase().includes(filter.toLocaleLowerCase()))))
    , [listWithIds, filter])

  if (isError) return <div className={theme.error}> Error while loading, check your internet connection</div>;

  return (
    <>
      {!isLoaded ?
        <div className={theme.loading}>
          Loading...
        </div>
        :
        <>
          <div className={theme.listTitle} >  Select a country: </div>

          {<CountryInput filter={filter} setFilter={setFilter} />}

          <div className={theme.listContainer} >
            {filteredList.map(({ country, keyIndex }) =>
              <div
                className={theme.countryContainer} key={keyIndex}
                onClick={() => {
                  selectCountryHandler(country, navigate, keyIndex);
                }}
              >
                {country.flags.svg ?
                  <div className={theme.smallFlag}>
                    <img width="50px" height="50px" src={country.flags.svg} alt={country.flags.alt} />
                  </div>
                  :
                  <div className={theme.defaultFlag} ><span> &#127757;  </span></div>
                }
                <div className={theme.countryName}> {country.name.common}</div>
              </div>
            )}
          </div>
        </>
      }
    </>
  )
}

export default Countries;
