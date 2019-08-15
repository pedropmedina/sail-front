/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';

const PinQuery = ({ isQuery, isMutation }) => {
  return (
    <Styled.PinQuery isQuery={isQuery} isMutation={isMutation}>
      Pin query
    </Styled.PinQuery>
  );
};

export default PinQuery;
