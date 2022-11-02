// myForm.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IAddress } from '../../types/address';

import { AllAddressesForTest } from '../AllAddresses';

test('should show message when no addresses', async () => {
  const loadAddresses = jest.fn();
  const mockIsLoading = false;
  const mockAllAddresses: IAddress[] = [];

  render(
    <AllAddressesForTest
      isLoading={mockIsLoading}
      loadAddresses={loadAddresses}
      allAddresses={mockAllAddresses}
    />
  );

  expect(screen.getByTestId('no-addresses-message')).not.toBe(null);
  expect(screen.getByTestId('no-addresses-message')).toHaveTextContent(
    'No billing addresses available. Go add some!'
  );
});

test('should show loading message when isLoading true', async () => {
  const loadAddresses = jest.fn();
  const mockIsLoading = true;
  const mockAllAddresses: IAddress[] = [];

  render(
    <AllAddressesForTest
      isLoading={mockIsLoading}
      loadAddresses={loadAddresses}
      allAddresses={mockAllAddresses}
    />
  );

  expect(screen.getByTestId('spinner')).not.toBe(null);
  expect(screen.getByTestId('loading-message')).not.toBe(null);
  expect(screen.getByTestId('loading-message')).toHaveTextContent('Loading...');
});

test('should render a table when data is passed', async () => {
  const loadAddresses = jest.fn();
  const mockIsLoading = false;
  const mockAllAddresses: IAddress[] = [
    {
      fullName: 'Jason Hang',
      emailAddress: 'jason@gmail.com',
      phoneNumber: '7812878931',
      streetAddress: '34 West 28th Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10039',
      _id: '1',
    },
  ];

  render(
    <AllAddressesForTest
      isLoading={mockIsLoading}
      loadAddresses={loadAddresses}
      allAddresses={mockAllAddresses}
    />
  );

  const table = screen.getByRole('table');
  const header = screen.getAllByRole('columnheader');
  const rows = screen.getAllByRole('row');
  const cells = screen.getAllByRole('cell');

  expect(table).not.toBe(null);
  expect(header).toHaveLength(7);
  expect(rows).toHaveLength(2);
  expect(cells).toHaveLength(7);
});
