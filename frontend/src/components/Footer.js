import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center pt-3"
      style={{ borderTop: "1px solid lightgrey" }}
    >
      <p>Copyright ©️ HowTo Community 2022</p>
    </Container>
  );
};

export default Footer;
