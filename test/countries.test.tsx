
/* eslint-env jest */

import '@testing-library/jest-dom';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { render, screen, fireEvent } from '@testing-library/react';

import { List } from 'immutable';
import Countries from '../src/components/countries';

describe('Countries component', () => {
  const mockCountries = List([
    { name: { common: 'United States' }, flags: { svg: 'http://somwhere', alt: 'some flag' } },
    { name: { common: 'Israel' }, flags: { svg: 'http://somwhere', alt: 'some flag' } },
    { name: { common: 'China' }, flags: { svg: 'http://somwhere', alt: 'some flag' } },
  ]);

  it('renders the loading text when isLoaded is false', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="countries"
            element={
              <Countries countriesList={List([])} isLoaded={false} isError={false} selectCountryHandler={() => { }} />
            }
          />
          <Route path="*" element={<Navigate to="countries" />} />
        </Routes>
      </BrowserRouter>
    )
    // Check if the loading text is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders the list of countries when isLoaded is true', () => {

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="countries"
            element={
              <Countries countriesList={mockCountries} isLoaded={true} isError={false} selectCountryHandler={() => { }} />
            }
          />
          <Route path="*" element={<Navigate to="countries" />} />
        </Routes>
      </BrowserRouter>
    );

    // Check if the countries' names are rendered
    mockCountries.forEach((country) => {
      expect(screen.getByText(country?.name?.common)).toBeInTheDocument();
    });
  });


  it('does not render countries list when isLoaded is false', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="countries"
            element={
              <Countries countriesList={mockCountries} isLoaded={false} isError={false} selectCountryHandler={() => { }} />
            }
          />
          <Route path="*" element={<Navigate to="countries" />} />
        </Routes>
      </BrowserRouter>
    );

    // Ensure no countries are rendered
    mockCountries.forEach((country) => {
      expect(screen.queryByText(country?.name?.common)).not.toBeInTheDocument();
    });
  });
  it('checks filter behaiour', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="countries"
            element={
              <Countries countriesList={mockCountries} isLoaded={true} isError={false} selectCountryHandler={() => { }} />
            }
          />
          <Route path="*" element={<Navigate to="countries" />} />
        </Routes>
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'n' } });

    // Check that only the countries containing 'un' are visible
    expect(screen.getByText('China')).toBeInTheDocument();

    expect(screen.getByText('United States')).toBeInTheDocument();

    // Ensure countries not matching are not visible
    expect(screen.queryByText('Israel')).not.toBeInTheDocument();

  });
});