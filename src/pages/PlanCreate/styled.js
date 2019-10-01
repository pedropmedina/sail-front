import styled, { css } from 'styled-components/macro';

import { Popup, CreateBtn as Btn } from '../../stylesShare';

export const PlanCreate = styled.section`
  grid-column: col-1-start / col-2-end !important;
  overflow-y: auto;
  padding-top: 15rem;
  padding-bottom: 10rem;
`;

export const Fields = styled.div`
  width: 70%;
  max-width: 70rem;
  margin: 0 auto;
  position: relative;
`;

export const Field = styled.div`
  display: block;
  color: var(--color-light-grey);
  margin-bottom: 4rem;
  width: 100%;
  border-bottom: 0.2rem solid var(--color-light-grey);
  position: relative;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    bottom: -0.2rem;
    transform: translateX(-50%);
    height: 0.2rem;
    width: 1rem;
    opacity: 0;
    background-color: var(--color-medium-grey);
    transition: all 0.2s;
  }

  &:focus-within ::after {
    opacity: 1;
    width: 100%;
  }

  ${({ error }) =>
    error &&
    css`
      outline: solid 0.1rem var(--color-earth-red);
      outline-offset: 0.5rem;
    `}
`;

export const FieldError = styled.p`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  right: 0;
  padding-left: 2rem;
  font-size: 1.6rem;
  color: var(--color-earth-red);
`;

export const Input = styled.input`
  font-size: 1.6rem;
  height: 6rem;
  display: block;
  width: 100%;
  text-indent: 2rem;
  border: none;
  border: 0.1rem solid var(--color-ligh-grey);
  border-radius: 0.5rem;
  color: var(--color-dark-grey);
  margin-top: 1rem;
  background-color: inherit;
  outline: none;
  background-color: var(--color-less-white);

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const CreateBtn = styled(Btn)`
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);

  :hover {
    background-color: var(--color-dark-grey);
  }
`;

export const CancelBtn = styled.button`
  height: 5rem;
  width: 5rem;
  border: none;
  border-radius: 50%;
  position: absolute;
  top: -8rem;
  right: 0;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  outline: none;
  cursor: pointer;

  svg {
    font-size: 2.4rem;
    fill: currentColor;
    transition: all 0.2s;
  }

  :hover {
    background-color: var(--color-earth-red);

    svg {
      transform: rotate(90deg);
    }
  }
`;

export const CancelLocationBtn = styled(CancelBtn)`
  top: 3rem;
  left: 3rem;
  border-radius: 0.5rem;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);

  svg {
    transition: none;
    margin-right: 0;
  }

  :hover {
    svg {
      transform: none;
    }
  }
`;

export const MapPreviewWrapper = styled.div`
  height: 30rem;
  padding: 2rem;
  background-color: var(--color-less-white);
  position: relative;

  :hover button {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;

export const MapPreviewPopup = styled(Popup)``;
