import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../actions/postAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { POST_CREATE_RESET } from '../constants/postConstants';

const NewPostScreen = ({ history }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { success, error } = useSelector(state => state.postCreate);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (success) {
            dispatch({ type: POST_CREATE_RESET })
            history.push('/myposts')
        }
    }, [dispatch, userInfo, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(createPost({
                user: userInfo._id,
                title,
                content
            }))
        }
        setValidated(true)
    };

    return (
        <FormContainer>
            <h2 className="text-center py-3">New Post</h2>
            {error && <Message variant="danger">{error}</Message>}
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
                                Create Post
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Row className="py-3 text-center">
                <Col>
                    <Link to='/forums'>Go Back To Forums</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default NewPostScreen;