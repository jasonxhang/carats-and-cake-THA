import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Routes from './routes';
import {connect} from 'react-redux';
import {logout, me, fetchEmails} from './store';
import {TopNav} from './components';

import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        console.log('loading initial data');
        this.props.loadInitialData();
        console.log('initial data loaded', this.props);

        if (this.props.isLoggedIn) {
            console.log('user is logged in');
            this.props.loadEmails();
        }
    }

    handleLogout = () => {
        this.props.handleLogout();
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="App container">
                <TopNav
                    emailsSent={this.props.emailsSent}
                    handleLogout={this.handleLogout}
                    isLoggedIn={this.props.isLoggedIn}
                    symbols={this.state.symbols}
                />
                <Routes />
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user._id,
        emailsSent: state.user.emailsSent,
        userId: state.user._id,
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleLogout() {
            dispatch(logout());
        },
        loadInitialData() {
            dispatch(me());
        },
        loadEmails() {
            dispatch(fetchEmails());
        },
    };
};

export default withRouter(connect(mapState, mapDispatch)(App));
