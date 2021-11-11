import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, addComment } from '../actions/postAction';
import Message from '../components/Message';
import { POST_COMMENT_RESET } from '../constants/postConstants';

const PostDetailScreen = ({ match }) => {
    const [comment, setComment] = useState('');

    const postId = match.params.id;

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { post, error } = useSelector(state => state.postDetail);

    const { success, error: errorComment } = useSelector(state => state.postComment);

    useEffect(() => {
        if (success) {
            alert('Comment added.')
            setComment('')
            dispatch({ type: POST_COMMENT_RESET })
        }
        if (!post || !post.title) {
            dispatch(getPostDetail(postId))
        }
    }, [dispatch, postId, post, success])

    const addCommentHandler = (e) => {
        e.preventDefault();
        dispatch(addComment(match.params.id, { comment }));
    };

    return (
        <>
            <Link className="btn btn-primary my-3" to="/forums">Go Back</Link>
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row className="justify-content-md-center">
                        <h2 className="text-center mb-5 post-title">{post.title}</h2>
                        <Col md={10}>
                            <Card className="my-3 px-1" border="primary">
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="post-message">
                                        {post.content}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        {errorComment && <Message variant='danger'>{errorComment}</Message>}
                        <Col md={10}>
                            <ListGroup variant="flush">
                                {userInfo ? (
                                    <Form onSubmit={addCommentHandler}>
                                        <Form.Group controlId="comment">
                                            <Form.Label><strong>Add Comment</strong></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                className="rounded"
                                            />
                                        </Form.Group>
                                        <Button type="submit" variant="primary" className="rounded mt-2">Submit</Button>
                                    </Form>
                                ) : (
                                    <Form onSubmit={addCommentHandler}>
                                        <Form.Group controlId="comment">
                                            <Form.Label><strong><Link to="/login">Login</Link> to leave a comment</strong></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                className="rounded"
                                                disabled
                                            />
                                        </Form.Group>
                                        <Button type="submit" variant="primary" className="rounded mt-2" disabled>Submit</Button>
                                    </Form>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col md={10}>
                            <strong>All Comments</strong>
                            <Card className="mt-2 px-1" border="primary">
                                <ListGroup variant="flush">
                                    {post.comments && post.comments.map(cmt => (
                                        <ListGroup.Item key={cmt._id} className="py-3">
                                            <Row>
                                                <Col md={10}>
                                                    <h5><strong>{cmt.username}</strong></h5>
                                                </Col>
                                                <Col>
                                                    {cmt.createdAt.substring(0, 10)}
                                                </Col>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col>
                                                    {cmt.comment}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default PostDetailScreen;