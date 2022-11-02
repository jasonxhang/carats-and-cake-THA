import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

interface TopNavProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const TopNav = ({ isLoggedIn, handleLogout }: TopNavProps) => {
  return (
    <div className="App container">
      <Navbar className="navbar" bg="light" variant="light">
        <Navbar.Brand>Billing Addresser</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {isLoggedIn ? (
              <Fragment>
                <NavLink className="nav-link" to="/add-address">
                  Add Address
                </NavLink>
                <NavLink className="nav-link" to="/view-all">
                  View Addresses
                </NavLink>
                <NavLink className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </NavLink>
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

export default TopNav;
