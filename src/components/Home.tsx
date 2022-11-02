import React from 'react';
import { IUser } from '../types/user';
import { connect } from 'react-redux';
import { getUser, RootState } from '../store';

interface HomeProps {
  user: IUser;
}

const Home = ({ user }: HomeProps) => {
  return (
    <div className="page-container">
      <div className="welcome-container">
        {user.email ? (
          <div>
            <h1>Hello, {user.signUpName}!</h1>
            <p>
              Welcome to Billing Addresser. Feel free to add as many billing addresses you wish.
            </p>
          </div>
        ) : (
          <div>
            <h1>Hello, Guest!</h1>
            <p>
              Welcome to Billing Addresser. Please register an account in order to add addresses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapState = (state: RootState) => {
  return {
    user: getUser(state),
  };
};

export default connect(mapState)(Home);
