import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { changePassword, logout } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ChangePasswordScreen = ({ history }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { success } = useSelector(state => state.userUpdateProfile);

    useEffect(() => {
        if (!userInfo || success) {
            history.push('/login')
        }
    }, [userInfo, history, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (newPassword.length === 0) {
            setMessage("New password cannot be empty")
        } else if (confirmPassword !== newPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(changePassword({ id: userInfo._id, newPassword }))
            setUpdate(true)
            setTimeout(() => {
                dispatch(logout())
            }, 1500)
        }
    };

    return (
        <FormContainer>
            <h2 className="text-center py-3">Change Password</h2>
            {message && <Message variant="danger">{message}</Message>}
            {update && <Message variant="success">Password Changed</Message>}
            <Card className="card" border="primary" >
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="py-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password again"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">
                                Change Password
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Row className="py-3 text-center">
                <Col>
                    <Link to='/profile'>Back To Profile</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default ChangePasswordScreen;