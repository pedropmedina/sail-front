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
  position: relative;
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

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 2rem);
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem 0;
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

export const Results = styled.ul`
  list-style: none;
`;

export const Result = styled.li`
  font-size: 1.6rem;
  color: var(--color-light-grey);
  cursor: pointer;
  padding: 1rem 2rem;

  :hover {
    background-color: var(--color-almost-white);
    color: #fff;
  }
`;
