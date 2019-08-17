import styled from 'styled-components/macro';

export const PinMutation = styled.div`
  z-index: 15;
  height: 100vh;
  width: 30rem;
  position: absolute;
  left: ${({ isMutation }) => (isMutation ? '-30rem' : '-60rem')};
  top: 0;
  padding: 5rem 2rem;
  background-color: var(--color-almost-white);
  transition: all 0.2s;
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

export const Button = styled.button`
  padding: 2rem;
  font-size: 1.6rem;
  border: none;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  outline: none;
  border: 0.2rem solid transparent;
  cursor: pointer;
`;

export const SaveButton = styled(Button)`
  background-color: var(--color-sky-blue);
  color: var(--color-almost-white);

  &:hover {
    background-color: rgba(71, 131, 230, 0.7);
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: 0.2rem solid currentColor;
  color: var(--color-earth-red);

  &:hover {
    border: none;
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;

export const PreviewButton = styled(Button)`
  position: absolute;
  top: 0;
  right: -1rem;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  /* box-shadow: 0 0.5rem 0.5rem 0.2rem rgba(0, 0, 0, 0.3); */
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;

  &:hover {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;
