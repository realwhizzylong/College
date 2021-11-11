import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAdmissions } from '../actions/admissionAction';
import Admission from '../components/Admission';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import { ADMISSION_DETAIL_RESET } from '../constants/admissionConstants';

const AdmissionScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNum = match.params.pageNum || 1;

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { admissions, error, page, pages } = useSelector(state => state.admissionAll);

    useEffect(() => {
        dispatch({ type: ADMISSION_DETAIL_RESET })
        dispatch(getAllAdmissions(keyword, pageNum))
    }, [dispatch, keyword, pageNum])

    return (
        <>
            {error ? (
                <Message variant="danger">{error}</Message >
            ) : (
                <>
                    <Row className="mt-3 justify-content-md-center">
                        <Col md={5}>
                            <h3>All Admissions</h3>
                        </Col>
                        <Col md={5}>
                            <div className="d-flex justify-content-end">
                                <SearchBar type="admissions" />
                                {userInfo && <Link className="btn btn-primary my-3 rounded ms-5" to="/newadmission">New Admission Result</Link>}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={10}>
                            {admissions.map(admission => (
                                <Admission admission={admission} key={admission._id} />
                            ))}
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={5}>
                            {page && page > 1 && <Link className="btn btn-primary my-3 rounded" to={keyword ? `/admissions/search/${keyword}/page/${page - 1}` : `/admissions/page/${page - 1}`}><i className="fas fa-long-arrow-alt-left"></i> Previous</Link>}
                        </Col>
                        <Col md={5}>
                            <div className="d-flex justify-content-end">
                                {page && page < pages && <Link className="btn btn-primary my-3 rounded ms-auto" to={keyword ? `/admissions/search/${keyword}/page/${page + 1}` : `/admissions/page/${page + 1}`}>Next <i className="fas fa-long-arrow-alt-right"></i></Link>}
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default AdmissionScreen;