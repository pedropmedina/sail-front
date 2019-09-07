import styled from 'styled-components/macro';

export const Topbar = styled.div`
  display: flex;
  padding: 2rem 5rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Search = styled.form`
  flex-basis: 50vw;
  border: none;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const Input = styled.input`
  display: inline-block;
  height: 100%;
  width: 100%;
  border: none;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  font-size: 1.6rem;
  text-indent: 3.5rem;
  outline: none;
  padding: 1rem 2rem;

  &:focus {
    background-color: #fff;
  }

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const SearchBtn = styled.button`
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  border: none;
  background-color: inherit;
  color: var(--color-light-grey);
  outline: none;
`;

export const CreateNewBtn = styled.button`
  height: 5rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0 2rem;
  background-color: var(--color-medium-grey);
  color: var(--color-almost-white);
  font-size: 1.6rem;
  line-height: 3.2rem;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-grey);
  }

  > svg {
    vertical-align: sub;
    margin-left: 0.5rem;
  }
`;
