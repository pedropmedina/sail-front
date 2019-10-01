import styled from 'styled-components/macro';
import { Popup } from 'react-map-gl';

export const Map = styled.div`
  grid-column: ${({ isLoggedIn }) =>
    isLoggedIn ? 'col-2-start / col-3-end' : 'col-1-start / col-3-end'};
  position: relative;
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

  .mapboxgl-popup-content {
    background-color: var(--color-medium-grey);
    color: var(--color-almost-white);
    font-size: 1.2rem;
    border: none;
    display: flex;
    align-items: center;

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
