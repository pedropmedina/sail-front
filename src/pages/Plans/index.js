import React from 'react';

import * as Styled from './styled';
import Plan from '../../components/Plan';
import Topbar from '../../components/Topbar';

const Plans = () => (
  <Styled.PlansWrapper>
    <Topbar />
    <Styled.Plans>
      <Plan />
    </Styled.Plans>
  </Styled.PlansWrapper>
);

export default Plans;
