import styled from 'styled-components/macro';
import { Link as L } from 'react-router-dom';

export const Link = styled(L)`
  :link,
  :visited,
  :active {
    text-decoration: none;
    color: var(--color-almost-white);
    text-align: center;
  }
`;

export const DefaultLink = styled(L)`
  :link,
  :visited,
  :active {
    color: var(--color-medium-grey);
    display: flex;
    align-items: center;
  }

  :hover {
    color: var(--color-dark-grey);

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      color: inherit;
    }
  }

  svg {
    fill: currentColor;
    width: 2rem;
    height: 2rem;
  }
`;
