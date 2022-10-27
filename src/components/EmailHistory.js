import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import { fetchEmails } from '../store';

import axios from 'axios';

const EmailHistory = ({ emailHistory, emailsSent, loadEmails }) => {
  // const [emailHistory, setEmailHistory] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  // const fetchEmailHistory = async () => {
  //     setIsError(false);
  //     setIsLoading(true);
  //     try {
  //         const {data: emailHistoryData} = await axios.get('/api/email/emailHistory');
  //         setEmailHistory(emailHistoryData);
  //     } catch (e) {
  //         console.error(e);
  //         setEmailHistory([]);
  //         setIsError(true);
  //     }
  //     setIsLoading(false);
  // };

  useEffect(() => {
    const shouldGetEmails = emailsSent;
    shouldGetEmails && loadEmails();
  }, []);

  const renderLoading = () => {
    return (
      <div className="loading">
        Loading...
        <Spinner animation="border" variant="primary" />
      </div>
    );
  };

  const renderEmailHistoryTable = () => {
    return emailHistory.map((email) => {
      return (
        <div className="tr" key={email._id}>
          <div className="td">{email.recipient}</div>
          <div className="td">{email.subjectLine}</div>
          <div className="td">{email.emailBody}</div>
          <div className="td">{email.timeSent}</div>
        </div>
      );
    });
  };

  const renderEmailHistoryData = () => {
    return emailsSent ? (
      <div className="page-container">
        <div id="table-view">
          <div className="table">
            <div className="thead">
              <div className="tr">
                <div className="td">Recipient</div>
                <div className="td">Subject Line</div>
                <div className="td">Email Body</div>
                <div className="td">Time Sent</div>
              </div>
            </div>
            <div className="tbody">{renderEmailHistoryTable()}</div>
          </div>
        </div>
      </div>
    ) : (
      'No email history data available. Go send some emails!'
    );
  };

  const renderPage = () => {
    if (!emailHistory.length) {
      renderLoading();
    } else if (emailHistory.length) {
      renderEmailHistoryData();
    }
  };

  return <div>{!emailHistory.length ? renderLoading() : renderEmailHistoryData()}</div>;
};

const mapState = (state) => {
  return {
    emailHistory: state.email.emails,
    emailsSent: state.user.emailsSent,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadEmails() {
      dispatch(fetchEmails());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(EmailHistory));
