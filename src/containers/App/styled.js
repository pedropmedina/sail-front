import styled from 'styled-components/macro';

export const App = styled.article`
  grid-column: col-2-start / col-3-end;
  position: relative;
`;

export const SearchSection = styled.section`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  max-width: 120rem;
  z-index: 1;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
`;
