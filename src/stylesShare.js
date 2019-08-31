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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20rem;
  width: 40rem;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
`;
