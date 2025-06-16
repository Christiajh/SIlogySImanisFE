import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios'; // GUNAKAN yang sudah diatur baseURL-nya

export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/locations') // Tanpa /api karena baseURL-nya sudah /api
      .then(res => {
        if (Array.isArray(res.data)) {
          setLocations(res.data);
        } else {
          setLocations([]);
          console.warn('Data lokasi bukan array:', res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching locations');
        setLoading(false);
      });
  }, []);

  return { locations, loading, error };
};
