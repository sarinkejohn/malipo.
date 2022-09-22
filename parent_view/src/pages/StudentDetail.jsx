import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getError } from '../utils';
import { Axios } from 'axios';
import { useReducer } from 'react';
import logger from 'use-reducer-logger';
import { useEffect } from 'react';

function StudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/parents/${id}`);
      const data = await res.json();
      setIsLoading(false);
      setData(data);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <figure className="mx-10 my-10 flex md:flex bg-gray-100 rounded-xl p-8 md:p-0">
        <div className="h-24 w-24 md:w-40 md:h-auto md:rounded-none rounded-full mx-0">
          {' '}
          <img
            className="w-32 h-32 shrink-0 md:w-40 md:h-auto md:rounded-none rounded-full mx-0"
            src={data.avatar}
            alt=""
            width="384"
            height="512"
          />
        </div>

        <div className=" flex flex-col -mt-6 pt-6 md:p-8 text-center md:text-left space-y-1">
          <figcaption className="font-medium">
            <div className="text-cyan-600">{data.username}</div>
            <div className="text-gray-500">{data.email}</div>
          </figcaption>
          <div className="userShowInfo">
            {/* <MailOutline className="userShowIcon" /> */}
            <span className="ml-2">FeePaid:{data.transaction}</span>
            <br></br>
            <span className="ml-2">FeeRemaining:{data.transaction - 1100}</span>
          </div>
          <div className="mt-2 item-center ">
            {' '}
            <Link to={`/fee/${data.sid}`}>
              <button className="border rounded-xl w-40 mb-2">pay fees</button>
            </Link>
            <button className="border rounded-xl w-40 mx-2">
              Pay Accessories
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default StudentDetail;
