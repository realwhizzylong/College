import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts, deletePost } from '../actions/postAction';
import Message from '../components/Message';
import { MY_POSTS_RESET } from '../constants/postConstants';

const MyPostsScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { posts, error } = useSelector(state => state.myPosts);

    const { success } = useSelector(state => state.postDelete);

    useEffect(() => {
        dispatch({ type: MY_POSTS_RESET })
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(getMyPosts())
        }
    }, [dispatch, userInfo, success, history])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost(id))
        }
    }

    return (
        <Row className="justify-content-md-center">
            <Col md={10}>
                <h3>My Posts</h3>
                {!posts ? (
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
                            {posts.map(post => (
                                <tr key={post._id}>
                                    <td>
                                        <Link to={`/posts/${post._id}`}>
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>{post.createdAt.split("T")[0].split("-")[1]}-{post.createdAt.split("T")[0].split("-")[2]}-{post.createdAt.split("T")[0].split("-")[0]}</td>
                                    <td>
                                        <LinkContainer to={`/posts/${post._id}/edit`}>
                                            <Button variant="primary" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(post._id)}>
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

export default MyPostsScreen;