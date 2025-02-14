import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";

import { CountryDetailsProps } from '../../types/countries';

import theme from './countryDetails.module.scss'


const CountryDetails = ({ countriesList, isLoaded }: CountryDetailsProps) => {
  const navigate = useNavigate();

  const id = Number(useParams().id) || 0;
  const index = id - 1;
  const selectedCountry = countriesList.get(index);

  return (
    <>
      {!isLoaded ?
        <div> Loading...</div>
        : selectedCountry ?
          <div className={theme.countryContainer}>
            <div className={theme.countryName}> {selectedCountry?.name.common}</div>
            <div className={theme.flag}>
              <img width="250px" height="200px" src={selectedCountry?.flags.svg} alt={selectedCountry?.flags.alt} />
            </div>
            <div className={theme.back} onClick={() => navigate('/')}> &#x2B05; </div>
          </div>

          : <div> Cannot find specific country</div>
      }
    </>
  )
}

export default CountryDetails;
