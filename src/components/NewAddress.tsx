import React from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewAddressThunk, AppDispatch } from '../store';
import { FieldContainer } from './NewAddress.styled';
import { IAddress } from '../types/address';
import { states, addressSchema } from './NewAddress.util';

interface NewAddressProps {
  addNewAddress: ({
    fullName,
    emailAddress,
    phoneNumber,
    streetAddress,
    streetAddress2,
    city,
    state,
    postalCode,
  }: IAddress) => void;
}

const NewAddress = ({ addNewAddress }: NewAddressProps) => {
  const renderConfirmButton = () => {
    return (
      <div style={{ marginTop: '20px' }}>
        <Button data-testid="submitAddress" type="submit" size="lg" variant="success">
          Submit
        </Button>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="newAddress-container">
        <h3>Add a billing address</h3>
        <Formik
          initialValues={{
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            streetAddress: '',
            streetAddress2: '',
            city: '',
            state: '',
            postalCode: '',
          }}
          onSubmit={(values, { resetForm }) => {
            addNewAddress(values);
            resetForm();
          }}
          validationSchema={addressSchema}
        >
          {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
            return (
              <>
                <Form onSubmit={handleSubmit}>
                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="fullName">Full Name:</Form.Label>
                      <Form.Control
                        data-testid="fullName"
                        id="fullName"
                        name="fullName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullName}
                      />
                    </Form.Group>
                    {touched.fullName && (
                      <Form.Control.Feedback data-testid="fullNameError" type="invalid">
                        {errors.fullName}
                      </Form.Control.Feedback>
                    )}
                  </FieldContainer>

                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="emailAddress">Email Address:</Form.Label>
                      <Form.Control
                        id="emailAddress"
                        name="emailAddress"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.emailAddress}
                      />
                    </Form.Group>
                    {touched.emailAddress && (
                      <Form.Control.Feedback type="invalid">
                        {errors.emailAddress}
                      </Form.Control.Feedback>
                    )}
                  </FieldContainer>
                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
                      <Form.Control
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Group>
                    {touched.phoneNumber && (
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    )}
                  </FieldContainer>

                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="streetAddress">Address Line 1:</Form.Label>
                      <Form.Control
                        id="streetAddress"
                        name="streetAddress"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.streetAddress}
                      />
                    </Form.Group>
                    {touched.streetAddress && (
                      <Form.Control.Feedback type="invalid">
                        {errors.streetAddress}
                      </Form.Control.Feedback>
                    )}
                  </FieldContainer>
                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="streetAddress2">Address Line 2:</Form.Label>
                      <Form.Control
                        id="streetAddress2"
                        name="streetAddress2"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.streetAddress2}
                      />
                    </Form.Group>
                    {touched.streetAddress2 && (
                      <Form.Control.Feedback type="invalid">
                        {errors.streetAddress2}
                      </Form.Control.Feedback>
                    )}
                  </FieldContainer>
                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="city">City:</Form.Label>
                      <Form.Control
                        id="city"
                        name="city"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      />
                    </Form.Group>
                    {touched.city && (
                      <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    )}
                  </FieldContainer>
                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="state">State:</Form.Label>
                      <Form.Control
                        data-testid="select"
                        as="select"
                        onChange={handleChange}
                        id="state"
                        name="state"
                        value={values.state}
                      >
                        {Object.entries(states).map(([key, value]) => {
                          return <option key={key}>{value}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    {touched.state && (
                      <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    )}
                  </FieldContainer>

                  <FieldContainer>
                    <Form.Group>
                      <Form.Label htmlFor="postalCode">Postal Code:</Form.Label>
                      <Form.Control
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postalCode}
                      />
                    </Form.Group>
                    {touched.state && (
                      <Form.Control.Feedback type="invalid">
                        {errors.postalCode}
                      </Form.Control.Feedback>
                    )}
                  </FieldContainer>
                  {renderConfirmButton()}
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    addNewAddress: ({
      fullName,
      emailAddress,
      phoneNumber,
      streetAddress,
      streetAddress2,
      city,
      state,
      postalCode,
    }: IAddress) =>
      dispatch(
        addNewAddressThunk({
          fullName,
          emailAddress,
          phoneNumber,
          streetAddress,
          streetAddress2,
          city,
          state,
          postalCode,
        })
      ),
  };
};

export const NewAddressForTest = NewAddress;

export default connect(null, mapDispatch)(NewAddress);
