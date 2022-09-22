/* eslint-disable comma-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import './parent.css';
import logger from 'use-reducer-logger';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { getError } from '../../utils';
import { useStateContext } from '../../contexts/ContextProvider';

export default function Parent() {
  const { currentColor } = useStateContext();
  const { id } = useParams();
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
  const fetchData = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const result = await axios.get(`http://localhost:3000/api/parents/${id}`);
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl z-0">
      <div className="user">
        <div className="userTitleContainer">
          <strong className="userTitle" style={{ color: currentColor }}>
            Edit User
          </strong>
          <Link to="/newparent">
            <button
              className="userAddButton"
              style={{ backgroundColor: currentColor }}
            >
              Create
            </button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            {loading ? (
              <div className="object-center">
                Loaing...{' '}
                <CircularProgress style={{ color: currentColor }} size={25} />
              </div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <div className="userShowTop">
                  <img src={info.avatar} alt="" className="userShowImg" />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">{info.username}</span>
                    <span className="userShowUserTitle">
                      Parent to:{info.status}{' '}
                    </span>
                  </div>
                </div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">{info.username}</span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">{info.createdAt}</span>
                  </div>
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">{info.phone}</span>
                  </div>
                  <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">{info.email}</span>
                  </div>
                  <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">{info.status}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* user update */}
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="annabeck99"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={info.avatar} alt="" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: 'none' }} />
                </div>
                <button
                  className="userUpdateButton"
                  style={{ backgroundColor: currentColor }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
