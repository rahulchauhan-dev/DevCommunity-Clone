import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";
import useDarkMode from "use-dark-mode";
import {
  Container,
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const darkMode = useDarkMode(false);

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="md"
      style={{ background: "black", boxShadow: "0 5px 5px -5px #333" }}
    >
      <Container style={{ textAlign: "-webkit-center" }}>
        <Navbar.Brand
          href="/"
          style={{
            background: "white",
            borderRadius: "4px",
            padding: "8px",
            fontWeight: "bold",
          }}
        >
          &lt;HowTo&#47;&gt;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: "end" }}
        >
          <Nav className="me-auto">
            <SearchBox />
          </Nav>
          <Nav className="ml-auto" style={{ alignItems: "center" }}>
            {userInfo ? (
              <>
                <LinkContainer to="/addpost">
                  <Nav.Link>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Create New Post</Tooltip>}
                    >
                      <img src="/svg/file-plus.svg" alt="addpost"></img>
                    </OverlayTrigger>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/saved">
                  <Nav.Link>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Bookmarked Posts</Tooltip>}
                    >
                      <img src="/svg/bookmark.svg" alt="bookmark"></img>
                    </OverlayTrigger>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/profile">
                  <Nav.Link>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Profile</Tooltip>}
                    >
                      <img src="/svg/user2.svg" alt="user"></img>
                    </OverlayTrigger>
                  </Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={logoutHandler}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Logout</Tooltip>}
                  >
                    <img src="/svg/log-out.svg" alt="log-out"></img>
                  </OverlayTrigger>
                </Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link eventKey={1}>LogIn</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link eventKey={2} style={{ paddingRight: "25px" }}>
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}

            <DarkModeToggle
              className="dark-mode-toggle"
              onChange={darkMode.toggle}
              checked={darkMode.value}
              size={40}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
