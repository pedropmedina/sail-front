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
    height: 0.3rem;
    width: 1rem;
    opacity: 0;
    background-color: var(--color-medium-grey);
    transition: all 0.2s;
  }

  &:focus-within ::after {
    opacity: 1;
    width: 100%;
  }
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
  color: var(--color-light-grey);
  margin-top: 1rem;
  background-color: inherit;
  outline: none;
  background-color: var(--color-less-white);

  &::placeholder {
    color: var(--color-light-grey);
  }
`;
