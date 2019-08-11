import styled from 'styled-components/macro';

export const Map = styled.div`
  height: 100vh;
  flex-grow: 1;
  position: relative;
`;

export const CreatePinBtn = styled.button`
  position: absolute;
  right: 7rem;
  bottom: 10rem;
  width: 5rem;
  height: 5rem;
  line-height: 1;
  border: none;
  border-radius: 50%;
  background-color: var(--color-earth-red);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.6);
  outline: none;
`;
