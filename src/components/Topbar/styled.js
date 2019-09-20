import styled from 'styled-components/macro';

export const Topbar = styled.div`
  display: flex;
  padding: 2rem 5rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const LeftSide = styled.div``;

export const RightSide = styled.div`
  flex-basis: 50vw;
`;

export const Search = styled.form`
  height: 100%;
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
