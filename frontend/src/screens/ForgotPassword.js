import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [otp, setOTP] = useState("");
  const [otpResponse, setOtpresponse] = useState("");

  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === cpassword) {
      const data = {
        email: email,
        enteredOTP: otp,
        newPassword: password,
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.put(
          "/api/users/verify-password-otp",
          { data },
          config
        );
        if (response.data.success) {
          alert("Password has been Changed! Please Login");
          navigate("/login");
        } else {
          setOtpresponse(response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Passwords dont Match!");
    }
  };
  const sendOTP = async (e) => {
    e.preventDefault();

    const data = email;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        "/api/users/forgot-password-otp",
        { data },
        config
      );
      setOtpresponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="pt-4 text-center" style={{ marginTop: "6rem" }}>
      <Container
        className="justify-content-md-center text-center shadow-lg p-4"
        style={{ maxWidth: "600px", fontWeight: "bold", borderRadius: "2rem" }}
      >
        <h3>Forgot Password</h3>
        <Form
          onSubmit={submitHandler}
          className="mt-4"
          style={{ display: "inline-block" }}
        >
          <Form.Group controlId="email">
            <Form.Label>Enter Registered Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <br></br>
          <Form.Group controlId="otp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="name"
              placeholder=""
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br></br>
          <Button
            onClick={sendOTP}
            className="btn"
            style={{
              borderRadius: "0.5em",
              fontWeight: "600",
              marginRight: "1rem",
            }}
          >
            Send OTP
          </Button>
          <Button
            type="submit"
            className="btn"
            disabled={otp === ""}
            style={{ borderRadius: "0.5em", fontWeight: "600" }}
          >
            Verify
          </Button>
          <p>{otpResponse && otpResponse}</p>
        </Form>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
