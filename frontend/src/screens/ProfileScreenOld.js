import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
  getUserMyPosts,
} from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { deletePostAction } from "../actions/postActions";
import Loader from "../components/Loader";

const ProfileScreenOld = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [work, setWork] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userMyPosts = useSelector((state) => state.userMyPosts);
  const { loadingMyPosts, errorMyPosts, myposts } = userMyPosts;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const deletePost = useSelector((state) => state.deletePost);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deletePost;

  const createPost = useSelector((state) => state.createPost);
  const { success: successCreate } = createPost;

  useEffect(() => {
    dispatch({ type: "POST_CREATE_RESET" });
    dispatch({ type: "POST_UPDATE_RESET" });

    if (successDelete) {
      dispatch({ type: "POST_DELETE_RESET" });
      dispatch(getUserMyPosts());
    }
    if (successCreate) {
      dispatch(getUserMyPosts());
    }

    if (!userInfo) {
      navigate("/login");
    } else if (!userInfo.verified) {
      navigate("/email-verify");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getUserMyPosts());
      } else {
        setName(user.name);
        setEmail(user.email);
        setBio(user.bio);
        setAvatar(user.avatar);
        setWork(user.work);
        setLocation(user.location);
      }
    }
  }, [
    dispatch,
    user,
    userInfo,
    navigate,
    myposts,
    successDelete,
    successCreate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        bio,
        work,
        location,
      })
    );
  };

  const deletePostHandler = (id) => {
    dispatch(deletePostAction(id));
  };

  return (
    <>
      <Container style={{ marginTop: "6rem" }}>
        <Row>
          <Col md={3}>
            <h2>Profile</h2>

            {loading ? (
              <Loader />
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              <>
                <Row style={{ justifyContent: "center", margin: "2rem" }}>
                  <img
                    alt="postAvatar"
                    className="rounded-circle border border-dark shadow"
                    src={avatar}
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                </Row>
                <Row>
                  <Form
                    onSubmit={submitHandler}
                    style={{ marginBottom: "2rem" }}
                  >
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>{" "}
                    <br></br>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="bio">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="name"
                        placeholder="Enter Bio"
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="work">
                      <Form.Label>Work At</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter Work"
                        value={work || ""}
                        onChange={(e) => setWork(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="location">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter Location"
                        value={location || ""}
                        onChange={(e) => setLocation(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="primary"
                      style={{ marginTop: "2rem" }}
                    >
                      Update
                    </Button>
                    {success && <h2>UPDATED!</h2>}
                  </Form>
                </Row>
              </>
            )}
          </Col>
          <Col md={9}>
            <h2>My Posts</h2>
            {loadingDelete && <Loader />}
            {errorDelete && <p>{errorDelete}</p>}
            {loadingMyPosts ? (
              <Loader />
            ) : errorMyPosts ? (
              <h2>{errorMyPosts}</h2>
            ) : (
              <>
                {" "}
                <Row
                  style={{
                    marginTop: "2rem",
                    marginRight: "12px",
                    marginLeft: "12px",
                    justifyContent: "flex-end",
                    width: "fit-content",
                  }}
                >
                  <LinkContainer to="/addpost">
                    <Button variant="outline-primary">Add Post</Button>
                  </LinkContainer>
                </Row>
                <Row>
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="table-sm"
                    style={{ marginTop: "1rem" }}
                  >
                    <thead>
                      <tr>
                        <th>DATE</th>
                        <th>TITLE</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {myposts.map((mypost) => (
                        <tr key={mypost._id}>
                          <td>
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }).format(mypost.date)}
                          </td>
                          <td>
                            <LinkContainer to={`/posts/${mypost._id}`}>
                              <a href="/#">{mypost.title}</a>
                            </LinkContainer>
                          </td>
                          <td>
                            <LinkContainer to={`/editpost/${mypost._id}`}>
                              <Button className="btn-sm" variant="light">
                                Edit
                              </Button>
                            </LinkContainer>
                          </td>
                          <td>
                            <Button
                              className="btn-sm"
                              onClick={() => deletePostHandler(mypost._id)}
                              variant="light"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>{" "}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreenOld;
