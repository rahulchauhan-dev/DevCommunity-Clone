import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container className="pt-4 text-center" style={{ marginTop: "6rem" }}>
      <Container
        className="justify-content-md-center text-center shadow-lg p-4"
        style={{ maxWidth: "600px", fontWeight: "bold" }}
      >
        <h3>Welcome Back!</h3>
        {error && <h2>{error}</h2>}
        {loading && <Loader />}
        <h4>
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </h4>

        <Form
          onSubmit={submitHandler}
          className="mt-4"
          style={{ display: "inline-block" }}
        >
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <br></br>
          <Form.Group controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br></br>
          <Button
            type="submit"
            className="btn"
            disabled={email === "" || password === ""}
            style={{ borderRadius: "0.5em", fontWeight: "600" }}
          >
            Continue
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default LoginScreen;
