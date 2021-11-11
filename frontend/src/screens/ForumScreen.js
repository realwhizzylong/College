import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../actions/postAction';
import Post from '../components/Post';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import { POST_DETAIL_RESET } from '../constants/postConstants';

const ForumScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNum = match.params.pageNum || 1;

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.login);

    const { posts, error, page, pages } = useSelector(state => state.postAll);

    useEffect(() => {
        dispatch({ type: POST_DETAIL_RESET })
        dispatch(getAllPosts(keyword, pageNum))
    }, [dispatch, keyword, pageNum])

    return (
        <>
            {error ? (
                <Message variant="danger">{error}</Message >
            ) : (
                <>
                    <Row className="mt-3 justify-content-md-center">
                        <Col md={5}>
                            <h3>All Posts</h3>
                        </Col>
                        <Col md={5}>
                            <div className="d-flex justify-content-end">
                                <SearchBar type="forums" />
                                {userInfo && <Link className="btn btn-primary my-3 rounded ms-5" to="/newpost">New Post</Link>}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={10}>
                            {posts.map(post => (
                                <Post post={post} key={post._id} />
                            ))}
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md={5}>
                            {page && page > 1 && <Link className="btn btn-primary my-3 rounded" to={keyword ? `/forums/search/${keyword}/page/${page - 1}` : `/forums/page/${page - 1}`}><i className="fas fa-long-arrow-alt-left"></i> Previous</Link>}
                        </Col>
                        <Col md={5}>
                            <div className="d-flex justify-content-end">
                                {page && page < pages && <Link className="btn btn-primary my-3 rounded ms-auto" to={keyword ? `/forums/search/${keyword}/page/${page + 1}` : `/forums/page/${page + 1}`}>Next <i className="fas fa-long-arrow-alt-right"></i></Link>}
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ForumScreen;