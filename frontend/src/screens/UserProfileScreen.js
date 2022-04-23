import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import UserProfile from "../components/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { userPublicProfileAction } from "../actions/userActions";
const UserProfileScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userPublicProfile = useSelector((state) => state.userPublicProfile);
  const { loading, error, user } = userPublicProfile;

  useEffect(() => {
    dispatch(userPublicProfileAction(id));
  }, [dispatch, id]);

  return (
    <Container className="container-fluid" style={{ marginTop: "9rem" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <UserProfile user={user} />
      )}
    </Container>
  );
};

export default UserProfileScreen;
