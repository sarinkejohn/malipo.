/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { React, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { useStateContext, StateContext } from '../../contexts/ContextProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const { state, dispatch: ctxDispatch } = useContext(StateContext);
  const { userInfo } = state;
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post(
        'http://localhost:3000/api/users/signin',
        {
          email,
          password,
          // eslint-disable-next-line comma-dangle
        }
      );
      setError('');
      setLoading(true);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError('Failed to login wrong Credentials!');
    }
  };
  // already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="relative flex flex-col justify-center  min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md border-2 shadow-md lg:max-w-xl">
        <h1
          className="text-3xl font-semibold text-center text-purple-700 underline"
          style={{ color: currentColor }}
        >
          Sign in
        </h1>
        {error && <p className="text-orange-800">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <span className="text-xs text-purple-600 hover:underline">
            <Link to="/forgetpassword" className="underline">
              Forget Password?
            </Link>
          </span>
          <div className="mt-6">
            <button
              disabled={loading}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              style={{ backgroundColor: currentColor }}
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Do yo have an account?{' '}
          <Link disabled={loading} to="/signup" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
}
