import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { LoaderButton } from './containers/LoaderButton';
import { connect } from 'react-redux';
import { auth, getAuthError } from '../store';

interface LoginProps {
  login: (email, password, signupName, method) => void;
  loginError: string;
}

const Login = ({ login, loginError }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    login(email, password, null, 'login');
    setIsLoading(false);
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <LoaderButton
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading && !loginError}
          text="Login"
          loadingText="Logging in…"
        />
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    loginError: getAuthError(state),
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (email, password, signupName, method) =>
      dispatch(auth(email, password, signupName, method)),
  };
};

export default connect(mapState, mapDispatch)(Login);
