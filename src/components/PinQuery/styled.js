import styled from 'styled-components/macro';
import { animated } from 'react-spring';

import { CloseBtn } from '../../stylesShare';

export const PinQuery = styled(animated.div)`
  height: calc(100vh - 3rem);
  width: 40rem;
  position: absolute;
  top: 3rem;
  left: 3rem;
  z-index: 2;
  overflow: hidden;
  border-radius: 3rem 3rem 0 0;
  background-color: var(--color-almost-white);

  & > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
      border-bottom: 0.1rem solid var(--color-light-grey);
    }
  }
`;

export const BgImage = styled.figure`
  width: 100%;
  height: 30rem;
  padding: 0;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-position: center;
  object-fit: cover;
`;

export const Title = styled.figcaption`
  color: var(--color-almost-black);
  font-size: 1.6rem;
  padding: 2rem;
`;

export const Content = styled.p`
  color: var(--color-almost-black);
  font-size: 1.2rem;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.5);
  padding: 2rem;
`;

export const CancelBtn = styled(CloseBtn)`
  top: 4rem;
  right: -2rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-almost-white);
  color: var(--color-light-grey);
  opacity: 1;

  &:hover {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;
