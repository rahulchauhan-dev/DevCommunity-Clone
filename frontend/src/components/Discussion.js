import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Discussion = ({ comments }) => {
    return (
        <Container className='p-3'>

            <Row>
                <Col md="auto" style={{ alignSelf: 'center' }}><img alt="postAvatar" className="rounded-circle border border-dark shadow" src={comments.avatar} style={{ width: '40px', height: '40px' }}></img></Col>
                <Col>
                    <Row>{comments.name}</Row>
                    <Row className='border p-3 rounded'>{comments.text}</Row>
                </Col>
            </Row>




        </Container>
    )
}

export default Discussion
