import styled, { css } from 'styled-components/macro';
import { Popup } from 'react-map-gl';

export const Map = styled.div`
  grid-column: ${({ isLoggedIn }) =>
    isLoggedIn ? 'col-2-start / col-3-end' : 'col-1-start / col-3-end'};
  grid-row: 1 / -1;
  position: relative;
`;

export const CreatePinBtn = styled.button`
  position: absolute;
  right: 7rem;
  bottom: 10rem;
  width: 5rem;
  height: 5rem;
  line-height: 1;
  border: none;
  border-radius: 50%;
  background-color: var(--color-earth-red);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.6);
  outline: none;
`;

const Btn = styled.button`
  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 50%;
  background-color: var(--color-earth-red);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.6);
  outline: none;
  cursor: pointer;
  z-index: 1;
`;

export const ExpandBtn = styled(Btn)`
  position: absolute;
  bottom: 10rem;
  right: 7rem;

  & > svg {
    transition: all 0.2s;
  }

  ${({ showBtns }) =>
    showBtns &&
    css`
      transform: scale(0.9);
      background-color: var(--color-medium-grey);

      & > svg {
        transform: rotate(45deg);
      }

      & + div {
        opacity: 1;
        transform: translateX(-5rem);
        width: fit-content;
      }
    `}
`;

export const AddBtn = styled(Btn)`
  margin: 0 0.5rem;
`;

export const AddBtnWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 7rem;
  bottom: 10rem;
  opacity: 0;
  display: flex;
`;

export const PopupFigure = styled.figure``;

export const PopupImg = styled.img`
  width: 15rem;
  height: 10rem;
  object-fit: cover;
  object-position: center;
`;

export const PopupCaption = styled.figcaption`
  color: var(--color-light-grey);
  font-size: 1.2rem;
`;

export const CustomPopup = styled(Popup)`
  z-index: 1;

  div.mapboxgl-popup-content {
    background-color: var(--color-medium-grey);
    color: var(--color-almost-white);
    font-size: 1.2rem;
    border: none;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    button {
      border: none;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      color: var(--color-dark-grey);
      background-color: inherit;
      outline: none;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.2);
      margin-left: 0.5rem;

      &:first-of-type {
        margin-left: 1rem;
      }

      &:last-of-type {
        color: var(--color-earth-red);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  div.mapboxgl-popup-tip {
    border-right-color: var(--color-medium-grey);
    border-left-color: var(--color-medium-grey);
  }
`;
