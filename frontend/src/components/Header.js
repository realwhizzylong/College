import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

const Header = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>College Admission</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/colleges">
                                <Nav.Link> Colleges </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/admissions">
                                <Nav.Link> Admissions </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/forums">
                                <Nav.Link> Forums </Nav.Link>
                            </LinkContainer>
                            {userInfo &&
                                <LinkContainer to="/calculator">
                                    <Nav.Link> Calculator </Nav.Link>
                                </LinkContainer>
                            }
                        </Nav>
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <NavDropdown title={userInfo.username} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>My Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/background">
                                        <NavDropdown.Item>My Background</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/myadmissions">
                                        <NavDropdown.Item>My Admissions</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/myposts">
                                        <NavDropdown.Item>My Posts</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/">
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user" /> Log In </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;