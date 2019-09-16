import styled from 'styled-components/macro';

export const PlanCreate = styled.section`
  grid-column: col-1-start / col-2-end !important;
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

export const Btn = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  font-size: 1.6rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  svg {
    font-size: 2.4rem;
    fill: currentColor;
    transition: all 0.2s;
  }
`;

export const CreateBtn = styled(Btn)`
  :hover {
    background-color: var(--color-medium-grey);
  }

  svg {
    vertical-align: sub;
    margin-right: 1rem;
  }
`;

export const CancelBtn = styled(Btn)`
  height: 5rem;
  width: 5rem;
  padding: 1rem;
  border-radius: 50%;
  position: absolute;
  top: -8rem;
  right: 0;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);

  :hover {
    background-color: var(--color-earth-red);

    svg {
      transform: rotate(90deg);
    }
  }
`;
