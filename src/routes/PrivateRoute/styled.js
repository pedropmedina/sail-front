import styled from 'styled-components/macro';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: [col-1-start] 20rem [col-1-end col-2-start] 1fr [col-2-end];
  grid-template-rows: 100vh;
  background-color: var(--color-almost-white);
  position: relative;
`;
