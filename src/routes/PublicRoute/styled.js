import styled from 'styled-components/macro';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
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
