import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmissionDetail, updateAdmissionResult } from '../actions/admissionAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { ADMISSION_UPDATE_RESET } from '../constants/admissionConstants';

const AdmissionEditScreen = ({ match, history }) => {
    const admissionId = match.params.id;

    const [college, setCollege] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [degree, setDegree] = useState('');
    const [program, setProgram] = useState('');
    const [result, setResult] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [update, setUpdate] = useState(false);
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const { admission, error } = useSelector(state => state.admissionDetail);

    const { success, error: errorUpdate } = useSelector(state => state.admissionUpdate);

    useEffect(() => {
        if (success) {
            dispatch({ type: ADMISSION_UPDATE_RESET })
            setTimeout(() => {
                history.push('/myadmissions')
            }, 1000)
        } else {
            if (!admissionId || admission._id !== admissionId) {
                dispatch(getAdmissionDetail(admissionId));
            } else {
                setCollege(admission.college);
                setYear(admission.year);
                setSemester(admission.semester);
                setDegree(admission.degree);
                setProgram(admission.program);
                setResult(admission.result);
                setDate(admission.date.split("T")[0]);
                setTitle(admission.title);
                setContent(admission.content);
            }
        }
    }, [dispatch, success, admissionId, admission, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(updateAdmissionResult({
                _id: admissionId,
                college,
                year,
                semester,
                degree,
                program,
                result,
                date,
                title,
                content
            }));
            setUpdate(true)
        }
        setValidated(true)
    };

    return (
        <FormContainer>
            <h2 className="text-center py-3">Update Admission Result</h2>
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    {update && <Message variant="success">Admission Result Updated</Message>}
                    <Card className="card" border="primary" >
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={submitHandler}>
                                <Form.Group controlId="college">
                                    <Form.Label>College</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter college name"
                                        value={college}
                                        onChange={e => setCollege(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        College required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Row className="py-3">
                                    <Col>
                                        <Form.Group controlId="year">
                                            <Form.Label>Year</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter year"
                                                value={year}
                                                onChange={e => setYear(e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Year required.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="semester">
                                            <Form.Label>Semester</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select rounded"
                                                value={semester || ''}
                                                onChange={e => setSemester(e.target.value)}
                                                required
                                            >
                                                <option value="">Choose...</option>
                                                <option value="Fall">Fall</option>
                                                <option value="Spring">Spring</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Semester required.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="degree">
                                            <Form.Label>Degree</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select rounded"
                                                value={degree || ''}
                                                onChange={e => setDegree(e.target.value)}
                                                required
                                            >
                                                <option value="">Choose...</option>
                                                <option value="Undergradute">Undergraduate</option>
                                                <option value="Master">Master</option>
                                                <option value="PhD">PhD</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Degree required.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="program">
                                            <Form.Label>Program</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter program"
                                                value={program}
                                                onChange={e => setProgram(e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Program required.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="py-3">
                                    <Col>
                                        <Form.Group controlId="result">
                                            <Form.Label>Admission Result</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select rounded"
                                                value={result || ''}
                                                onChange={e => setResult(e.target.value)}
                                                required
                                            >
                                                <option value="">Choose...</option>
                                                <option value="Admitted">Admitted</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Waitlist">Waitlist</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Admission result required.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="date">
                                            <Form.Label>Result Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="rounded"
                                                value={date || ''}
                                                onChange={e => setDate(e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Result date required.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title of this admission result"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Title required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="content" className="py-3">
                                    <Form.Label>Extra Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        placeholder="Enter extra content of this admission result"
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="primary">
                                        Update Admission Result
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            )}
            <Row className="py-3 text-center">
                <Col>
                    <Link to='/myadmissions'>Go Back To My Admissions</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default AdmissionEditScreen;