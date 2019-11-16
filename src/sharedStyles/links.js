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

// export const Link = styled(DefaultLink)`
//   :link,
//   :visited,
//   :active {
//     flex-basis: 70%;
//     padding: 0.5rem 2rem;
//     font-size: 1.2rem;
//     background-color: var(--color-medium-grey);
//     transition: all 0.2s;
//   }

//   :hover {
//     background-color: var(--color-dark-grey);
//   }
// `;
