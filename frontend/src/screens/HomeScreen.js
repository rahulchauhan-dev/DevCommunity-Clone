import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Stack,
  ListGroup,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PostCover from "../components/PostCover";
import { listPosts } from "../actions/postActions";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const params = useParams();

  const keyword = params.keyword;

  const [key, setKey] = useState("relevant");

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  useEffect(() => {
    dispatch(listPosts(keyword));
  }, [dispatch, keyword]);

  return (
    <Container id="home-container" style={{ marginTop: "6rem" }}>
      <Row>
        <Col className="col-12 mb-4 col-lg-3">
          <Stack gap={3}>
            <div
              style={{
                border: "1px solid lightgrey",
                borderRadius: "10px",
                boxShadow: "0 0 1px #333",
                padding: "1rem",
              }}
            >
              <h4>
                <b>
                  HowTo Community is a community of 251,255 amazing developers.
                </b>
              </h4>
              <h5>
                We're a place where coders share, stay up-to-date and grow their
                careers
              </h5>
            </div>

            <div
              style={{
                border: "1px solid lightgrey",
                borderRadius: "10px",
                boxShadow: "0 0 1px #333",
                padding: "1rem",
              }}
            >
              <h4>Popular Tags</h4>
              <ListGroup>
                <ListGroup.Item action variant="info">
                  #javascript
                </ListGroup.Item>
                <ListGroup.Item action variant="info">
                  #react
                </ListGroup.Item>
                <ListGroup.Item action variant="info">
                  #java
                </ListGroup.Item>
                <ListGroup.Item action variant="info">
                  #redux
                </ListGroup.Item>
                <ListGroup.Item action variant="info">
                  #python
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Stack>
        </Col>
        <Col className="col-12 mb-4 col-lg-6" style={{ padding: "0rem" }}>
          <Container className="mb-4" style={{ padding: "0rem" }}>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 px-4"
              variant="pills"
            >
              <Tab eventKey="relevant" title="Relevant">
                <Container>
                  {loading && <Loader />}
                  {error && <h3>{error}</h3>}
                  <Row xs={1} md={1} lg={1}>
                    {posts
                      .sort((a, b) => a.date - b.date)
                      .map((post) => (
                        <Col key={post._id} id="post-cover-col">
                          <PostCover posts={post} />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Tab>

              <Tab eventKey="latest" title="Latest">
                <Container>
                  {loading && <Loader />}
                  {error && <h3>{error}</h3>}
                  <Row xs={1} md={1} lg={1}>
                    {posts
                      .sort((a, b) => b.date - a.date)
                      .map((post) => (
                        <Col key={post._id} id="post-cover-col">
                          <PostCover posts={post} />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Tab>

              <Tab eventKey="top" title="Top">
                <Container>
                  {loading && <Loader />}
                  {error && <h3>{error}</h3>}
                  <Row xs={1} md={1} lg={1}>
                    {posts
                      .sort((a, b) => b.likes.length - a.likes.length)
                      .map((post) => (
                        <Col key={post._id} id="post-cover-col">
                          <PostCover posts={post} />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Tab>
            </Tabs>
          </Container>
        </Col>
        <Col className="col-12 mb-4 col-lg-3">
          <Container
            style={{
              border: "1px solid lightgrey",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 0 1px #333",
            }}
          >
            <h4>
              <b>
                HowTo is built in the open via Forem... Want to take part in the
                discussion? Join Forem.how 🌱
              </b>
            </h4>
          </Container>

          <Container style={{ padding: "1rem" }}>
            <Nav className="flex-column" id="side-bar-nav">
              <LinkContainer to="/">
                <Nav.Link eventKey="home">🏠 Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link eventKey="showcase">👓 Showcase</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link eventKey="discuss">🗣️ Discussions</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link eventKey="achieve">🏆 Achievements</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/code-of-conduct">
                <Nav.Link eventKey="coc">👍 Code of Conduct</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/privacy-policy">
                <Nav.Link eventKey="pp">🤓 Privacy Policy</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/terms-of-use">
                <Nav.Link eventKey="tou">👀 Terms of Use</Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
