import styled from 'styled-components/macro';

export const PlanCreateWrapper = styled.div`
  overflow-y: auto;
  grid-column: col-1-start / col-2-end !important;
`;

export const PlanCreate = styled.div`
  padding: 5rem;
  margin: 0 auto;
  max-width: 120rem;
`;

export const MapPreviewWrapper = styled.div`
  height: 30rem;
  padding: 2rem;
  background-color: var(--color-less-white);
  position: relative;

  :hover button {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;
