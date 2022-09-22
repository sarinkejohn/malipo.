/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import './parentsList.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { React, useEffect, useReducer } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { CircularProgress } from '@material-ui/core';
import { getError } from '../../utils';

export default function ParentsList() {
  const { currentColor } = useStateContext();

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
      const result = await axios.get('http://localhost:3000/api/parents');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'transaction',
      headerName: 'Transaction',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={'/parent/' + params.row._id}>
            <button
              className="userListEdit"
              style={{ backgroundColor: currentColor }}
            >
              View
            </button>
          </Link>
        );
      },
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-15 p-2 md:p-10 bg-white rounded-3xl z-0">
      <Header category="page" title="Parent" />
      <Link to="/newparent">
        <button
          className="userAddButton mb-2"
          style={{ backgroundColor: currentColor }}
        >
          Create
        </button>
      </Link>
      <div className="userList">
        {loading ? (
          <div className="object-center">
            Loaing...{' '}
            <CircularProgress style={{ color: currentColor }} size={25} />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <DataGrid
            rows={info}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        )}
      </div>
    </div>
  );
}
