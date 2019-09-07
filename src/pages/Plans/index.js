/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';
import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = ({ history }) => (
  <Styled.PlansWrapper>
    <Topbar history={history} />
    <Styled.Plans>
      <Plan />
    </Styled.Plans>
  </Styled.PlansWrapper>
);

export default Plans;
