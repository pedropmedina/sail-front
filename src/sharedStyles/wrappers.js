import styled from 'styled-components/macro';
import { animated } from 'react-spring';

import { mediaQueries } from './mediaQueries';

export const PinWrapper = styled(animated.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40rem;
  background-color: var(--color-less-white);
  box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
`;

export const Wrapper = styled.div`
  overflow-y: auto;
  position: relative;
  padding: 2rem 5rem;
  position: relative;
`;

export const FormWrapper = styled(Wrapper)`
  ${mediaQueries.tablet`
    padding: 2rem 0;
  `}
`;
