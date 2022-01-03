import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DarkModeToggle from "react-dark-mode-toggle";
import useDarkMode from 'use-dark-mode';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions';

const Header = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const logoutHandler = () => {
        dispatch(logout())
    }


    const darkMode = useDarkMode(false);

    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" style={{ background: 'black', boxShadow: '0 5px 5px -5px #333' }}>
            <Container style={{ textAlign: '-webkit-center' }}>
                <Navbar.Brand href="/" style={{ background: 'white', borderRadius: '4px', padding: '8px', fontWeight: 'bold' }}>&lt;HowTo&#47;&gt;</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: 'end' }}>
                    <Nav className="me-auto">
                        <SearchBox />
                    </Nav>
                    <Nav className="ml-auto" style={{ alignItems: 'center' }}>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name.split(' ')[0]} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/saved'>
                                    <NavDropdown.Item>Saved</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/addpost'>
                                    <NavDropdown.Item>Add Post</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>

                        ) : <><LinkContainer to='/login'>
                            <Nav.Link eventKey={1}>LogIn</Nav.Link></LinkContainer>
                            <LinkContainer to='/register'>
                                <Nav.Link eventKey={2} style={{ paddingRight: '25px' }}>
                                    Register
                                </Nav.Link>
                            </LinkContainer></>
                        }

                        <DarkModeToggle
                            onChange={darkMode.toggle}
                            checked={darkMode.value}
                            size={40}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
