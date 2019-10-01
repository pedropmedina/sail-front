import styled, { css } from 'styled-components/macro';

export const App = styled.section`
  grid-column: col-2-start / col-3-end;
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

const Btn = styled.button`
  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 50%;
  background-color: var(--color-earth-red);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.6);
  outline: none;
  cursor: pointer;
  z-index: 1;
`;

export const ExpandBtn = styled(Btn)`
  position: absolute;
  bottom: 10rem;
  right: 7rem;

  & > svg {
    transition: all 0.2s;
  }

  ${({ showBtns }) =>
    showBtns &&
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

export const AddBtn = styled(Btn)`
  margin: 0 0.5rem;
`;

export const AddBtnWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 7rem;
  bottom: 10rem;
  opacity: 0;
  display: flex;
`;
