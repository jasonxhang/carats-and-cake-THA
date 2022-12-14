import React, { useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  fetchAddresses,
  getAllAddresses,
  getAddressesIsLoading,
  RootState,
  AppDispatch,
} from '../store';
import { IAddress } from '../types/address';

interface AllAddressesProps {
  allAddresses: IAddress[];
  loadAddresses: () => void;
  isLoading: boolean;
}

const AllAddresses = ({ allAddresses, loadAddresses, isLoading }: AllAddressesProps) => {
  useEffect(() => {
    if (!allAddresses) loadAddresses();
  }, []);

  const renderLoading = () => {
    return (
      <div data-testid="loading-message" className="loading">
        Loading...
        <Spinner data-testid="spinner" animation="border" variant="primary" />
      </div>
    );
  };

  const renderAddressTable = () => {
    return allAddresses.map((address) => {
      return (
        <tr key={address._id}>
          <td>{address.fullName}</td>
          <td>{address.emailAddress}</td>
          <td>{address.phoneNumber}</td>
          <td>{address.streetAddress}</td>
          <td>{address.city}</td>
          <td>{address.state}</td>
          <td>{address.postalCode}</td>
        </tr>
      );
    });
  };

  const renderAllAddresses = () => {
    return allAddresses.length > 0 ? (
      <div className="page-container">
        <Table striped size="sm">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
            </tr>
          </thead>
          <tbody>{renderAddressTable()}</tbody>
        </Table>
      </div>
    ) : (
      <div data-testid="no-addresses-message" className="center-pad-top">
        <h3>No billing addresses available. Go add some!</h3>
      </div>
    );
  };

  return isLoading ? renderLoading() : renderAllAddresses();
};

const mapState = (state: RootState) => {
  return {
    allAddresses: getAllAddresses(state),
    isLoading: getAddressesIsLoading(state),
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    loadAddresses: () => dispatch(fetchAddresses()),
  };
};

export const AllAddressesForTest = AllAddresses;

export default connect(mapState, mapDispatch)(AllAddresses);
