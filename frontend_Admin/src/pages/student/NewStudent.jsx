/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './newstudent.css';

import { useStateContext } from '../../contexts/ContextProvider';

// const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function NewStudent() {
  const { currentColor } = useStateContext();
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  // const [errMsg, setErrMsg] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('Yes');
  const [regNo, setRegNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, address, password, status, gender, regNo };

    setLoading(true);
    await fetch('http://localhost:3000/api/students/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json ; charset=UTF-8' },
      body: JSON.stringify(data),
      withCredentials: true,
    }).then(() => {
      // eslint-disable-next-line no-console
      console.log('New user Added');
      setLoading(false);

      // clear state and controlled inputs
      setUsername('');
      setPassword('');
      setRegNo('');
      setAddress('');
      setGender('');
      setStatus('');
    });

    // errMsg('Failed to regester!');
  };
  // eslint-disable-next-line no-console
  // console.log(username, address, password, gender, status, regNo);
  // eslint-disable-next-line no-return-assign
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl z-0">
      <div className="newUser_">
        <strong className="newUser_Title " style={{ color: currentColor }}>
          New Student
        </strong>

        <form onSubmit={handleSubmit} className="newUser_Form">
          {/* <div className="newUser_Item">
            <label>Username</label>
            <input type="text" placeholder="john" />
          </div> */}
          <div className="newUser_Item">
            <label>Full Name</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="newUser_Items">
            <label>RegNo</label>
            <input
              required
              id="regNo"
              value={regNo}
              autoComplete="off"
              type="string"
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="00/2020"
            />
            <label>student name</label>
          </div>
          <div className="newUser_Item">
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          {/* <div className="newUser_Item">
            <label>Phone</label>
            <input type="text" placeholder="+1 123 456 78" />
          </div> */}
          <div className="newUser_Item">
            <label>Address</label>
            <input
              required
              id="address"
              value={address}
              autoComplete="off"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ILALA | DSM"
            />
          </div>

          <div className="newUser_Item">
            <label>Gender</label>
            <div className="newUser_Gender">
              <input
                type="radio"
                name="gender"
                id="gender"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                value="Male"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                value="Female"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className="newUser_Item">
            <label>Active</label>
            <select
              className="newUser_Select"
              onChange={(e) => setStatus(e.target.value)}
              name="active"
              id="active"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {!isLoading && (
            <button
              type="submit"
              className="newUser_Button hover:text-black"
              style={{ backgroundColor: currentColor }}
            >
              Create
            </button>
          )}
          {isLoading && (
            <button
              className="newUser_Button hover:text-black"
              style={{ backgroundColor: currentColor }}
            >
              Creating...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
