import { useState, useEffect } from 'react';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'immutable';
import { CountryData } from '../types/countries';

const useRemoteListCountries = () => {
  const [remoteList, setCountries] = useState<List<CountryData>>(List());
  const [isRemoteLoaded, setIsRemoteLoaded] = useState<boolean>(false);
  const [isRemoteError, setError] = useState<boolean>(false);

  // Function to fetch data from the API
  const fetchData = (): Observable<CountryData[]> => {
    return from(fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => data)); // Adjust this based on the actual structure of the data returned
  };

  useEffect(() => {
    const countriesObservable = fetchData().pipe(
      map((data) => data.map((country: CountryData) => country)) // Ensure proper data mapping here
    );

    const subscription = countriesObservable.subscribe({
      next: (data) => {
        // Update the state with the new list of countries
        setCountries(List(data));
        setIsRemoteLoaded(true); // Set loading state to true after data is fetched
      },
      error: (err) => {
        console.error('Error fetching data: ', err);
        setIsRemoteLoaded(true); // Ensure loading state is set to true in case of an error as well
        setError(true);
      }
    });

    // Cleanup the subscription on component unmount
    return () => subscription.unsubscribe();
  }, []);

  return { remoteList, isRemoteLoaded, isRemoteError };
};

export default useRemoteListCountries;
