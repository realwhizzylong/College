import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, updatePost } from '../actions/postAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { POST_UPDATE_RESET } from '../constants/postConstants';

const PostEditScreen = ({ match, history }) => {
    const postId = match.params.id;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [update, setUpdate] = useState(false);
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const { post, error } = useSelector(state => state.postDetail);

    const { success, error: errorUpdate } = useSelector(state => state.postUpdate);

    useEffect(() => {
        if (success) {
            dispatch({ type: POST_UPDATE_RESET })
            setTimeout(() => {
                history.push('/myposts')
            }, 1000)
        } else {
            if (!postId || post._id !== postId) {
                dispatch(getPostDetail(postId));
            } else {
                setTitle(post.title);
                setContent(post.content);
            }
        }
    }, [dispatch, success, postId, post, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(updatePost({
                _id: postId,
                title,
                content
            }));
            setUpdate(true)
        }
        setValidated(true)
    };

    return (
        <FormContainer>
            <h2 className="text-center py-3">Update Post</h2>
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    {update && <Message variant="success">Post Updated</Message>}
                    <Card className="card" border="primary" >
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={submitHandler}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title of this post"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Title required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="content" className="py-3">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="5"
                                        placeholder="Enter content of this post"
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Content required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="primary">
                                        Update Post
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            )}
            <Row className="py-3 text-center">
                <Col>
                    <Link to='/myposts'>Go Back To My Posts</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default PostEditScreen;