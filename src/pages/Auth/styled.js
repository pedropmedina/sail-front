import styled from 'styled-components/macro';

import abstractMapImg from '../../assets/auth-abstract-map.jpg';

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-light-grey),
    var(--color-almost-white)
  );
`;

export const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(40rem, 45rem));
  box-shadow: 0 2rem 7rem rgba(0, 0, 0, 0.3);
  color: #aaa;
`;

export const LeftPanel = styled.div`
  display: grid;
  grid-template-rows: 20rem min-content 1fr 15rem;
  justify-items: center;
  background-color: var(--color-almost-white);
  row-gap: 3rem;
`;

export const RightPanel = styled.div`
  background-image: url(${abstractMapImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Logo = styled.div`
  font-size: 3rem;
  align-self: center;
`;

export const Intro = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
`;

export const CreateAccount = styled.div`
  width: 60%;
  align-self: center;
  display: flex;
  align-items: center;

  > * {
    display: inline-block;
    font-size: 1.2rem;
  }

  > span {
    flex-basis: 60%;
    text-align: center;
  }

  > button {
    flex-basis: 40%;
    font-size: 1.2rem;
    padding: 1rem;
    border: 0.1rem solid var(--color-sky-blue);
    color: var(--color-sky-blue);
  }
`;

export const Form = styled.form`
  width: 60%;

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

export const Btn = styled.button`
  width: 100%;
  border: none;
  border: 0.1rem solid var(--color-light-grey);
  border-radius: 8rem;
  outline: none;
  font-size: 1.6rem;
  background-color: var(--color-almost-white);
  height: 5rem;
`;

export const LoginBtn = styled(Btn)`
  background-color: var(--color-sky-blue);
  font-size: 1.2rem;
  color: var(--color-almost-white);
  border: none;
  margin-top: 1.8rem;
`;
