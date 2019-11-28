import styled from 'styled-components/macro';

import { mediaQueries } from '../../sharedStyles/mediaQueries';

export const PlanCreate = styled.div`
  padding: 5rem;
  margin: 0 auto;
  max-width: 120rem;

  ${mediaQueries.tablet`
    padding: 0;
  `}
`;
