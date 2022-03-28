import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Stack,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Badge,
  Dropdown,
  Modal,
} from "react-bootstrap";
import {
  detailPost,
  commentPostAction,
  listuserPosts,
  likePostAction,
  unlikePostAction,
  savePostAction,
  unsavePostAction,
  createReportAction,
} from "../actions/postActions";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as heartunLike,
  faBookmark as markunsaved,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faHeart as heartLike,
  faBookmark as marksaved,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import Discussion from "../components/Discussion";
import SideProfile from "../components/SideProfile";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { getUserDetails } from "../actions/userActions";

const PostScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nooflike, setNoOfLike] = useState(0);
  const [comment, setComment] = useState();

  const [showModal, setShowModal] = useState(false);

  const [reportRadio, setReportRadio] = useState("");
  const [reportMesaage, setReportMessage] = useState("");

  const postDetail = useSelector((state) => state.postDetail);
  const { loading, error, post } = postDetail;

  const commentPost = useSelector((state) => state.commentPost);
  const { success: successComment, error: errorComment } = commentPost;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userposts = useSelector((state) => state.userposts);
  const {
    loading: loadinguserposts,
    error: erroruserposts,
    userposts: postsofuser,
  } = userposts;

  const likePost = useSelector((state) => state.likePost);
  const { success: successLike } = likePost;

  const unlikePost = useSelector((state) => state.unlikePost);
  const { success: successUnlike } = unlikePost;

  const savePost = useSelector((state) => state.savePost);
  const { success: successSaved } = savePost;

  const unsavePost = useSelector((state) => state.unsavePost);
  const { success: successUnsaved } = unsavePost;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const reportPost = useSelector((state) => state.reportPost);
  const { success: successReport, loading: loadingReport } = reportPost;

  useEffect(() => {
    if (successComment) {
      setComment("");
      dispatch({ type: "POST_COMMENT_RESET" });
    }

    dispatch(getUserDetails("profile"));
    dispatch(detailPost(id));

    if (successLike) {
      setLike(true);
    }
    if (successUnlike) {
      setLike(false);
    }

    if (successSaved) {
      setSaved(true);
    }
    if (successUnsaved) {
      setSaved(false);
    }
  }, [
    dispatch,
    id,
    successComment,
    successUnlike,
    successLike,
    successUnsaved,
    successSaved,
  ]);

  useEffect(() => {
    if (post && post.user) {
      if (post.user._id) {
        dispatch(listuserPosts(post.user._id));
      }
    }
  }, [dispatch, post]);

  useEffect(() => {
    if (post && userInfo) {
      if (post.likes) {
        if (post.likes.filter((e) => e.user === userInfo._id).length > 0) {
          setLike(true);
          setNoOfLike(post.likes.length);
        } else {
          setLike(false);
          setNoOfLike(post.likes.length);
        }
      }
    }
    if (post && userInfo) {
      if (post.likes) {
        if (post.likes.filter((e) => e.user === userInfo._id).length === 0) {
          setLike(false);
          setNoOfLike(post.likes.length);
        } else {
          setLike(true);
          setNoOfLike(post.likes.length);
        }
      }
    }
  }, [post, userInfo]);

  useEffect(() => {
    if (user && post) {
      if (user.savedPost) {
        if (user.savedPost.filter((e) => e.post === post._id).length > 0) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      }
    }
    if (user && post) {
      if (user.savedPost) {
        if (user.savedPost.filter((e) => e.post === post._id).length === 0) {
          setSaved(false);
        } else {
          setSaved(true);
        }
      }
    }
  }, [post, user]);

  useEffect(() => {
    if (post && !userInfo) {
      if (post.likes) {
        setNoOfLike(post.likes.length);
      }
    }
  }, [post, userInfo]);

  const commentHandler = () => {
    if (!userInfo) {
      alert("Please Login to Add a Discussion");
    } else {
      dispatch(commentPostAction({ comment }, post._id));
    }
  };

  const likeHandler = () => {
    if (!userInfo) {
      alert("Please Login to Like a Post");
    } else {
      dispatch(likePostAction(id));
    }
  };

  const unlikeHandler = () => {
    if (!userInfo) {
      alert("Please Login to Like a Post");
    } else {
      dispatch(unlikePostAction(id));
    }
  };

  const saveHandler = () => {
    if (!userInfo) {
      alert("Please Login to Save a Post");
    } else {
      dispatch(savePostAction(id));
    }
  };

  const unsaveHandler = () => {
    if (!userInfo) {
      alert("Please Login to Save a Post");
    } else {
      dispatch(unsavePostAction(id));
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleRadioChange = (e) => {
    e.preventDefault();
    setReportRadio(e.target.value);
  };

  const reportHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReportAction(
        {
          postId: post._id,
          userId: post && post.user ? post.user._id : null,
          reportBody: reportMesaage,
          reportCategory: reportRadio,
        },
        post._id
      )
    );
  };

  useEffect(() => {
    if (successReport) {
      handleClose();
      alert("Report Added");
    }
  }, [successReport]);

  return (
    <>
      <Container className="p-3">
        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <b>Report abuse</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Thank you for reporting any abuse that violates our code of conduct
            or terms and conditions. We continue to try to make this environment
            a great one for everybody.
            <Form>
              <Form.Group className="my-3">
                <Form.Check
                  type="radio"
                  id="1"
                  name="radioOption"
                  label="Rude or vulgar"
                  value="Rude or vulgar"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  id="2"
                  name="radioOption"
                  label="Harassment or hate speech"
                  value="Harassment or hate speech"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  id="3"
                  name="radioOption"
                  label="Spam or copyright issue"
                  value="Spam or copyright issue"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  id="4"
                  name="radioOption"
                  label="Inappropriate listings message/category"
                  value="Inappropriate listings message/category"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  id="5"
                  name="radioOption"
                  label="Other"
                  value="Other"
                  onChange={handleRadioChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  <b>Reported Post Id</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={post._id}
                  aria-label="Disabled input example"
                  readOnly
                />
                <Form.Label>
                  <b>Posted By</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={post && post.user ? post.user.name : null}
                  aria-label="Disabled input example"
                  readOnly
                />
                <Form.Label>
                  <b>Message</b>
                  <br></br>
                  Please provide any additional information or context that will
                  help us understand and handle the situation.
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reportMesaage}
                  onChange={(e) => setReportMessage(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={reportHandler}>
              Send Feedback
            </Button>
            {loadingReport && <p>Creating Report...</p>}
          </Modal.Footer>
        </Modal>
        <Row>
          <Col
            className="col-md-8"
            style={{ marginBottom: "2rem", marginTop: "6rem" }}
          >
            {loading ? (
              <Loader />
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <>
                <Container
                  style={{
                    border: "1px solid lightgrey",
                    padding: "0",
                    borderRadius: "10px",
                    boxShadow: "0 0 1px #333",
                  }}
                >
                  <Stack gap={3}>
                    <Container style={{ overflow: "hidden", padding: "0" }}>
                      <img
                        alt="postImage"
                        id="post-screen-thumbnail"
                        style={{
                          width: "854px",
                          height: "400px",
                          borderTopRightRadius: "5px",
                          borderTopLeftRadius: "5px",
                        }}
                        src={post.postImage}
                      ></img>
                    </Container>
                    <Container>
                      <Row
                        style={{
                          paddingBottom: "8px",
                          borderBottom: "1px solid lightgrey",
                        }}
                      >
                        <Col md="auto" style={{ alignSelf: "center" }}>
                          <img
                            alt="postAvatar"
                            className="rounded-circle border border-dark shadow"
                            src={post && post.user ? post.user.avatar : null}
                            style={{ width: "40px", height: "40px" }}
                          ></img>
                        </Col>
                        <Col
                          md="auto"
                          id="username"
                          style={{ paddingTop: "10px" }}
                        >
                          <Row>{post && post.user ? post.user.name : null}</Row>
                          <Row style={{ fontSize: "small" }}>
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }).format(post.date)}
                          </Row>
                        </Col>
                      </Row>
                    </Container>

                    <Container
                      style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      <h1
                        style={{ textDecoration: "none", fontWeight: "bold" }}
                      >
                        {post.title}
                      </h1>
                    </Container>
                    <Container
                      style={{
                        borderBottom: "1px solid lightgrey",
                        paddingBottom: "2rem",
                      }}
                    >
                      {post.tags &&
                        post.tags.split(",").map((tag) => (
                          <>
                            {" "}
                            <Badge
                              key={post._id}
                              bg="light"
                              text="black"
                              style={{ padding: "5px 8px 0px" }}
                            >
                              <h6>
                                {"#"}
                                {tag}
                              </h6>
                            </Badge>{" "}
                          </>
                        ))}
                    </Container>
                    <Container
                      style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                        paddingBottom: "8px",
                        borderBottom: "1px solid lightgrey",
                      }}
                    >
                      <div className="post-text-body">
                        {post && post.desc ? parse(post.desc) : null}
                      </div>
                    </Container>
                    <Container
                      className="my-3"
                      style={{
                        borderBottom: "1px solid lightgrey",
                        paddingBottom: "2rem",
                      }}
                    >
                      <Row>
                        {like && (
                          <Col>
                            <Button
                              type="button"
                              onClick={unlikeHandler}
                              style={{ display: "contents" }}
                            >
                              <FontAwesomeIcon
                                icon={heartLike}
                                size="2x"
                                color="red"
                              />
                            </Button>
                            <h2
                              style={{ display: "inline", fontWeight: "bold" }}
                            >
                              {nooflike}
                            </h2>
                          </Col>
                        )}
                        {!like && (
                          <Col>
                            <Button
                              type="button"
                              onClick={likeHandler}
                              style={{ display: "contents" }}
                            >
                              <FontAwesomeIcon
                                icon={heartunLike}
                                size="2x"
                                color="red"
                              />
                            </Button>
                            <h2
                              style={{ display: "inline", fontWeight: "bold" }}
                            >
                              {nooflike}
                            </h2>
                          </Col>
                        )}

                        {saved && (
                          <Col className="col-2">
                            <Button
                              type="button"
                              onClick={unsaveHandler}
                              style={{ display: "contents" }}
                            >
                              <FontAwesomeIcon
                                icon={marksaved}
                                size="2x"
                                color="orange"
                              />
                            </Button>
                          </Col>
                        )}
                        {!saved && (
                          <Col className="col-2">
                            <Button
                              type="button"
                              onClick={saveHandler}
                              style={{ display: "contents" }}
                            >
                              <FontAwesomeIcon
                                icon={markunsaved}
                                size="2x"
                                color="orange"
                              />
                            </Button>
                          </Col>
                        )}
                        <Col className="col-1">
                          <Dropdown drop="start">
                            <Dropdown.Toggle size="sm" id="remove-caret">
                              <FontAwesomeIcon
                                icon={faEllipsisV}
                                color="#c27c63"
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={handleShow}>
                                Report Abuse
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </Container>
                    <Container>
                      <Row className="my-3">
                        <h3 style={{ fontWeight: "700" }}>
                          Discussions ({post.comments.length})
                        </h3>
                      </Row>
                      {errorComment && <p>{errorComment}</p>}
                      <Row className="mb-3">
                        <Col
                          md="auto"
                          style={{ alignSelf: "center", paddingBottom: "10px" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="40"
                            height="40"
                            viewBox="0 0 172 172"
                            style={{ fill: "#000000" }}
                          >
                            <g
                              fill="none"
                              fill-rule="nonzero"
                              stroke="none"
                              stroke-width="1"
                              stroke-linecap="butt"
                              stroke-linejoin="miter"
                              stroke-miterlimit="10"
                              stroke-dasharray=""
                              stroke-dashoffset="0"
                              font-family="none"
                              font-weight="none"
                              font-size="none"
                              text-anchor="none"
                              style={{ mixBlendMode: "normal" }}
                            >
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g fill="#dd4814">
                                <path d="M86,8.0625c-43,0 -77.9375,34.9375 -77.9375,77.9375c0,43 34.9375,77.9375 77.9375,77.9375c43,0 77.9375,-34.9375 77.9375,-77.9375c0,-43 -34.9375,-77.9375 -77.9375,-77.9375zM86,16.125c38.56562,0 69.875,31.30937 69.875,69.875c0,38.56562 -31.30938,69.875 -69.875,69.875c-38.56563,0 -69.875,-31.30938 -69.875,-69.875c0,-38.56563 31.30937,-69.875 69.875,-69.875zM96.34845,49.66626c-1.58101,0.11968 -2.99194,1.12749 -3.49585,2.73999l-21.5,64.5c-0.67187,2.15 0.5375,4.43542 2.6875,5.1073c0.40313,0.26875 0.80678,0.2677 1.2099,0.2677c1.74688,0 3.22605,-1.07447 3.76355,-2.82135l21.5,-64.5c0.67188,-2.15 -0.40365,-4.43543 -2.55365,-5.1073c-0.5375,-0.16797 -1.08445,-0.22623 -1.61145,-0.18634zM59.17487,67.10352c-1.02461,-0.05039 -2.06496,0.2845 -2.87121,1.02356l-16.25885,14.91772c-0.80625,0.80625 -1.34375,1.8802 -1.34375,2.9552c0,1.075 0.5375,2.14895 1.34375,2.9552l16.25885,14.91772c0.80625,0.67188 1.74688,1.07343 2.6875,1.07343c1.075,0 2.14895,-0.40312 2.9552,-1.34375c1.47813,-1.6125 1.3448,-4.16457 -0.2677,-5.6427l-13.03595,-11.9599l13.03595,-11.9599c1.6125,-1.47813 1.74582,-4.0302 0.2677,-5.6427c-0.73906,-0.80625 -1.74688,-1.24349 -2.77148,-1.29388zM112.95898,67.10352c-1.02461,0.05039 -2.03242,0.48763 -2.77148,1.29388c-1.47812,1.6125 -1.3448,4.16457 0.2677,5.6427l13.03595,11.9599l-13.03595,11.9599c-1.74688,1.47812 -1.87968,4.0302 -0.40155,5.6427c0.80625,0.80625 1.8802,1.34375 2.9552,1.34375c0.94063,0 2.01563,-0.40155 2.6875,-1.07343l16.25885,-14.91772c0.80625,-0.80625 1.34375,-1.8802 1.34375,-2.9552c0,-1.075 -0.5375,-2.14895 -1.34375,-2.9552l-16.125,-14.91772c-0.80625,-0.73906 -1.84661,-1.07395 -2.87122,-1.02356z"></path>
                              </g>
                            </g>
                          </svg>
                        </Col>
                        <Col>
                          <Form
                            onSubmit={commentHandler}
                            style={{ display: "flex" }}
                          >
                            <Form.Control
                              as="textarea"
                              type="name"
                              placeholder="Add to the Discussion"
                              value={comment || ""}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                            <Button
                              type="submit"
                              style={{
                                background: "transparent",
                                border: "none",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faAngleRight}
                                size="2x"
                                color="orange"
                              />
                            </Button>
                          </Form>
                        </Col>
                      </Row>
                      {post.comments.length === 0 ? (
                        <h5>No Discussions Yet.</h5>
                      ) : (
                        post.comments.map((comment) => (
                          <Col key={comment._id}>
                            <Discussion comments={comment} />
                          </Col>
                        ))
                      )}
                    </Container>
                  </Stack>
                </Container>
              </>
            )}
          </Col>

          <Col
            className="col-md-4"
            id="side-profile-screen"
            style={{ marginBottom: "2rem", marginTop: "6rem" }}
          >
            {loading ? (
              <Loader />
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <>
                <Container
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "10px",
                    boxShadow: "0 0 1px #333",
                    padding: "1rem",
                  }}
                >
                  <SideProfile post={post} />
                </Container>

                <Container
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "10px",
                    boxShadow: "0 0 1px #333",
                    padding: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  <Stack gap={2}>
                    <div>
                      <h5>
                        More from {post && post.user ? post.user.name : null}
                      </h5>
                    </div>
                    <div>
                      <ListGroup variant="flush">
                        {loadinguserposts && <Loader />}
                        {erroruserposts && <p>{erroruserposts}</p>}
                        {postsofuser
                          .filter((postid) => postid._id !== id)
                          .map((userpost) => (
                            <ListGroup.Item>
                              <LinkContainer to={`/posts/${userpost._id}`}>
                                <a href="/#">{userpost.title}</a>
                              </LinkContainer>
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </div>
                  </Stack>
                </Container>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostScreen;
