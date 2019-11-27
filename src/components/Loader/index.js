/* eslint-disable react/prop-types */
import React from 'react';
import { ClipLoader } from 'react-spinners';

import { Wrapper } from '../../sharedStyles/wrappers';
import { Spinner } from '../../sharedStyles/placeholder';

const Loader = ({ loading, children }) => {
  return (
    <Wrapper>
      <Spinner>
        <ClipLoader
          sizeUnit={'rem'}
          size={3}
          color={'#6C8C96'}
          loading={loading}
        />
        {children}
      </Spinner>
    </Wrapper>
  );
};

export default Loader;
