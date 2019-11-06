import styled from 'styled-components/macro';

export const Form = styled.form`
  width: 100%;
`;

export const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`;

export const Field = styled.div`
  flex: 1 1 auto;
  margin: 1rem;
  min-height: 6rem;
  position: relative;
  border-radius: var(--size-smallest);
`;

export const Label = styled.label`
  position: absolute;
  bottom: 0;
  left: 2rem;
  color: var(--color-light-grey);
  opacity: 0;
  transition: all 0.2s;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: var(--size-smallest);
  outline: unset;
  padding-left: 2rem;
  font-size: var(--font-size-small);
  background-color: #fff;

  ::placeholder {
    color: var(--color-light-grey);
  }

  :valid + label,
  :focus + label {
    top: -2rem;
    opacity: 1;
    z-index: 1;
  }
`;

export const Textarea = styled(Input)`
  padding-top: 2rem;
  resize: none;
`;
