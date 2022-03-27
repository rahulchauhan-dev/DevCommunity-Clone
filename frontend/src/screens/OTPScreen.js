import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../actions/userActions";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
const OTPScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOTP] = useState("");
  const [otpResponse, setOtpresponse] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, user.name, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      enteredOTP: otp,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.put(
        "/api/users/verify-otp",
        { data },
        config
      );
      if (response.data.success) {
        alert("EMAIL VERIFIED! Please Re-Login");
        dispatch(logout());
        navigate("/login");
      } else {
        setOtpresponse(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendOTP = async (e) => {
    e.preventDefault();

    const data = user.email;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.put("/api/users/send-otp", { data }, config);
      setOtpresponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="pt-4 text-center" style={{ marginTop: "6rem" }}>
      <Container
        className="justify-content-md-center text-center shadow-lg p-4"
        style={{ maxWidth: "600px", fontWeight: "bold" }}
      >
        <h3>Email Verification</h3>
        {error && <h2>{error}</h2>}
        {loading && <Loader />}

        {user.verified ? (
          <p>You are already Verified!</p>
        ) : (
          <Form
            onSubmit={submitHandler}
            className="mt-4"
            style={{ display: "inline-block" }}
          >
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                disabled
                placeholder={user.email}
                value={user.email || ""}
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
              style={{ borderRadius: "0.5em", fontWeight: "600" }}
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
        )}
      </Container>
    </Container>
  );
};

export default OTPScreen;
