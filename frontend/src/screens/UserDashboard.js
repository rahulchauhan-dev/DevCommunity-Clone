import React from "react";
import { Container, Row, Col, Tab, Nav, Stack } from "react-bootstrap";
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
              padding: "1rem",
              borderRadius: "1rem",
              marginRight: "0px",
              marginLeft: "0px",
            }}
          >
            <Col>
              <h2 style={{ fontWeight: "bold" }}>Hola!</h2>
              <h2>Welcome to your Dashboard🔥</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Stack direction="horizontal" gap={3}>
                <div
                  className="card border-secondary mb-3"
                  style={{
                    maxWidth: "20rem",
                    borderRadius: "1rem",
                    width: "100%",
                    background: "inherit",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Total Posts</h5>
                    <p className="card-text fs-4">25</p>
                  </div>
                </div>

                <div
                  className="card border-secondary mb-3"
                  style={{
                    maxWidth: "20rem",
                    borderRadius: "1rem",
                    width: "100%",
                    background: "inherit",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Total Likes</h5>
                    <p className="card-text fs-4">68</p>
                  </div>
                </div>
              </Stack>
            </Col>
            <Col>
              <Stack direction="horizontal" gap={3}>
                <div
                  className="card border-secondary mb-3"
                  style={{
                    maxWidth: "20rem",
                    borderRadius: "1rem",
                    width: "100%",
                    background: "inherit",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Followers</h5>
                    <p className="card-text fs-4">2569</p>
                  </div>
                </div>
                <div
                  className="card border-secondary mb-3"
                  style={{
                    maxWidth: "20rem",
                    borderRadius: "1rem",
                    width: "100%",
                    background: "inherit",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Following</h5>
                    <p className="card-text fs-4">2558</p>
                  </div>
                </div>
              </Stack>
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
