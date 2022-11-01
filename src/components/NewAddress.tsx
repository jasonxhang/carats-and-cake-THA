import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewAddressThunk } from '../store';
import { FieldContainer } from './NewAddress.styled';
import { IAddress } from '../types/address';
import { states, addressSchema } from './NewAddress.util';

interface NewAddressProps {
  addNewAddress: (values) => void;
}

const NewAddress = ({ addNewAddress }: NewAddressProps) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      streetAddress: '',
      streetAddress2: '',
      city: '',
      state: '',
      postalCode: '',
    },
    onSubmit: (values, { resetForm }) => {
      const streetAddress = [values.streetAddress];
      if (values.streetAddress2) {
        streetAddress.push(values.streetAddress2);
      }
      const updatedVals: IAddress = { ...values, streetAddress: streetAddress.join(' ') };
      addNewAddress(updatedVals);
      resetForm();
    },
    validationSchema: addressSchema,
  });

  const renderConfirmButton = () => {
    return (
      <div style={{ marginTop: '20px' }}>
        <Button type="submit" size="lg" variant="success">
          Submit
        </Button>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="newAddress-container">
        <h3>Add a billing address</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <FieldContainer>
            <Form.Group>
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
            </Form.Group>
            {formik.touched.fullName && (
              <Form.Control.Feedback type="invalid">{formik.errors.fullName}</Form.Control.Feedback>
            )}
          </FieldContainer>

          <FieldContainer>
            <Form.Group>
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                id="emailAddress"
                name="emailAddress"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emailAddress}
              />
            </Form.Group>
            {formik.touched.emailAddress && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.emailAddress}
              </Form.Control.Feedback>
            )}
          </FieldContainer>
          <FieldContainer>
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </Form.Group>
            {formik.touched.phoneNumber && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            )}
          </FieldContainer>

          <FieldContainer>
            <Form.Group>
              <Form.Label>Address Line 1:</Form.Label>
              <Form.Control
                id="streetAddress"
                name="streetAddress"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetAddress}
              />
            </Form.Group>
            {formik.touched.streetAddress && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.streetAddress}
              </Form.Control.Feedback>
            )}
          </FieldContainer>
          <FieldContainer>
            <Form.Group>
              <Form.Label>Address Line 2:</Form.Label>
              <Form.Control
                id="streetAddress2"
                name="streetAddress2"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetAddress2}
              />
            </Form.Group>
            {formik.touched.streetAddress2 && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.streetAddress2}
              </Form.Control.Feedback>
            )}
          </FieldContainer>
          <FieldContainer>
            <Form.Group>
              <Form.Label>City:</Form.Label>
              <Form.Control
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
            </Form.Group>
            {formik.touched.city && (
              <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
            )}
          </FieldContainer>
          <FieldContainer>
            <Form.Group>
              <Form.Label>State:</Form.Label>
              <Form.Control as="select" onChange={formik.handleChange} id="state" name="state">
                {Object.entries(states).map(([key, value]) => {
                  return <option key={key}>{value}</option>;
                })}
              </Form.Control>
            </Form.Group>
            {formik.touched.state && (
              <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
            )}
          </FieldContainer>

          <FieldContainer>
            <Form.Group>
              <Form.Label>Postal Code:</Form.Label>
              <Form.Control
                id="postalCode"
                name="postalCode"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
              />
            </Form.Group>
            {formik.touched.state && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.postalCode}
              </Form.Control.Feedback>
            )}
          </FieldContainer>
          {renderConfirmButton()}
        </form>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addNewAddress: (values) => dispatch(addNewAddressThunk(values)),
  };
};

export default connect(null, mapDispatch)(NewAddress);
