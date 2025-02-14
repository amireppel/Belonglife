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

export interface RemoteCountriesListProps {
  remoteList: List<CountryData>;
  isRemoteLoaded: boolean;
  isRemoteError: boolean;
}

export interface LocalCountriesListProps {
  localList: List<CountryData>;
  isLocalLoaded: boolean;
}


export interface FullCountriesListProps {
  countriesList: List<CountryData>;
  isLoaded: boolean;
  isError: boolean;
  selectCountryHandler: Function,
}

export interface DisplaySetUpProps {
  localData: LocalCountriesListProps,
  remoteData: RemoteCountriesListProps,
  filter: string
}

export interface CountryDetailsProps {
  countriesList: List<CountryData>;
  isLoaded: boolean;
}

export interface CountryWithTimestamp extends CountryData {
  timestamp: string;
}
