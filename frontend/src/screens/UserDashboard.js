import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Posts from "../components/Posts";
import Profile from "../components/Profile";

const UserDashboard = () => {
  return (
    <>
      <Container className="container-fluid" style={{ marginTop: "6rem" }}>
        <Container>
          <Row
            style={{
              border: "1px solid #c2c2c2",
              padding: "2rem",
              borderRadius: "2rem",
            }}
          >
            <Col>
              <h2 style={{ fontWeight: "bold" }}>Hello! Rahul</h2>
              <h2>Welcome to your Dashboard🔥</h2>
            </Col>
          </Row>
          <Row>
            <Container className="mt-4">
              <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                <Row>
                  <Col md={3}>
                    <Nav
                      variant="pills"
                      className="flex-column"
                      style={{
                        border: "1px solid #c2c2c2",
                        padding: "1rem",
                        borderRadius: "1rem",
                      }}
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="profile">Profile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="posts">Posts</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="followings">Followings</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="showcases">Showcases</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="discussions">Discussions</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="achievements">
                          Achievements
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col md={9} className="p-3">
                    <Tab.Content>
                      <Tab.Pane eventKey="profile">
                        <Profile />
                      </Tab.Pane>
                      <Tab.Pane eventKey="posts">
                        <Posts />
                      </Tab.Pane>
                      <Tab.Pane eventKey="followings">
                        This Feature is in Development👨‍💻
                      </Tab.Pane>
                      <Tab.Pane eventKey="showcases">
                        This Feature is in Development👨‍💻
                      </Tab.Pane>
                      <Tab.Pane eventKey="discussions">
                        This Feature is in Development👨‍💻
                      </Tab.Pane>
                      <Tab.Pane eventKey="achievements">
                        This Feature is in Development👨‍💻
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default UserDashboard;
