import React from "react";
import { Container } from "react-bootstrap";

const Page404 = () => {
  return (
    <Container className="mt-5 text-center">
      <img
        src="/svg/404.svg"
        alt="404"
        width="300px"
        style={{ marginTop: "4rem" }}
      ></img>
    </Container>
  );
};

export default Page404;
