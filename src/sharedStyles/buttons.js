import styled from 'styled-components/macro';

export const Button = styled.button`
  height: 100%;
  width: 21rem;
  border: none;
  border-radius: 0.7rem;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 1.5rem 0.3rem rgba(0, 0, 0, 0.2);
  font-size: var(--font-size-small);
  outline: unset;
  cursor: pointer;
  position: relative;
`;

export const SaveButton = styled(Button)`
  background-color: var(--color-earth-red);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled(Button)`
  background-color: var(--color-light-grey);
`;
