import styled from 'styled-components/macro';

export const RequestsWrapper = styled.div`
  padding: 2rem 5rem;
  overflow-y: auto;
`;

export const RequestTypes = styled.article``;

export const RequestType = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const RequestTypeHeading = styled.h2`
  flex-basis: 100%;

  padding: 2rem;
  color: var(--color-almost-black);
  font-weight: 300;
  font-size: 2.4rem;
`;

export const Requests = styled.ul`
  list-style: none;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 1.5rem;
`;

export const Side = styled.div`
  flex: 1 1 auto;
  padding: 2rem;
`;

export const LeftSide = styled(Side)``;

export const RightSide = styled(Side)``;

export const SideHeading = styled.h3`
  font-weight: 300;
  font-size: 1.4rem;
  color: var(--color-light-grey);
  margin-bottom: 1rem;
`;

export const Filterbar = styled.div`
  padding: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  column-gap: 3rem;
  row-gap: 1rem;
`;

export const FilterContainer = styled.div`
  height: 6rem;
  position: relative;
`;

export const FilterList = styled.ul`
  list-style: none;
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 0.5rem;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s;
  box-shadow: 0 0.3rem 1.3rem rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const FilterItem = styled.li`
  color: var(--color-light-grey);
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;

  :hover {
    background-color: var(--color-less-white);
    color: #fff;
  }
`;

export const FilterSearch = styled.form`
  height: 100%;
  color: var(--color-light-grey);
  position: relative;

  svg {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SearchInput = styled.input`
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  border: none;
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  text-indent: 6rem;
  border-radius: 0.5rem;
  outline: none;

  ::placeholder {
    color: var(--color-light-grey);
  }

  :focus {
    background-color: #fff;
  }
`;

export const FilterBtn = styled.button`
  border: none;
  padding: 0 2.5rem;
  text-align: center;
  height: 100%;
  font-size: 1.6rem;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin: 0 0.8rem;
    display: block;

    :first-child {
      margin-left: auto;
      height: 3rem;
      width: 3rem;
      padding: 0.6rem;
      border-radius: 50%;

      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    :last-child {
      margin-right: 0;
    }
  }

  :focus {
    background-color: #fff;

    + ul {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    }
  }
`;
