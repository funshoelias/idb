import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/MyNavbar.css';

class MyNavbar extends Component{
  render() {
    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <div className="brand-align">
          <Navbar.Brand>
            <Link to="/"><Image src="https://i.imgur.com/g16hr23.png"/></Link>
          </Navbar.Brand>
        </div>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/about" to="/about">
              About
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/courses" to="/courses">
              Courses
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/"subjects to="/subjects">
              Subjects
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/jobs" to="/jobs">
              Jobs
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default MyNavbar;
