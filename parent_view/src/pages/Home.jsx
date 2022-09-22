import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import logger from 'use-reducer-logger';
import { useReducer } from 'react';
import { getError } from '../utils';
import axios from 'axios';
import { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

function Home() {
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case 'FETCH_REQUEST':
  //       return { ...state, loading: true };
  //     case 'FETCH_SUCCESS':
  //       return { ...state, info: action.payload, loading: false };
  //     case 'FETCH_FAIL':
  //       return { ...state, loading: false, error: action.payload };
  //     default:
  //       return { state };
  //   }
  // };
  // const [{ loading, error, info }, dispatch] = useReducer(logger(reducer), {
  //   info: [],
  //   loading: true,
  //   error: '',
  // });
  // const fetchData = async () => {
  //   dispatch({ type: 'FETCH_REQUEST' });
  //   try {
  //     const result = await axios.get('http://localhost:5000/api/parents');
  //     dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //   } catch (err) {
  //     dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //   }
  // };
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentColor } = useStateContext();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch('http://localhost:3000/api/parents');
    const data = await res.json();
    setIsLoading(false);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section
        className={
          'block justify-center sm:grid-cols-4 md:grid-cols-4 gap-6 px-4 p-18'
        }
      >
        {isloading && <p>Loading...</p>}
        {data.map((data) => (
          <div
            key={data._id}
            id={data._id}
            className="py-8 px-8 max-w-10xl mb-4 mx-4 border border-purple-500 bg-gray-300 rounded-xl shadow-purple-800 shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
          >
            <img
              className="block mx-auto w-24 h-24 rounded-full sm:mx-0 sm:shrink-0"
              src={data.avatar}
              alt="Face"
            />

            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5 md:break-all sm:break-all">
                <p className="text-lg break-normal text-black break-all font-semibold">
                  {data.username}
                </p>
                <p className="text-gray-800">
                  <span className="text-base tracking-wide  font-bold border-b border-purple-500 font-sans">
                    {' '}
                    Published At:{data.email}
                  </span>
                </p>
              </div>
              <Link to={`/detail/${data._id}`}>
                <button
                  className="px-4 py-1 text-sm mt-2 text-white font-semibold rounded-full border border-purple-500 
                              hover:text-white hover:bg-purple-600 hover:border-transparent 
                              focus:outline-none focus:ring-2 focus:ring-purple-600 
                              focus:ring-offset-2"
                  style={{ backgroundColor: currentColor }}
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
