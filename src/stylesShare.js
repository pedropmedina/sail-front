import styled from 'styled-components/macro';
import { animated } from 'react-spring';

export const Btn = styled.button`
  padding: 2rem;
  font-size: 1.6rem;
  border: none;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  outline: none;
  border: 0.2rem solid transparent;
  cursor: pointer;
  line-height: 1;
`;

export const CloseBtn = styled(Btn)`
  position: absolute;
  top: 0;
  right: -1rem;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;

  &:hover {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;

// necessary wrapper to handle overflow: auto without affecting the visibility of cancel btn
export const PinWrapper = styled(animated.div)`
  height: calc(100vh - 1.5rem);
  width: 40rem;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  border-radius: 3rem 3rem 0 0;
  background-color: var(--color-almost-white);
`;
