import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

const Searchbar = ({ history, type }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/${type}/search/${keyword}`);
        } else {
            history.push(`/${type}`);
        }
    }

    return (
        <Form onSubmit={submitHandler} className="py-3 d-flex">
            <Form.Control
                type="text"
                name="q"
                onChange={e => setKeyword(e.target.value)}
                placeholder={`Search by keyword...`}
                className="me-sm-2 rounded"
            />
            <Button type="submit" variant="outline-success" className="rounded">
                Search
            </Button>
        </Form>
    )
}

export default withRouter(Searchbar);