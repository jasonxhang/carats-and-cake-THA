import React, { useEffect } from 'react';
import ReduxToastr from 'react-redux-toastr';
import history from './history';
import Routes from './routes';
import { connect } from 'react-redux';
import { logout, me, fetchAddresses, getIsLoggedIn, RootState, AppDispatch } from './store';
import { TopNav } from './components';

interface AppProps {
  loadInitialData: () => void;
  loadAddresses: () => void;
  logoutUser: () => void;
  isLoggedIn: boolean;
}

const App = ({ loadInitialData, loadAddresses, logoutUser, isLoggedIn }: AppProps) => {
  useEffect(() => {
    loadInitialData();
    if (isLoggedIn) loadAddresses();
  }, [isLoggedIn]);

  const handleLogout = () => {
    logoutUser();
    history.push('/');
  };

  return (
    <div className="App container">
      <ReduxToastr
        timeOut={8000}
        newestOnTop={false}
        preventDuplicates
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      <TopNav handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Routes />
    </div>
  );
};

const mapState = (state: RootState) => {
  return {
    isLoggedIn: getIsLoggedIn(state),
  };
};

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
    loadInitialData: () => dispatch(me()),
    loadAddresses: () => dispatch(fetchAddresses()),
  };
};

export default connect(mapState, mapDispatch)(App);
