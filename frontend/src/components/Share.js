import React from "react";
import { Container } from "react-bootstrap";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { RedditIcon, RedditShareButton } from "react-share";

const Share = ({ props }) => {
  return (
    <Container
      className="p-0"
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      <FacebookShareButton
        url={window.location.href}
        quote={`${props.title} By: ${props.user}`}
        hashtag={"#howtocommunity"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        title={props.title}
        url={window.location.href}
        hashtags={props.tags}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <RedditShareButton
        title={props.title}
        url={window.location.href}
        hashtags={props.tags}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
    </Container>
  );
};

export default Share;
