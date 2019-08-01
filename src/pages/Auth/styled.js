import styled from 'styled-components/macro';

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  background: linear-gradient(
    45deg,
    var(--color-light-grey),
    var(--color-almost-white)
  );
`;

export const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: minmax(min-content, 70vh);
  box-shadow: 0 2rem 7rem rgba(0, 0, 0, 0.3);
  color: #aaa;
`;

export const LeftPanel = styled.div`
  display: grid;
  grid-template-rows: 15rem min-content repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  background-color: var(--color-almost-white);
`;

export const RightPanel = styled.div``;

export const Logo = styled.div``;

export const Intro = styled.div``;

export const CreateAccount = styled.div``;

export const Form = styled.form`
  width: 70%;

  > input {
    display: inline-block;
    width: 100%;
    height: 5rem;
    margin-bottom: 2rem;
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
  /* background: linear-gradient(var(--color-earth-red), var(--color-light-grey)); */
`;
