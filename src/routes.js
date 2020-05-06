import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {NotFound, Home, Login, Signup, EmailHistory, NewEmail} from './components';
import {connect} from 'react-redux';

const Routes = (props) => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />

        {!!props.isLoggedIn && (
            <Switch>
                <Route path="/emailHistory" component={EmailHistory} />
                <Route path="/email" component={NewEmail} />
            </Switch>
        )}

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>
);

const mapState = (state) => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!state.user.id,
    };
};
export default connect(mapState)(Routes);
