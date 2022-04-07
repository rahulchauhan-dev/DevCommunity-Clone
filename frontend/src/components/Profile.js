import React, { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (status) => {
    toast(status, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [work, setWork] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (success) {
      notify("Profile Updated!");
      dispatch(getUserDetails("profile"));
      dispatch({ type: "USER_UPDATE_RESET" });
    }

    if (!userInfo) {
      navigate("/login");
    } else if (!userInfo.verified) {
      navigate("/email-verify");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setBio(user.bio);
        setAvatar(user.avatar);
        setWork(user.work);
        setLocation(user.location);
      }
    }
  }, [dispatch, user, userInfo, navigate, success]);

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

  return (
    <div>
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
            <Form onSubmit={submitHandler} style={{ marginBottom: "2rem" }}>
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
                  disabled
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
            </Form>
          </Row>
        </>
      )}
    </div>
  );
};

export default Profile;
