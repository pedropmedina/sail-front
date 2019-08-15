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
  grid-gap: 2.5rem;
`;

export const FieldLabel = styled.label`
  grid-column: 1 / -1;
  color: var(--color-light-grey);
  font-size: 1.2rem;
`;

export const Field = styled.input`
  height: 5rem;
  width: 100%;
  border: none;
  /* border-bottom: 0.2rem solid var(--color-light-grey); */
  color: var(--color-almost-white);
  text-indent: 1rem;
  font-size: 1.6rem;
  outline: none;
  margin-top: 1rem;

  &::placeholder {
    color: var(--color-almost-white);
  }
`;

export const FileField = styled(Field)`
  display: none;
  /* opacity: 1; */
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
  background-color: ${({ dragging }) => (dragging ? 'red' : '#fff')};
  height: 20rem;
  outline: 0.1rem dashed var(--color-light-grey);
  outline-offset: -1.5rem;
  display: flex;
  flex-wrap: wrap;

  > * {
    flex-basis: 100%;
  }
`;

export const UploadPreview = styled.div``;

export const UploadButton = styled(FieldLabel)`
  text-align: center;
`;

export const Button = styled.button`
  padding: 2rem;
  font-size: 1.6rem;
  border: none;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
`;

export const SaveButton = styled(Button)``;

export const CancelButton = styled(Button)``;
