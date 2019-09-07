import styled from 'styled-components/macro';

export const PlanCreate = styled.section`
  grid-column: col-2-start / col-2-end;
  padding: 5rem;
`;

export const Fields = styled.div`
  width: 70vh;
  max-width: 70rem;
  margin: 0 auto;
`;

export const Field = styled.div`
  display: block;
  color: var(--color-light-grey);
  margin-bottom: 2rem;
  width: 100%;
`;

export const Input = styled.input`
  font-size: 1.6rem;
  height: 5rem;
  display: block;
  width: 100%;
  text-indent: 1rem;
  border: none;
  border: 0.1rem solid var(--color-ligh-grey);
  border-radius: 0.5rem;
  color: var(--color-light-grey);
  margin-top: 1rem;

  &::placeholder {
    color: var(--color-light-grey);
  }
`;
