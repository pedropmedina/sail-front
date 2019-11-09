import styled from 'styled-components/macro';

export const GeocodingSearch = styled.div`
  width: 100%;
  border-radius: var(--size-smallest);
  background-color: #fff;
  color: var(--color-light-grey);
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    fill: var(--color-light-grey);
    font-size: var(--font-size-large);
  }
`;
