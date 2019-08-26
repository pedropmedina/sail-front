import styled from 'styled-components/macro';

export const App = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns:
    [col-1-start] 1.5rem [col-1-end col-2-start] 40rem
    [col-2-end col-3-start] 1fr [col-3-end];
  grid-template-rows:
    [row-1-start] 1.5rem [row-1-end row-2-start] calc(100vh - 3rem)
    [row-2-end row-3-start] 1fr [row-3-end];
`;
