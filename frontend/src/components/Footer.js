import React from "react";
import { Container, Stack } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center pt-3"
      style={{
        borderTop: "1px solid lightgrey",
      }}
    >
      <Stack className="d-flex justify-content-center align-items-center">
        <p>
          <strong>HowTo Community</strong> — A constructive and inclusive social
          network for software developers. With you every step of your journey.
        </p>
        <p>Made with love and MERN Stack. HowTo Community © 2022.</p>
      </Stack>
    </Container>
  );
};

export default Footer;
