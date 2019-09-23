import styled from 'styled-components/macro';

export const PlansWrapper = styled.div`
  grid-row: 1 / -1;
  overflow-y: auto;
`;

export const Plans = styled.ul`
  list-style: none;
  padding: 2rem 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 170rem;
  margin: 0 auto;
`;
