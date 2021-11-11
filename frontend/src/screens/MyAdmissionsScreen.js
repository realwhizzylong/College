import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAdmissions, deleteAdmissionResult } from '../actions/admissionAction';
import Message from '../components/Message';
import { MY_ADMISSIONS_RESET } from '../constants/admissionConstants';

const MyAdmissionsScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { admissions, error } = useSelector(state => state.myAdmissions);

    const { success } = useSelector(state => state.admissionDelete);

    useEffect(() => {
        dispatch({ type: MY_ADMISSIONS_RESET })
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getMyAdmissions())
        }
    }, [dispatch, userInfo, success, history])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this admission result?')) {
            dispatch(deleteAdmissionResult(id))
        }
    }

    return (
        <Row className="justify-content-md-center">
            <Col md={10}>
                <h3>My Admissions</h3>
                {!admissions ? (
                    <>
                    </>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admissions.map(admission => (
                                <tr key={admission._id}>
                                    <td>
                                        <Link to={`/admissions/${admission._id}`}>
                                            {admission.title}
                                        </Link>
                                    </td>
                                    <td>{admission.createdAt.split("T")[0].split("-")[1]}-{admission.createdAt.split("T")[0].split("-")[2]}-{admission.createdAt.split("T")[0].split("-")[0]}</td>
                                    <td>
                                        <LinkContainer to={`/admissions/${admission._id}/edit`}>
                                            <Button variant="primary" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(admission._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default MyAdmissionsScreen;