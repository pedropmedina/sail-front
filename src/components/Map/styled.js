import styled, { css } from 'styled-components/macro';

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

export const CreateNew = styled.div`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 7rem;
  bottom: 10rem;
  opacity: 0;
  display: flex;
`;

const Button = styled.button`
  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 50%;
  background-color: var(--color-earth-red);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.6);
  outline: none;
  cursor: pointer;
  z-index: 10;
`;

export const NewButton = styled(Button)`
  position: absolute;
  bottom: 10rem;
  right: 7rem;

  & > svg {
    transition: all 0.2s;
  }

  ${({ showAddNewButtons }) =>
    showAddNewButtons &&
    css`
      transform: scale(0.9);
      background-color: var(--color-medium-grey);

      & > svg {
        transform: rotate(45deg);
      }

      & + div {
        opacity: 1;
        transform: translateX(-5rem);
        width: fit-content;
      }
    `}
`;

export const NewPinButton = styled(Button)`
  margin: 0 0.5rem;
`;

export const NewPlanButton = styled(Button)`
  margin: 0 0.5rem;
`;
