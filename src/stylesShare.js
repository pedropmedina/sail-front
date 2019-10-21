import styled from 'styled-components/macro';
import { animated } from 'react-spring';
import { Popup as P } from 'react-map-gl';

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
  left: 0;
  width: 40rem;
  background-color: var(--color-less-white);
  box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
`;

// Floating box to display results
export const Box = styled.article`
  padding: 2rem;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 2rem));
  z-index: 1;
`;

export const Popup = styled(P)`
  z-index: 1;

  .mapboxgl-popup-content {
    background-color: var(--color-medium-grey);
    color: var(--color-almost-white);
    font-size: 1.2rem;
    border: none;
    display: flex;
    align-items: center;
  }

  div.mapboxgl-popup-tip {
    border-right-color: var(--color-medium-grey);
    border-left-color: var(--color-medium-grey);
  }
`;

export const CreateBtn = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  font-size: 1.6rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #fff;
  }

  > svg {
    font-size: 2.4rem;
    fill: currentColor;
  }
`;
