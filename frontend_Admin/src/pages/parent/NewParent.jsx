/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useReducer, useState } from 'react';
import './newparent.css';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { getError } from '../../utils';

import { useStateContext } from '../../contexts/ContextProvider';
import { CircularProgress } from '@material-ui/core';

export default function NewParent() {
  const { currentColor } = useStateContext();
  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('Yes');
  const [regNo, setRegNo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState('');
  const [search, setSearch] = useState('');

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, info: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return { state };
    }
  };
  const [{ loading, error, info }, dispatch] = useReducer(logger(reducer), {
    info: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          // eslint-disable-next-line comma-dangle
          `http://localhost:3000/api/students/regNo/${search}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [search, dispatch]);

  // useEffect(() => {
  //   setRegNo(info.regNo);
  //   setStudent(info._id);
  // }, [regNo, student]);

  console.log(regNo);
  console.log(student);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl z-0">
      <div className="newParent">
        <strong className="newParentTitle" style={{ color: currentColor }}>
          New Parent
        </strong>
        <div className="search">
          <label>Student RegNo.</label>

          <form className="flex items-center mx-2">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search by regno."
                aria-describedby="btnsearch"
                required
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              {loading ? (
                <div className="flex object-center ">
                  Loaing...{' '}
                  <CircularProgress style={{ color: currentColor }} size={25} />
                </div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <strong className="mx-5">{info.username}</strong>
              )}
            </div>
            {/* <button
              id="btnsearch"
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button> */}
          </form>
        </div>

        <form className="newParentForm">
          <div className="newParentItem">
            <label>Full Name</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="john Cyper"
            />
          </div>
          <div className="newParentItem">
            <label>Student RegNo.</label>
            <input
              type="text"
              disabled
              // onChange={() => setRegNo()}

              // placeholder={info._id}
            />
          </div>
          <div className="newParentItem">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="john@gmail.com"
            />
          </div>
          <div className="newParentItem">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="password"
            />
          </div>
          <div className="newParentItem">
            <label>Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="0711 123 456"
            />
          </div>
          <div className="newParentItem">
            <label>Address</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="ilala | DSM"
            />
          </div>
          <div className="newParentItem">
            <label>Gender</label>
            <div className="newParentGender">
              <input
                type="radio"
                name="gender"
                id="male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                value="male"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                value="female"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className="newParentItem">
            <label>Active</label>
            <select
              className="newParentSelect"
              onChange={(e) => setStatus(e.target.value)}
              name="active"
              id="active"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button
            className="newParentButton"
            style={{ backgroundColor: currentColor }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
