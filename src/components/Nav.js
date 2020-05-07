import React, {Fragment} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';

const TopNav = ({isLoggedIn, handleLogout, emailsSent}) => {
    return (
        <div className="App container">
            <Navbar className="navbar" bg="light" variant="light">
                <Navbar.Brand href="/">MERN LEX App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        {isLoggedIn ? (
                            <Fragment>
                                <NavLink className="nav-link" to="/email">
                                    New Email
                                </NavLink>
                                <NavLink className="nav-link" to="/emailHistory">
                                    Email History
                                </NavLink>
                                <NavLink className="nav-link" to="/" onClick={handleLogout}>
                                    Logout
                                </NavLink>
                                <Navbar.Brand id="balance">
                                    Total Emails Sent: {emailsSent}
                                </Navbar.Brand>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="nav-link" to="/signup">
                                    Signup
                                </NavLink>
                            </Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default withRouter(TopNav);
