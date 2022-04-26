import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  ListGroup,
  Button,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  faEnvelope,
  faLink,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { listuserPosts } from "../actions/postActions";
import { LinkContainer } from "react-router-bootstrap";

const UserProfile = ({ user }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userposts = useSelector((state) => state.userposts);
  const {
    loading: loadinguserposts,
    error: erroruserposts,
    userposts: postsofuser,
  } = userposts;

  useEffect(() => {
    dispatch(listuserPosts(id));
  }, [dispatch, id]);
  return (
    <>
      <Container
        id="user-profile-container"
        style={{
          border: "1px solid #c2c2c2",
          padding: "1rem",
          borderRadius: "1rem",
          marginRight: "0px",
          marginLeft: "0px",
          backgroundColor: "rgb(22 22 22)",
          color: "white",
        }}
      >
        <Col style={{ position: "relative", marginTop: "-65px" }}>
          <Row className="justify-content-center">
            <img
              alt="postAvatar"
              className="rounded-circle border border-dark shadow"
              src={user.avatar}
              style={{ width: "100px", height: "100px", background: "white" }}
            ></img>
          </Row>

          <Row className="my-4">
            <Stack style={{ alignItems: "center" }}>
              <h2 className="fw-bold">{user.name}</h2>
              <h5>{user.bio !== undefined ? user.bio : "Bio"}</h5>
            </Stack>
          </Row>

          <Row className="justify-content-center">
            <Col md="auto">
              📍 {user.location !== undefined ? user.location : "N/A"}
            </Col>
            <Col md="auto">
              🍰 Joined on{" "}
              {new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(user.date)}
            </Col>
            <Col md="auto">
              <a href={`mailto:${user.email}`} rel="noreferrer" target="_blank">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              &nbsp;&nbsp;&nbsp;
              {user.socials !== undefined ? (
                <a
                  href={user.socials !== undefined ? user.socials : "Link"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLink} />
                </a>
              ) : (
                <FontAwesomeIcon icon={faLink} />
              )}
            </Col>
            <Col md="auto">
              💼 at {user.work !== undefined ? user.work : "N/A"}
            </Col>
          </Row>
          <Row className="justify-content-center m-3">
            <ButtonGroup style={{ width: "fit-content" }}>
              <Button>Follow</Button>

              <Dropdown
                as={ButtonGroup}
                drop="start"
                style={{
                  background: "#e95420",
                  borderTopRightRadius: "0.25rem",
                  borderBottomRightRadius: "0.25rem",
                }}
              >
                <Dropdown.Toggle
                  size="sm"
                  id="remove-caret"
                  style={{ paddingRight: "10px" }}
                >
                  <FontAwesomeIcon icon={faEllipsisV} color="white" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Report Abuse</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
          </Row>
        </Col>
      </Container>

      <Container className="my-4">
        <Row
          style={{
            columnGap: "1rem",
            rowGap: "1rem",
          }}
        >
          <Col md="3" className="p-0">
            <Stack gap={3}>
              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "10px",
                  boxShadow: "rgb(51 51 51) 0px 0px 1px",
                  padding: "1rem",
                  overflowWrap: "break-word",
                }}
              >
                <h6 className="fw-bold">🤹Skills/Languages</h6>
                <p>{user.skills !== undefined ? user.skills : "N/A"}</p>
              </div>

              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "10px",
                  boxShadow: "rgb(51 51 51) 0px 0px 1px",
                  padding: "1rem",
                  overflowWrap: "break-word",
                }}
              >
                <p className="fw-bold">
                  ✍🏻Posts Published &nbsp;
                  {erroruserposts && <p>{erroruserposts}</p>}
                  {postsofuser !== undefined ? postsofuser.length : "NA"}
                </p>
                <p className="fw-bold">
                  ❤️Followers &nbsp;
                  {user.followers !== undefined ? user.followers.length : "N/A"}
                </p>
              </div>

              <div
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "10px",
                  boxShadow: "rgb(51 51 51) 0px 0px 1px",
                  padding: "1rem",
                  overflowWrap: "anywhere",
                }}
              >
                <p className="fw-bold">🗣️Discussions</p>
                <p className="fw-bold">🏆Achievements</p>
                <p className="fw-bold">👓Showcases</p>
              </div>
            </Stack>
          </Col>
          <Col
            style={{
              border: "1px solid lightgrey",
              borderRadius: "10px",
              boxShadow: "rgb(51 51 51) 0px 0px 1px",
              padding: "1rem",
            }}
          >
            <h4>Posts</h4>
            {loadinguserposts ? (
              <Loader />
            ) : erroruserposts ? (
              <p>{erroruserposts}</p>
            ) : postsofuser.length !== 0 ? (
              postsofuser.map((userpost) => (
                <ListGroup.Item key={userpost._id}>
                  <LinkContainer to={`/posts/${userpost._id}`}>
                    <a href="/#">{userpost.title}</a>
                  </LinkContainer>
                </ListGroup.Item>
              ))
            ) : (
              "No Posts Published Yet😔"
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
