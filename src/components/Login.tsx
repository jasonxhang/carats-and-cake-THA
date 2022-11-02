import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { LoaderButton } from './containers/LoaderButton';
import { connect } from 'react-redux';
import { auth, getAuthError, RootState, AppDispatch } from '../store';

interface authDispatchProps {
  email: string;
  password: string;
  signUpName: string | null;
  method: 'login' | 'signup';
}

export interface LoginProps {
  login: ({ email, password, signUpName, method }: authDispatchProps) => void;
  loginError: string;
}

const Login = ({ login, loginError }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    login({ email, password, signUpName: null, method: 'login' });
    setIsLoading(false);
  };

  return (
    <div className="Login">
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            // data-testid="email"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          {/* <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          /> */}
          <input
            data-testid="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            data-testid="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

const mapState = (state: RootState) => {
  return {
    loginError: getAuthError(state),
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    login: ({ email, password, signUpName, method }: authDispatchProps) =>
      dispatch(auth({ email, password, signUpName, method })),
  };
};

export const LoginForTest = Login;

export default connect(mapState, mapDispatch)(Login);
