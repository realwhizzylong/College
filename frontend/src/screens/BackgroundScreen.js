import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBackground, updateBackground } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { USER_UPDATE_BACKGROUND_RESET } from '../constants/userConstants';

const BackgroundScreen = ({ history }) => {
    const [school, setSchool] = useState('');
    const [schoolLevel, setSchoolLevel] = useState('');
    const [major, setMajor] = useState('');
    const [gpa, setGpa] = useState('');
    const [langTest, setLangTest] = useState('');
    const [langScore, setLangScore] = useState('');
    const [genTest, setGenTest] = useState('');
    const [genScore, setGenScore] = useState('');
    const [workLevel, setWorkLevel] = useState('');
    const [workYears, setWorkYears] = useState('');
    const [researchExp, setResearchExp] = useState('');
    const [competitionExp, setCompetitionExp] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { user, error } = useSelector(state => state.userBackground);

    const { success } = useSelector(state => state.userUpdateBackground);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.school || success) {
                dispatch({ type: USER_UPDATE_BACKGROUND_RESET })
                dispatch(getBackground())
            } else {
                setSchool(user.school);
                setSchoolLevel(user.schoolLevel);
                setMajor(user.major);
                setGpa(user.gpa);
                setLangTest(user.langTest);
                setLangScore(user.langScore);
                setGenTest(user.genTest);
                setGenScore(user.genScore);
                setWorkLevel(user.workLevel);
                setWorkYears(user.workYears);
                setResearchExp(user.researchExp);
                setCompetitionExp(user.competitionExp);
                setOtherInfo(user.otherInfo);
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateBackground({
            id: user._id,
            school,
            schoolLevel,
            major,
            gpa,
            langTest,
            langScore,
            genTest,
            genScore,
            workLevel,
            workYears,
            researchExp,
            competitionExp,
            otherInfo
        }))
        setUpdate(true)
    };

    return (
        <FormContainer>
            <h2 className="text-center py-3">Update Academic Background Info</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {update && <Message variant="success">Profile Updated</Message>}
            <Card className="card" border="primary" >
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="school">
                            <Form.Label>School Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter school name"
                                value={school || ''}
                                onChange={e => setSchool(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="schoolLevel" className="py-3">
                            <Form.Label>School Level</Form.Label>
                            <Form.Control
                                as="select"
                                className="form-select rounded"
                                value={schoolLevel || ''}
                                onChange={e => setSchoolLevel(e.target.value)}
                            >
                                <option value="">Choose...</option>
                                <option value="High School">High School</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Graduate">Graduate</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="major">
                            <Form.Label>Major</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter major"
                                value={major || ''}
                                onChange={e => setMajor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="gpa" className="py-3">
                            <Form.Label>GPA</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter GPA"
                                value={gpa || ''}
                                max="4"
                                onChange={e => setGpa(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="langTest">
                                    <Form.Label>Language Test</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-select rounded"
                                        value={langTest || ''}
                                        onChange={e => setLangTest(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="IELTS">IELTS</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="langScore">
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter language test score"
                                        value={langScore || ''}
                                        max="120"
                                        onChange={e => setLangScore(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="py-3">
                            <Col>
                                <Form.Group controlId="genTest">
                                    <Form.Label>General Test</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-select rounded"
                                        value={genTest || ''}
                                        onChange={e => setGenTest(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="GRE">GRE</option>
                                        <option value="GMAT">GMAT</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="genScore">
                                    <Form.Label>Score</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter general test score"
                                        value={genScore || ''}
                                        max="340"
                                        onChange={e => setGenScore(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="workLevel">
                                    <Form.Label>Work Experience</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-select rounded"
                                        value={workLevel || ''}
                                        onChange={e => setWorkLevel(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Full-time">Full-time</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="workYears">
                                    <Form.Label>Years</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-select rounded"
                                        value={workYears || ''}
                                        onChange={e => setWorkYears(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="0-3 months">0-3 months</option>
                                        <option value="3-5 months">3-5 months</option>
                                        <option value="5-11 months">5-11 months</option>
                                        <option value="1-3 years">1-3 years</option>
                                        <option value="3-5 years">3-5 years</option>
                                        <option value="5+ years">5+ years</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="researchExp" className="py-3">
                            <Form.Label>Research Experience</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter research experience"
                                value={researchExp || ''}
                                onChange={e => setResearchExp(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="competitionExp">
                            <Form.Label>Competition Experience</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter competition experience"
                                value={competitionExp || ''}
                                onChange={e => setCompetitionExp(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="otherInfo" className="py-3">
                            <Form.Label>Other Info</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Enter other background info"
                                value={otherInfo || ''}
                                onChange={e => setOtherInfo(e.target.value)}
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
        </FormContainer>
    )
}

export default BackgroundScreen;