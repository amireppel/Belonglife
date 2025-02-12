import { List } from 'immutable';

export interface Flag {
  svg: string;
  alt: string;
}
  
export interface CountryData {
  name: {
    common: string;
  };
  flags: Flag;
}

export interface CountriesListProps {
  remoteListCountries: List<CountryData>; 
  isRemoteLoaded: boolean; 
  isRemoteError: boolean;       
}

export interface testType {
  isRemoteLoaded: boolean;  
}