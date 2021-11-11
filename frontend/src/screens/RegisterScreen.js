import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const RegisterScreen = ({ location, history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const { userInfo, error } = useSelector(state => state.register);

    const redirect = location.search ? location.search.split('=')[1] : '';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
            } else {
                dispatch(register(username, email, password));
            }
        }
        setValidated(true);
    }

    return (
        <FormContainer>
            <h1 className="text-center">Register</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Card className="card" border="primary" >
                <Card.Img className="card-img" variant="top" src="/images/login.jpg" />
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={submitHandler}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Username required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email" className="py-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Email required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Password required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="py-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Confirm password required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Row className="py-3 text-center">
                <Col>
                    Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;