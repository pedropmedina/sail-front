import { useState } from 'react';

import { reverseGeocode } from '../utils';

export const useLazyReverseGeocode = () => {
  const [data, setData] = useState({
    longitude: 0,
    latitude: 0,
    name: ''
  });

  const lazyFn = async (longitude, latitude) => {
    if (longitude && latitude) {
      reverseGeocode(longitude, latitude).then(name =>
        setData(prevData => ({
          ...prevData,
          name,
          longitude,
          latitude
        }))
      );
    }
  };

  return [lazyFn, { ...data }];
};
