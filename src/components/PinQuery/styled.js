import styled from 'styled-components/macro';

export const PinQuery = styled.div`
  z-index: 15;
  height: 100vh;
  width: 30rem;
  position: absolute;
  left: ${({ isQuery }) => (isQuery ? '-30rem' : '-60rem')};
  top: 0;
  background-color: var(--color-almost-white);
  transition: all 0.2s;
`;
