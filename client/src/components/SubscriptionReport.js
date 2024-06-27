import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SubscriptionReport.css'; // Make sure the CSS file is correctly imported
// import config from '../config'; // Import the configurations

const SubscriptionReport = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [listening, setListening] = useState(false); // State to manage speech recognition

  const setupSpeechRecognition = useCallback(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setListening(true);
        console.log('Speech recognition started');
      };

      recognition.onend = () => {
        setListening(false);
        console.log('Speech recognition stopped');
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        console.log('Transcript:', transcript);

        if (transcript === 'download') {
          handlePrint();
        }
      };

      recognition.start();
    } else {
      console.error('Speech recognition not supported');
    }
  }, []);

  useEffect(() => {
    setupSpeechRecognition(); // Include setupSpeechRecognition in useEffect
    fetchData();
  }, [setupSpeechRecognition]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/subscriptions/getall`);
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handlePrint = () => {
    console.log('Printing...');
    window.print();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/subscriptions/delete/${id}`);
      setSubscriptions((prevSubscriptions) => prevSubscriptions.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  return (
    <div className="subscription-report-container">
      <h1>Subscription Report</h1>
      <div className="action-buttons">
        <Link to="/" className="addButton">Back to User</Link>
        <Link to="/subscriptions" className="addButton">Add Subscription</Link>
      </div>
      <table className="subscription-report-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={sub._id}>
              <td>{index + 1}</td>
              <td>{sub.name}</td>
              <td>{sub.price}</td>
              <td>{sub.description}</td>
              <td className="actionButtons">
                <button className="btn btn-delete" onClick={() => handleDelete(sub._id)}>
                  <i className="fa fa-trash"></i>
                </button>
                <Link to={`/edit/${sub._id}`} className="btn btn-edit">
                  <i className="fa fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {listening && <p>Listening...</p>}
    </div>
  );
};

export default SubscriptionReport;
