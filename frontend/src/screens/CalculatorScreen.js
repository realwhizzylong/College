import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getColleges, getCollegeByName } from '../actions/collegeAction';
import { getBackground } from '../actions/userAction';
import { getAdmissionPercentage } from '../actions/admissionAction';
import College from '../components/College';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { ADMISSION_PERCENTAGE_RESET } from '../constants/admissionConstants';

const CalculatorScreen = () => {
    const [collegeName, setCollegeName] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const { colleges, error } = useSelector(state => state.collegeList);

    const { college, error: errorCollege } = useSelector(state => state.collegeByName);

    const { user, error: errorUser } = useSelector(state => state.userBackground);

    const { percentage, error: errorPercentage } = useSelector(state => state.admissionPercentage);

    useEffect(() => {
        dispatch(getColleges())
        dispatch(getBackground())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        if (user.schoolLevel === 'High School' && (!user.gpa || !user.langScore)) {
            setMessage('Please enter GPA and Language Test Score in My Background')
        } else if ((user.schoolLevel === 'Undergraduate' || user.schoolLevel === 'Graduate') && (!user.gpa || !user.langScore || !user.genScore)) {
            setMessage('Please enter GPA and Language Test Score and General Test Score in My Background')
        } else {
            if (collegeName) {
                dispatch(getCollegeByName({ collegeName }))
                dispatch({ type: ADMISSION_PERCENTAGE_RESET })
                dispatch(getAdmissionPercentage({ collegeName }))
            } else {
                setMessage('Please select a college')
            }
        }
    }

    return (
        <>
            <FormContainer>
                <h2 className="text-center py-3">Select a School and See the Admission Percentage Based on Your Background</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {errorCollege && <Message variant='danger'>{errorCollege}</Message>}
                {errorUser && <Message variant='danger'>{errorUser}</Message>}
                {errorPercentage && <Message variant='danger'>{errorPercentage}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                <Card className="card" border="primary">
                    <Card.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="school" className="py-3">
                                <Form.Label>Select a School you want to apply</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-select rounded"
                                    value={collegeName || ''}
                                    onChange={e => setCollegeName(e.target.value)}
                                >
                                    <option value="">Choose...</option>
                                    {colleges.map(college => (
                                        <option value={college.name} key={college.name}>{college.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    View Percentage
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </FormContainer>
            {college && college._id &&
                <div className="mt-5">
                    {percentage.percentage ? (
                        <Row className="justify-content-md-center">
                            <Col md={10}>
                                <Card className="mb-2 p-3 rounded">
                                    <strong>{`Based on your academic background, ${percentage.percentage}% of the students who have similar academic backgrounds have been admitted by ${college.name}.`}</strong>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="justify-content-md-center">
                            <Col md={10}>
                                <Card className="mb-2 p-3 rounded">
                                    <strong>{`Based on your academic background, ...% of the students who have similar academic backgrounds have been admitted by ${college.name}.`}</strong>
                                </Card>
                            </Col>
                        </Row>
                    )}
                    <Row className="justify-content-md-center">
                        <Col md={10}>
                            <College college={college} key={college._id} />
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}

export default CalculatorScreen;