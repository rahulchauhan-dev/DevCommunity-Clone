import React from 'react'
import { Container, Row, Col, Stack, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'

const PostCover = ({ posts }) => {


    return (
        <Container id="post-cover-container" style={{ marginBottom: '2rem', border: '1px solid lightgrey', borderRadius: '10px', padding: '0', paddingBottom: '1rem', boxShadow: '0 0 1px #333' }}>
            <Stack gap={3}>
                <Container id="post-cover-img-container" style={{ padding: '0' }}><img alt="postImage" style={{ width: '100%', height: '300px', borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} id="post-cover-img" src={posts.postImage}></img></Container>
                <Container>
                    <Row style={{ paddingBottom: '8px', borderBottom: '1px solid lightgrey' }}>
                        <Col md="auto" style={{ alignSelf: 'center' }}><img alt="postAvatar" className="rounded-circle border border-dark shadow" src={posts.user.avatar} style={{ width: '40px', height: '40px' }}></img></Col>
                        <Col md="auto" id="username" style={{ paddingTop: '10px' }}>
                            <Row>{posts.user.name}</Row>
                            <Row style={{ fontSize: 'small' }}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(posts.date)}</Row>
                        </Col>
                    </Row>
                </Container>
                <LinkContainer to={`posts/${posts._id}`}>
                    <Container id="post-cover-title-container" style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}><h1><a href="/#" style={{ textDecoration: 'none', fontWeight: 'bold' }}>{posts.title}</a></h1></Container></LinkContainer>
                <Container>
                    {posts.tags && posts.tags.split(",").map(tag => (
                        <> <Badge key={posts._id} bg="white" text="black" style={{ padding: '5px 8px 0px', border: '1px solid lightcoral' }}>
                            <h6>{'#'}{tag}</h6>
                        </Badge>{' '}
                        </>
                    ))}
                </Container>
                <Container id="post-cover-like-comment">
                    <Row style={{ width: 'fit-content', fontSize: '12px' }}>
                        <Col><FontAwesomeIcon icon={faHeart} size='2x' /><h3 style={{ display: 'inline' }}>{(posts.likes).length}</h3></Col>
                        <Col><FontAwesomeIcon icon={faComment} size='2x' /><h3 style={{ display: 'inline' }}>{(posts.comments).length}</h3></Col>
                    </Row>
                </Container>
            </Stack>
        </Container>
    )
}

export default PostCover
