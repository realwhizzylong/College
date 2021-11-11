import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const College = ({ college }) => {
    return (
        <Card className="mb-3 p-1 rounded">
            <Row>
                <Col md={4}>
                    <Link to={`/colleges/${college._id}`}>
                        <Card.Img src={college.image} variant="top" className="college-img" />
                    </Link>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Link to={`/colleges/${college._id}`}>
                            <Card.Title as="div">
                                <h4><strong>{college.name}</strong></h4>
                            </Card.Title>
                        </Link>
                        <Card.Text as="div" className="text-muted">
                            <strong>{college.location}</strong>
                        </Card.Text>
                        <Card.Text as="div" className="py-2">
                            <strong>#{college.ranking}</strong> in <strong>National College Ranking</strong>
                        </Card.Text>
                        <Card.Text as="div">
                            {college.description}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default College;