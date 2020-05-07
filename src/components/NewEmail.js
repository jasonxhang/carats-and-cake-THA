import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {me, fetchEmails} from '../store';

const NewEmail = ({price, ticker, name, balance, reloadInitialData, portfolio}) => {
    const [recipient, setRecipient] = useState('');
    const [subjectLine, setSubjectLine] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [emailsSent, setEmailsSentl] = useState(0);

    const handleSubmit = async () => {
        try {
            const emailPayload = {recipient, subjectLine, emailBody};
            const res = await axios.post('/api/email/new', emailPayload);
            setRecipient('');
            setSubjectLine('');
            setEmailBody('');
            reloadInitialData();
            console.log('res:', res);
        } catch (e) {
            console.log(e);
            alert('Something went wrong: ', e.response.data);
        }
    };

    const renderConfirmButton = () => {
        return (
            <div>
                <Button
                    size="lg"
                    disabled={recipient === '' || subjectLine === '' || emailBody === ''}
                    onClick={handleSubmit}
                    variant="success"
                >
                    Send email!
                </Button>
            </div>
        );
    };

    return (
        <div className="stockpage-container">
            <Form className="transaction-container">
                <div>Send an email!</div>
                <Form.Group controlId="recipient">
                    <Form.Label>Recipient:</Form.Label>
                    <Form.Control
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                        placeholder="please enter an email address"
                    />
                </Form.Group>
                <Form.Group controlId="subjectLine">
                    <Form.Label>Subject line:</Form.Label>
                    <Form.Control
                        value={subjectLine}
                        onChange={(event) => setSubjectLine(event.target.value)}
                        placeholder="please enter a suject line"
                    />
                </Form.Group>

                <Form.Group controlId="emailBody">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control
                        value={emailBody}
                        onChange={(event) => setEmailBody(event.target.value)}
                        as="textarea"
                        rows="3"
                    />
                </Form.Group>
                {renderConfirmButton()}
            </Form>
        </div>
    );
};

const mapDispatch = (dispatch) => {
    return {
        reloadInitialData() {
            dispatch(me());
            dispatch(fetchEmails());
        },
    };
};

export default withRouter(connect(null, mapDispatch)(NewEmail));
