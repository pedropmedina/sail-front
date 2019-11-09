import styled from 'styled-components/macro';

export const Auth = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-almost-white);
  perspective: 100rem;
`;

export const Card = styled.div`
  width: 50rem;
  height: 75rem;
  color: #aaa;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2rem 7rem rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transform: ${({ signUpMode }) => (signUpMode ? 'rotateY(180deg)' : 'unset')};
  border-radius: var(--size-smallest);
  
  display: flex;
  justify-content: center;
`;

export const CardSide = styled.div`
  position: absolute;
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-rows: 20rem min-content 1fr 20rem;
  justify-items: center;
  background-color: var(--color-almost-whie);
  border-radius: var(--size-smallest);
  row-gap: 2rem;
  backface-visibility: hidden;
  transform: ${({ back }) => (back ? 'rotateY(180deg)' : 'unset')};
`;

export const Header = styled.header`
  align-self: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  margin-bottom: 1.2rem;
`;

export const Subtitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: normal;
`;

export const Text = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
`;
