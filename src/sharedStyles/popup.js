import styled from 'styled-components/macro';
import { Popup as P } from 'react-map-gl';

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
