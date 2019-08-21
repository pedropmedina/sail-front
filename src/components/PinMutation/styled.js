import styled from 'styled-components/macro';
import { animated } from 'react-spring';

import { Btn, CloseBtn } from '../../stylesShare';

export const PinMutation = styled(animated.div)`
  height: calc(100vh - 3rem);
  width: 40rem;
  position: absolute;
  top: 3rem;
  left: 3rem;
  z-index: 2;
  padding: 10rem 2rem;
  border-radius: 3rem 3rem 0 0;
  background-color: var(--color-almost-white);
`;

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(4, min-content);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3.5rem;
`;

export const FieldLabel = styled.label`
  grid-column: 1 / -1;
  color: var(--color-light-grey);
  font-size: 1.2rem;
  position: relative;

  &::after {
    content: ${({ error }) => (error ? `"${error}"` : '')};
    display: block;
    color: var(--color-earth-red);
    position: absolute;
    bottom: -2.5rem;
    left: 0;
  }
`;

export const Field = styled.input`
  height: 5rem;
  width: 100%;
  color: var(--color-light-grey);
  text-indent: 1rem;
  font-size: 1.6rem;
  outline: none;
  margin-top: 1rem;
  display: ${({ fileType }) => (fileType ? 'none' : 'initial')};
  border: ${({ error }) =>
    error ? '.1rem solid var(--color-earth-red)' : 'none'};

  &::placeholder {
    color: var(--color-almost-white);
  }
`;

export const TextField = styled(Field)`
  height: 20rem;
  resize: none;
  padding-top: 1rem;

  &::placeholder {
    color: var(--color-almost-white);
  }
`;

export const Upload = styled.div`
  grid-column: 1 / -1;
  background-color: ${({ dragging }) => (dragging ? 'rgba(0,0,0,.1)' : '#fff')};
  color: var(--color-light-grey);
  height: 20rem;
  outline: 0.1rem dashed var(--color-light-grey);
  outline-offset: -1.5rem;
  display: grid;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 3rem;
  position: relative;
  border: ${({ error }) =>
    error ? '.1rem solid var(--color-earth-red)' : 'none'};

  > * {
    flex-basis: 100%;
    height: 40%;
    text-align: center;
  }

  &::after {
    content: ${({ error }) => (error ? `"${error}"` : '')};
    display: block;
    color: var(--color-earth-red);
    position: absolute;
    bottom: -2.5rem;
    left: 0;
    font-size: 1.2rem;
  }
`;

export const UploadPreview = styled.figure`
  grid-column: 1 / -1;
  height: 20rem;
  position: relative;
  opacity: ${({ dragging }) => (dragging ? 0.5 : 1)};
  border: ${({ error }) =>
    error ? '.1rem solid var(--color-earth-red)' : 'none'};

  &:hover button {
    opacity: 1;
    top: -1.5rem;
  }

  &::after {
    content: ${({ error }) => (error ? `"${error}"` : '')};
    display: block;
    color: var(--color-earth-red);
    position: absolute;
    bottom: -2.5rem;
    left: 0;
    font-size: 1.2rem;
  }
`;

export const PreviewImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border: 0.5rem solid white;
`;

export const SaveButton = styled(Btn)`
  grid-column: 1 / -1;
  background-color: var(--color-sky-blue);
  color: var(--color-almost-white);
  border-radius: 3rem;

  &:hover {
    background-color: rgba(71, 131, 230, 0.7);
  }
`;

export const CancelButton = styled(CloseBtn)`
  top: 4rem;
  right: -2rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  opacity: 1;

  &:hover {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;
