import { useState, useEffect } from 'react';

import { reverseGeocode } from '../utils';

export const useReverseGeocode = (longitude, latitude) => {
  const [data, setData] = useState({
    longitude,
    latitude,
    name: ''
  });

  useEffect(() => {
    let isSubscribed = true;

    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(name => {
        if (isSubscribed) {
          setData(prevData => ({ ...prevData, name }));
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  return { ...data };
};
