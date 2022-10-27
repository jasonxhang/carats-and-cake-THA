import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LoaderButton from './containers/LoaderButton';
import { connect } from 'react-redux';
import { auth } from '../store';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      signUpName: '',
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      this.props.auth(this.state.email, this.state.password, this.state.signUpName, 'signup');
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  renderForm() {
    const { error } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bssize="large">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="signUpName" bssize="large">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="signUpName"
              value={this.state.signUpName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" bssize="large">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <LoaderButton
            bssize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Signing up…"
          />
        </form>
        {error && error.response && <div id="error-response"> {error.response.data} </div>}
      </div>
    );
  }

  render() {
    return <div className="Signup">{this.renderForm()}</div>;
  }
}

const mapState = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatch = { auth };

export default connect(mapState, mapDispatch)(Signup);
