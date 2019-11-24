import styled, { css } from 'styled-components/macro';

import { mediaQueries } from '../../sharedStyles/mediaQueries';

export const Auth = styled.div`
  height: 100%;
  background-color: var(--color-almost-white);
  perspective: 100rem;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  height: 75vh;
  width: 100%;
  max-width: 45rem;
  color: #aaa;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2rem 7rem rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transform: ${({ signUpMode }) => (signUpMode ? 'rotateY(180deg)' : 'unset')};
  border-radius: var(--size-smallest);

  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries.mobileL`
    height: 100vh;
  `}
`;

export const CardSide = styled.div`
  position: absolute;
  width: 90%;
  background-color: var(--color-almost-whie);
  border-radius: var(--size-smallest);
  backface-visibility: hidden;
  transform: ${({ back }) => (back ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

export const Header = styled.header`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  margin-bottom: 5rem;
`;

export const Subtitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: normal;
  padding-left: 2rem;
`;

export const Text = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  padding-left: 2rem;
`;

export const ErrorBadge = styled.div`
  width: 25rem;
  padding: 1.5rem;
  font-size: var(--font-size-small);
  background-color: var(--color-danger);
  border-radius: var(--size-smallest);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  color: #fff;
  position: absolute;
  top: -10rem;
  right: 4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    height: 2rem;
    width: 2rem;

    :first-child {
      margin-right: 1rem;
    }

    :last-child {
      margin-left: auto;
    }
  }

  ${({ error }) =>
    error &&
    css`
      opacity: 1;
      top: 3rem;
    `}
`;
