import styled from 'styled-components/macro';

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  background-color: var(--color-almost-white);
  perspective: 100rem;
`;

export const Card = styled.div`
  width: 50rem;
  height: 75rem;
  color: #aaa;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2rem 7rem rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transform: ${({ signUpMode }) => (signUpMode ? 'rotateY(180deg)' : 'unset')};
`;

export const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 20rem min-content 1fr 20rem;
  justify-items: center;
  background-color: var(--color-almost-white);
  row-gap: 2rem;
  backface-visibility: hidden;
  transform: ${({ back }) => (back ? 'rotateY(180deg)' : 'unset')};
`;

export const Header = styled.header`
  align-self: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  margin-bottom: 1.2rem;
`;

export const Subtitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: normal;
`;

export const Text = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
`;

export const AltMode = styled.div`
  width: 50%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  > * {
    display: inline-block;
    font-size: 1.2rem;
  }

  > span {
    white-space: nowrap;
    margin-right: 1rem;
  }

  > button {
    font-size: 1.2rem;
    border: 0.1rem solid var(--color-sky-blue);
    color: var(--color-sky-blue);
  }
`;

export const Form = styled.form`
  width: 50%;

  > label {
    display: inline-block;
    margin-left: 2.5rem;
    padding-bottom: 0.3rem;
    font-size: 1.2rem;
  }

  > input {
    display: inline-block;
    width: 100%;
    height: 5rem;
    margin-bottom: 2.5rem;
    border: none;
    border: 0.1rem solid var(--color-light-grey);
    border-radius: 8rem;
    outline: none;
    background-color: inherit;
    text-indent: 2.5rem;
    font-size: 1.6rem;

    &::placeholder {
      color: var(--color-light-grey);
      font-weight: normal;
      letter-spacing: 0.1rem;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  border: 0.1rem solid var(--color-light-grey);
  border-radius: 8rem;
  outline: none;
  font-size: 1.6rem;
  background-color: var(--color-almost-white);
  height: 5rem;
  cursor: pointer;
`;

export const SubmitButton = styled(Button)`
  margin-top: 1.8rem;
  border: none;
  background-color: var(--color-sky-blue);
  font-size: 1.2rem;
  color: var(--color-almost-white);
  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.3);
  transition: 0.2s;
  transform-style: preserve-3d;
  backface-visibility: hidden;

  &:hover {
    transform: translateY(-0.2rem);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.5);
  }
`;
