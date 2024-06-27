import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './user.css';
// import config from '../../config'; // Import the configuration

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getall`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users', { position: 'top-right' });
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success('User deleted successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', { position: 'top-right' });
    }
  };

  return (
    <div className='userTable'>
      <h1>Customer Details</h1>
      <Link to={'/add'} className='addButton1'>Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              <td className='actionButtons'>
                <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/subscriptions'} className='addButton'>Subscription</Link>
      <Link to={'/subscription-report'} className='addButton'>Check Subscription</Link>
    </div>
  );
};

export default User;
