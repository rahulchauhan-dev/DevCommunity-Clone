import React, { useEffect } from "react";
import { Row, Button, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserMyPosts } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { deletePostAction } from "../actions/postActions";
import Loader from "../components/Loader";
import { notify } from "../components/Toast";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMyPosts = useSelector((state) => state.userMyPosts);
  const { loadingMyPosts, errorMyPosts, myposts } = userMyPosts;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

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
      notify("Post Deleted!");
      dispatch({ type: "POST_DELETE_RESET" });
      dispatch(getUserMyPosts());
    }
    if (successCreate) {
      notify("Post Created!");
      dispatch(getUserMyPosts());
    }

    if (!userInfo) {
      navigate("/login");
    } else if (!userInfo.verified) {
      navigate("/email-verify");
    } else {
      if (!user.name) {
        dispatch(getUserMyPosts("profile"));
      }
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    myposts,
    successDelete,
    successCreate,
    user,
  ]);

  const deletePostHandler = (id) => {
    dispatch(deletePostAction(id));
  };
  return (
    <div>
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
          {myposts.length === 0 ? (
            <Container className="p-3 text-center">
              <img
                src="/svg/empty-board.svg"
                alt="empty-board"
                width="200px"
                style={{ padding: "2rem" }}
              ></img>
              <h5>
                This is where you can manage your posts, but you haven't written
                anything yet.
              </h5>
            </Container>
          ) : (
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
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default Posts;
