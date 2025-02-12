
import { CountriesListProps, CountryData } from '../../types/countries';

import './countries.scss'

const Countries =  ({remoteListCountries,   isRemoteLoaded, isRemoteError }: CountriesListProps)=> {
  /*const [count, setCount] = useState(0)*/

  return (
    <>
      { !isRemoteLoaded ?
         <div>
          Loading...
         </div>   
         : 
         <>
        <div className="listTitle">  Select a country: </div>
     
        <div className="listContainer" >
        { remoteListCountries.map((country:CountryData, index: number ) => 
          <div className="countryContainer" key={index}>
          
          <div className="smallFlag">    <img  width="50px" height="50px" src={country.flags.svg} alt={country.flags.alt} /> </div>
          <div className="countryName"> {country.name.common}</div>
          </div>
        ) }
        
        </div>
        </>
      }
    </>
  )
}

export default Countries;
