import { useEffect, useState } from "react";
import axios from "axios";



const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [theurl,setUrl] = useState(url);

  const token = sessionStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

console.log(config.headers.Authorization);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(theurl,config);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }
  , [theurl]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(theurl,config);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, setData, loading, error, reFetch ,theurl, setUrl };
  
};

export default useFetch;
