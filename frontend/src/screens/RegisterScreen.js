import React, { useState, useEffect } from "react";
import { Container, Button, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, gender, email, password));
  };

  return (
    <Container className="pt-4 text-center" style={{ marginTop: "6rem" }}>
      <Container
        className="justify-content-md-center text-center shadow-lg p-4"
        style={{ maxWidth: "600px", fontWeight: "bold", borderRadius: "2rem" }}
      >
        <h3>Welcome to HowTo Community</h3>
        <h4>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </h4>
        {error && <h2>{error}</h2>}
        {loading && <Loader />}
        <Form
          onSubmit={submitHandler}
          className="mt-4"
          style={{ display: "inline-block" }}
        >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <br></br>
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <FloatingLabel
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              controlId="floatingSelect"
              label="For Generating Avatar"
            >
              <Form.Select aria-label="Floating label select example">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>{" "}
          <br></br>
          <Form.Group controlId="email">
            <Form.Label>
              Enter Valid Email<br></br>(verification in next step)
            </Form.Label>
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
            disabled={
              email === "" || password === "" || name === "" || gender === ""
            }
            style={{ borderRadius: "0.5em", fontWeight: "600" }}
          >
            Continue
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default RegisterScreen;
