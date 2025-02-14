import { useEffect, useState, useRef } from 'react';
import { Observable } from 'rxjs';
import { List } from 'immutable'; // Importing List from Immutable.js
import { CountryWithTimestamp } from '../types/countries'
// Define the structure of the country object (without timestamp)

import { CountryData } from '../types/countries'
// Utility function to open IndexedDB and store countries
const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('countriesDBAE', 1); // Renamed database here

    request.onupgradeneeded = (e:any) => {
      const db = e.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains('countries')) {
        db.createObjectStore('countries', { keyPath: 'name.common' });
      }
    };

    request.onerror = () => reject(new Error('Failed to open IndexedDB'));
    request.onsuccess = () => resolve(request.result);
  });
};

// Function to get all countries from IndexedDB and sort by timestamp
const getCountriesFromDB = (db: IDBDatabase) => {
  return new Observable<CountryWithTimestamp[]>((observer) => {
    const transaction = db.transaction('countries', 'readonly');
    const store = transaction.objectStore('countries');
    const request = store.getAll();

    request.onsuccess = () => {
      // Sort the countries based on timestamp (earliest to latest)
      const sortedCountries = request.result.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      observer.next(sortedCountries);
      observer.complete();
    };

    request.onerror = () => {
      observer.error(new Error('Failed to fetch countries from DB'));
    };
  });
};

// Function to add a country to IndexedDB (with timestamp)
const addCountryToDB = (db: IDBDatabase, country: CountryWithTimestamp) => {
  return new Observable<void>((observer) => {
    const transaction = db.transaction('countries', 'readwrite');
    const store = transaction.objectStore('countries');

    const request = store.get(country.name.common);
    request.onsuccess = () => {
      if (!request.result) {
        store.put(country); // Save the country object with timestamp
        observer.next();
        observer.complete();
      } else {
        observer.error(new Error('Country already exists'));
      }
    };

    request.onerror = () => {
      observer.error(new Error('Failed to check or add country'));
    };
  });
};

// Custom hook to manage countries in IndexedDB
const useIndexedDB = () => {
  const [countriesList, setCountriesList] = useState<List<CountryWithTimestamp>>(List()); // Use Immutable List
  const [isDBLoaded, setIsDBLoaded] = useState<boolean>(false);
  const dbRef = useRef<IDBDatabase | null>(null); // Ref to store the DB instance

  // Open the DB only once and store the instance in useRef
  useEffect(() => {
    openDB().then((db) => {
      dbRef.current = db; // Store the DB instance in the ref
      loadCountries(db); // Load the countries list after opening the DB
    }).catch((error) => {
      console.error('Error opening DB:', error);
      setIsDBLoaded(true);
    });
  }, []); // Empty dependency array to run once on mount

  // Load countries from IndexedDB only once (on mount)
  const loadCountries = (db: IDBDatabase) => {
    getCountriesFromDB(db).subscribe(
      (countries) => {
        setCountriesList(List(countries)); // Convert array to Immutable List
        setIsDBLoaded(true);
      },
      (error) => {
        console.error('Error loading countries:', error);
        setIsDBLoaded(true); // Set to true to stop loading state even if error occurs
      }
    );
  };

  // Handle adding a new country (timestamp is added here before saving)
  const handleAddCountry = (country: CountryData) => {
    const countryWithTimestamp: CountryWithTimestamp = {
      ...country,
      timestamp: new Date().toISOString(), // Add timestamp when saving
    };

    if (!dbRef.current) return;

    addCountryToDB(dbRef.current, countryWithTimestamp).subscribe(
      () => {
      
      },
      (error) => {
        console.error('Error adding country:', error);
      }
    );
  };

  return {
    countriesList,
    handleAddCountry,
    isDBLoaded,
  };
};

export default useIndexedDB;