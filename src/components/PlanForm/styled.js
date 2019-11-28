import styled from 'styled-components/macro';

import { mediaQueries } from '../../sharedStyles/mediaQueries';

export const PlanForm = styled.div`
  padding: 5rem;
  margin: 0 auto;
  max-width: 120rem;

  ${mediaQueries.tablet`
    padding: 0;
  `}
`;

export const MapPreviewWrapper = styled.div`
  height: 30rem;
  padding: 2rem;
  background-color: #fff;
  position: relative;
  border-radius: var(--size-smallest);
`;
