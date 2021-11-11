import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getColleges } from '../actions/collegeAction';
import College from '../components/College';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';

const CollegeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const dispatch = useDispatch();

    const { colleges, error } = useSelector(state => state.collegeList);

    useEffect(() => {
        dispatch(getColleges(keyword))
    }, [dispatch, keyword])

    return (
        <>
            {error ? (
                <Message variant="danger">{error}</Message >
            ) : (
                <>
                    <Row className="mt-3 justify-content-md-center">
                        <Col md={7}>
                            <h3>All Colleges</h3>
                        </Col>
                        <Col md={3}>
                            <SearchBar type="colleges" />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={10}>
                            {colleges.map(college => (
                                <College college={college} key={college._id} />
                            ))}
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default CollegeScreen;