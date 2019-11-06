import styled from 'styled-components/macro';
import { animated } from 'react-spring';

import { CloseBtn } from '../../stylesShare';

export const PinMutation = styled(animated.div)`
  height: 100%;
  width: 100%;
  border-radius: 3rem 3rem 0 0;
  overflow-y: auto;
  padding: 10rem 2rem;
`;

export const CancelBtn = styled(CloseBtn)`
  right: -5rem;
  top: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  opacity: 1;

  &:hover {
    background-color: var(--color-almost-white);
    color: var(--color-light-grey);
  }
`;
