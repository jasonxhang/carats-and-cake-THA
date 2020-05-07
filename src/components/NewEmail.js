import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Form, Button, Alert, Fade} from 'react-bootstrap';
import {connect} from 'react-redux';
import {me, fetchEmails} from '../store';

const NewEmail = ({reloadInitialData}) => {
    const [recipient, setRecipient] = useState('');
    const [subjectLine, setSubjectLine] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            const emailPayload = {recipient, subjectLine, emailBody};
            const res = await axios.post('/api/email/new', emailPayload);
            setRecipient('');
            setSubjectLine('');
            setEmailBody('');
            reloadInitialData();
            setShowSuccess(true);
        } catch (e) {
            console.error('error', e);
            alert('Something went wrong, please contact the site administrator.');
        }
    };

    const startedNotComplete = () => {
        let started = recipient.length || subjectLine.length || emailBody.length;
        let complete = recipient !== '' && subjectLine !== '' && emailBody !== '';

        if (started && !complete) return true;

        return false;
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

    function renderSuccessAlert() {
        return (
            <div className="success-alert">
                <Alert show={showSuccess} variant="primary">
                    <Alert.Heading>Email successfully sent!</Alert.Heading>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShowSuccess(false)}>Close</Button>
                    </div>
                </Alert>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="newEmail-container">
                <Form>
                    <h3>Compose an email</h3>
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
                            placeholder="please enter a subject line"
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
                    {startedNotComplete() && <div>All fields required</div>}
                </Form>
                {showSuccess && renderSuccessAlert()}
            </div>
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
