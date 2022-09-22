import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Fees() {
  const { id } = useParams;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/parents/${id}`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [id]);
  console.log(data);
  return <div>Fees</div>;
}

export default Fees;
