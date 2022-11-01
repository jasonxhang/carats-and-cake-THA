import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound, Home, Login, Signup, AllAddresses, NewAddress } from './components';
import { connect } from 'react-redux';
import { getIsLoggedIn } from './store';

interface RoutesProps {
  isLoggedIn: boolean;
}

const Routes = ({ isLoggedIn }: RoutesProps) => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />

    {isLoggedIn && (
      <Switch>
        <Route path="/add-address" component={NewAddress} />
        <Route path="/view-all" component={AllAddresses} />
      </Switch>
    )}

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);

const mapState = (state) => {
  return {
    isLoggedIn: getIsLoggedIn(state),
  };
};

export default connect(mapState)(Routes);
