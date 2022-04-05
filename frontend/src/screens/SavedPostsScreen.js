import React, { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listSavedPosts } from "../actions/userActions";
import Loader from "../components/Loader";

const SavedPostsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savedPost = useSelector((state) => state.savedPost);
  const { loading, error, posts } = savedPost;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(listSavedPosts(userInfo._id));
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Container style={{ marginTop: "6rem" }}>
      <h2>Bookmarked Posts</h2>
      <Container
        className="mt-3"
        style={{
          border: "1px solid lightgrey",
          borderRadius: "10px",
          boxShadow: "0 0 1px #333",
          padding: "1rem",
        }}
      >
        <ListGroup as="ol" numbered>
          {loading && <Loader />}
          {error && <p>{error}</p>}
          {posts.length === 0 ? (
            <Container className="p-3 text-center">
              <img
                src="/svg/empty-board.svg"
                alt="empty-board"
                width="200px"
                style={{ padding: "2rem" }}
              ></img>
              <h5>
                This is where you can manage your bookmarked posts, but you
                haven't bookmarked anything yet.
              </h5>
            </Container>
          ) : (
            posts.map((post) => (
              <ListGroup.Item key={post.post._id} as="li">
                <LinkContainer to={`/posts/${post.post._id}`}>
                  <a href="/#">{post.post.title}</a>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Container>
    </Container>
  );
};

export default SavedPostsScreen;
