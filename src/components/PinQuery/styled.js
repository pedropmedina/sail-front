import styled from 'styled-components/macro';

import { CloseBtn } from '../../stylesShare';

export const PinQuery = styled.article`
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content minmax(0, 1fr);
`;

export const TopPanel = styled.section`
  position: relative;

  svg {
    position: absolute;
    right: 2rem;
    top: 2rem;
    fill: ${({ isLiked }) =>
      isLiked ? 'var(--color-earth-red)' : 'var(--color-almost-white)'};
    font-size: 2.5rem;
    cursor: pointer;
  }
`;

export const BottomPanel = styled.section``;

export const BgImage = styled.figure``;

export const Image = styled.img`
  height: 30rem;
  width: 100%;
  object-position: center;
  object-fit: cover;
`;

export const Title = styled.figcaption`
  color: var(--color-dark-grey);
  font-size: 1.6rem;
  padding: 1.5rem;
`;

export const Content = styled.p`
  color: var(--color-almost-black);
  font-size: 1.2rem;
  padding-left: 1.5rem;
`;

export const Address = styled(Content)`
  font-size: 1.4rem;
  color: var(--color-medium-grey);
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
