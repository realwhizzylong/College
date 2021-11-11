import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmissionBackground } from '../actions/admissionAction';
import { getAdmissionDetail, addComment } from '../actions/admissionAction';
import Message from '../components/Message';
import { ADMISSION_COMMENT_RESET } from '../constants/admissionConstants';

const AdmissionDetailScreen = ({ match }) => {
    const [comment, setComment] = useState('');

    const admissionId = match.params.id;

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { admission, error } = useSelector(state => state.admissionDetail);

    const { user, error: errorBackground } = useSelector(state => state.admissionBackground);

    const { success, error: errorComment } = useSelector(state => state.admissionComment);

    useEffect(() => {
        if (success) {
            alert('Comment added.')
            setComment('')
            dispatch({ type: ADMISSION_COMMENT_RESET })
        }
        if (!admission || !admission.user) {
            dispatch(getAdmissionDetail(admissionId))
        }
        if (admission.user && (!user || !user.school)) {
            dispatch(getAdmissionBackground(admission.user))
        }
    }, [dispatch, user, admissionId, admission, success])

    const addCommentHandler = (e) => {
        e.preventDefault();
        dispatch(addComment(match.params.id, { comment }));
    };

    return (
        <>
            <Link className="btn btn-primary my-3" to="/admissions">Go Back</Link>
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                errorBackground ? (
                    <Message variant="danger">{errorBackground}</Message>
                ) : (
                    <>
                        <Row className="justify-content-md-center">
                            <h2 className="text-center mb-5 admission-title">{admission.title}</h2>
                            <Col md={5}>
                                <h5 className="text-center">Background Information</h5>
                                <Card className="my-3 px-1" border="primary">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <strong>Username:</strong> {admission.username}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>School:</strong> {user.school}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>School Level:</strong> {user.schoolLevel}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Major:</strong> {user.major}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>GPA:</strong> {user.gpa}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>{user.langTest} Score:</strong> {user.langScore}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>{user.genTest} Score:</strong> {user.genScore}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Work Experience:</strong> {user.workLevel} ({user.workYears})
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Research Experience:</strong> {user.researchExp ? user.researchExp : 'N/A'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Competition Experience:</strong> {user.competitionExp ? user.competitionExp : 'N/A'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Other Backgrounds:</strong> {user.otherInfo ? user.otherInfo : 'N/A'}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                            <Col md={5}>
                                <h5 className="text-center">Admission Result</h5>
                                <Card className="my-3 px-1" border="primary">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <strong>College:</strong> {admission.college}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Academic Year:</strong> {admission.year} {admission.semester}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Degree:</strong> {admission.degree}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Program:</strong> {admission.program}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Result:</strong> {admission.result}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Date Received:</strong> {admission.date && `${admission.date.split("T")[0].split("-")[1]}-${admission.date.split("T")[0].split("-")[2]}-${admission.date.split("T")[0].split("-")[0]}`}
                                        </ListGroup.Item>
                                        <ListGroup.Item className="admission-message">
                                            <strong>Message:</strong>
                                            <br></br>
                                            {admission.content}
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
                                        {admission.comments && admission.comments.map(cmt => (
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
                )
            )}
        </>
    )
}

export default AdmissionDetailScreen;