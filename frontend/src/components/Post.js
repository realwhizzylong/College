import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const dateArray = post.updatedAt.split("T")[0].split("-");

    return (
        <Card className="rounded">
            <Row>
                <Col>
                    <Card.Body>
                        <Row>
                            <Col md={10}>
                                <Link to={`/posts/${post._id}`}>
                                    <Card.Title as="div">
                                        <h5><strong>{post.title}</strong></h5>
                                    </Card.Title>
                                </Link>
                            </Col>
                            <Col>
                                <Card.Text as="div">
                                    {post.comments.length} comments
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <Card.Text as="div" className="text-muted">
                                    <strong>{post.username}</strong>
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text as="div">
                                    {dateArray[1]}-{dateArray[2]}-{dateArray[0]}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default Post;