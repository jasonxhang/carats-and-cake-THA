// myForm.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewAddressForTest } from '../NewAddress';

test('should show validation on blur', async () => {
  const addNewAddress = jest.fn();
  render(<NewAddressForTest addNewAddress={addNewAddress} />);
  const input = screen.getByLabelText('Full Name:');
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.getByTestId('fullNameError')).not.toBe(null);
    expect(screen.getByTestId('fullNameError')).toHaveTextContent('Required');
  });
});
// the other input fields could be added here too

const mockAddress = {
  fullName: 'Jason Hang',
  emailAddress: 'jasonxhang@gmail.com',
  phoneNumber: '781-825-7271',
  streetAddress: '20 West 34th Street',
  streetAddress2: 'Top Floor',
  city: 'New York',
  state: 'New York',
  postalCode: '10001',
};

test('rendering and submitting a basic Formik form', async () => {
  const addNewAddress = jest.fn();
  render(<NewAddressForTest addNewAddress={addNewAddress} />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Full Name:'), mockAddress.fullName);
  await user.type(screen.getByLabelText('Email Address:'), mockAddress.emailAddress);
  await user.type(screen.getByLabelText('Phone Number:'), mockAddress.phoneNumber);
  await user.type(screen.getByLabelText('Address Line 1:'), mockAddress.streetAddress);
  await user.type(screen.getByLabelText('Address Line 2:'), mockAddress.streetAddress2);
  await user.type(screen.getByLabelText('City:'), mockAddress.city);

  await user.selectOptions(screen.getByRole('combobox'), [mockAddress.state]);

  await user.type(screen.getByLabelText('Postal Code:'), mockAddress.postalCode);

  await user.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(addNewAddress).toHaveBeenCalled();
    expect(addNewAddress).toHaveBeenCalledWith(mockAddress);
  });
});
