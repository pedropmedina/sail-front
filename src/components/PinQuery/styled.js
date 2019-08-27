import styled from 'styled-components/macro';
import { animated } from 'react-spring';

import { CloseBtn } from '../../stylesShare';

export const PinQuery = styled(animated.div)`
  height: calc(100vh - 1.5rem);
  width: 40rem;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  /* overflow: hidden; */
  border-radius: 3rem 3rem 0 0;
  background-color: var(--color-almost-white);

  & > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
      border-bottom: 0.1rem solid var(--color-almost-white);
    }
  }
`;

export const BgImage = styled.figure`
  padding: 0;
  border-radius: 3rem 3rem 0 0;
  overflow: hidden;
`;

export const Image = styled.img`
  height: 30rem;
  width: 100%;
  object-position: center;
  object-fit: cover;
  transition: all 0.2s;

  &:hover {
    filter: opacity(90%) brightness(93%);
  }
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
  right: -5rem;
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
