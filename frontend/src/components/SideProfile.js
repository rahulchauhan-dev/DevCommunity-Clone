import React from "react";
import { Button, Container, Stack, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SideProfile = ({ post }) => {
  return (
    <Container>
      <Col>
        <Row>
          <Stack gap={2}>
            <div>
              <Stack direction="horizontal" gap={2}>
                <div>
                  <img
                    alt="postAvatar"
                    className="rounded-circle border border-dark shadow"
                    src={post && post.user ? post.user.avatar : null}
                    style={{ width: "40px", height: "40px" }}
                  ></img>
                </div>
                <div>
                  <LinkContainer
                    to={`/users/${post && post.user ? post.user._id : null}`}
                  >
                    <a href="/#" style={{ padding: "0 !important" }}>
                      {post && post.user ? post.user.name : null}
                    </a>
                  </LinkContainer>
                </div>
              </Stack>
            </div>
            <div>
              <Button type="button" style={{ width: "100%" }}>
                Follow
              </Button>
            </div>
            <div
              style={{
                overflowWrap: "break-word",
                wordWrap: "break-word",
                hyphens: "auto",
              }}
            >
              <Col>
                <Row>
                  <p>{post && post.user ? post.user.bio : null}</p>
                </Row>
                <Row>
                  <h6 className="text-muted">LOCATION</h6>
                  <h6>{post && post.user ? post.user.location : null}</h6>
                </Row>
                <Row>
                  <h6 className="text-muted">WORK</h6>
                  <h6>{post && post.user ? post.user.work : null}</h6>
                </Row>
                <Row>
                  <h6 className="text-muted">JOINED</h6>
                  <h6>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(post && post.user ? post.user.date : null)}
                  </h6>
                </Row>
              </Col>
            </div>
          </Stack>
        </Row>
      </Col>
    </Container>
  );
};

export default SideProfile;
