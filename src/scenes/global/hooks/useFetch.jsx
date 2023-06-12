import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url, { cancelToken: source.token });

        if (response.status !== 200) {
          let err = new Error('Error en la petición Axios');
          err.status = response.status || '00';
          err.statusText = response.statusText || 'Ocurrió un error';
          throw err;
        }

        if (!source.token.reason) {
          setData(response.data);
          setError(null);
        }
      } catch (error) {
        if (!source.token.reason) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!source.token.reason) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => source.cancel('Request canceled');
  }, [url]);

  return { data, error, loading };
};
