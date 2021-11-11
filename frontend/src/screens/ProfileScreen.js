import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getProfile, updateProfile } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState(null);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { user, error } = useSelector(state => state.userProfile);

    const { success } = useSelector(state => state.userUpdateProfile);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.username || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getProfile())
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setGender(user.gender)
                setLocation(user.location)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (username.length === 0) {
            setMessage("Username cannot be empty")
        } else {
            dispatch(updateProfile({ id: user._id, username, email, gender, location }))
            setUpdate(true)
        }
    };

    return (
        <FormContainer>
            <h2 className="text-center py-3">Update Profile</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {update && <Message variant="success">Profile Updated</Message>}
            <Card className="card" border="primary" >
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="py-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={email}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                className="form-select rounded"
                                value={gender || ''}
                                onChange={e => setGender(e.target.value)}
                            >
                                <option>Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="location" className="py-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                value={location || ''}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Row className="py-3 text-center">
                <Col>
                    <Link to='/changepassword'>Change Password</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default ProfileScreen;