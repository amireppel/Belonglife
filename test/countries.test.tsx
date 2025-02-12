
 /* eslint-env jest */ 

 import '@testing-library/jest-dom';
import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { List } from 'immutable';
import Countries from '../src/components/countries';

describe('Countries component', () => {
  const mockCountries = List([
    { name: {  common: 'United States'}, flags: {svg:'http://somwhere',  alt: 'some flag' }},
    { name: {  common: 'Israel'}, flags:  {svg:'http://somwhere',  alt: 'some flag' }},
    { name: {  common: 'China'}, flags:  {svg:'http://somwhere',  alt: 'some flag' }},
  ]);

  it('renders the loading text when isLoaded is false', () => {
    render(<Countries remoteListCountries={List([ ])}  isRemoteLoaded={false}  isRemoteError={ false} />);

    // Check if the loading text is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders the list of countries when isLoaded is true', () => {
    render(<Countries remoteListCountries={mockCountries} isRemoteLoaded={true}  isRemoteError={ false} />);

    // Check if the countries' names are rendered
    mockCountries.forEach((country) => {
      expect(screen.getByText(country?.name?.common)).toBeInTheDocument();
    });
  });


  it('does not render countries list when isLoaded is false', () => {
    render(<Countries remoteListCountries={mockCountries} isRemoteLoaded={false}   isRemoteError={ false}/>);

    // Ensure no countries are rendered
    mockCountries.forEach((country) => {
      expect(screen.queryByText(country?.name?.common )).not.toBeInTheDocument();
    });
  });
});