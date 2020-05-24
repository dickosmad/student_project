import React, { Component } from 'react';
import {MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer } from "mdbreact";
    import { BrowserRouter as Router } from 'react-router-dom';
    import './Menu.css'

export default class Menu extends Component {
    state = {
        collapseID: ""
      };
      
      toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
      }));
    render() {
        return (
      <Router>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text"><MDBIcon icon="graduation-cap" /></strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav center>
            <MDBNavItem active>
              <MDBNavLink to="#!">Find Your Teacher  
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!"> Home </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" style={{backgroundColor: '#FF8A65'}}> Become a Teacher </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Connect</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="login">Login</MDBDropdownItem>
                  <MDBDropdownItem href="logout">Logout</MDBDropdownItem>
                  <MDBDropdownItem href="register">Register</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!"> Contact us </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
            <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                  </div>
                </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
        )
    }
}
