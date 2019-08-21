import styled from 'styled-components/macro';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns:
    [col-1-start] 3rem [col-1-end col-2-start] 40rem
    [col-2-end col-3-start] 1fr [col-3-end];
  grid-template-rows:
    [row-1-start] 3rem [row-1-end row-2-start] calc(100vh - 6rem)
    [row-2-end row-3-start] 1fr [row-3-end];
`;

export const Palette = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 5rem);
  position: absolute;
  right: 50%;
  bottom: 2rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const EachColor = styled.span`
  background-color: ${({ color }) => color && color};
  font-size: 1.2rem;
  padding: 0.5rem;
  color: #ccc;
`;
