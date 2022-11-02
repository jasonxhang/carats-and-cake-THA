import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { LoaderButton } from './containers/LoaderButton';
import { connect } from 'react-redux';
import { auth, getAuthError, RootState, AppDispatch } from '../store';

interface authDispatchProps {
  email: string;
  password: string;
  signUpName: string;
  method: 'login' | 'signup';
}

interface SignupProps {
  signup: ({ email, password, signUpName, method }: authDispatchProps) => void;
  signupError: string;
}

const Signup = ({ signup, signupError }: SignupProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [signUpName, setSignUpName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0 && password === confirmPassword;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    signup({ email, password, signUpName, method: 'signup' });
    setIsLoading(false);
  };

  const renderForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="signUpName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="signUpName"
              value={signUpName}
              onChange={(e) => setSignUpName(e.target.value)}
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
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <LoaderButton
            disabled={!validateForm()}
            type="submit"
            isLoading={isLoading && !signupError}
            text="Signup"
            loadingText="Signing up…"
          />
        </form>
      </div>
    );
  };

  return <div className="Signup">{renderForm()}</div>;
};

const mapState = (state: RootState) => {
  return {
    signupError: getAuthError(state),
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    signup: ({ email, password, signUpName, method }: authDispatchProps) =>
      dispatch(auth({ email, password, signUpName, method })),
  };
};
export default connect(mapState, mapDispatch)(Signup);
