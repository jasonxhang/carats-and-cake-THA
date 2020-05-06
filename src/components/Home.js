import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

class Home extends Component {
    renderLander() {
        return (
            <div className="lander">
                <h1>Email Sender</h1>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                        Signup
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        const {user} = this.props;
        return (
            <div className="page-container">
                {user.email ? (
                    <Jumbotron>
                        <h1>Hello, {user.signUpName}!</h1>
                        <p>
                            Welcome to Email Sender. Feel free to send as many emails as you wish.
                        </p>
                    </Jumbotron>
                ) : (
                    <Jumbotron>
                        <h1>Hello, Guest!</h1>
                        <p>
                            Welcome to Email Sender. Please register an account in order to send
                            emails.
                        </p>
                    </Jumbotron>
                )}
            </div>
        );
    }
}

const mapState = ({user}) => ({user});

export default connect(mapState)(Home);
