import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCollegeDetails } from '../actions/collegeAction';
import Map from '../components/Map';
import Message from '../components/Message';

const CollegeDetailScreen = ({ match }) => {
    const collegeId = match.params.id;

    const dispatch = useDispatch();

    const { college, error } = useSelector(state => state.collegeDetails);

    useEffect(() => {
        dispatch(getCollegeDetails(collegeId))
    }, [dispatch, collegeId])

    return (
        <>
            <Link className="btn btn-primary my-3" to="/colleges">Go Back</Link>
            {error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={college.image} className="college-img-lg" />
                        <Card className="my-3 px-1">
                            <Card.Body>
                                <Card.Title as="div">
                                    <h4><strong>{college.name}</strong></h4>
                                </Card.Title>
                                <Card.Text as="div">
                                    {college.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="text-muted">
                                    {college.location}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    National College Ranking: #{college.ranking}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href={college.website} target="_blank" rel="noreferrer">Visit School's Official Website</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Tuition: ${college.in_state_tuition} (in-state) ${college.out_of_state_tuition} (out-of-state)
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Map lng={college.longitude} lat={college.latitude} />
                    </Col>
                </Row>
            )}
        </>
    )
}

export default CollegeDetailScreen;