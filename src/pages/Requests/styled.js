import styled from 'styled-components/macro';

export const RequestsWrapper = styled.div`
  grid-row: 1 / -1;
  overflow-y: auto;
`;

export const RequestTypes = styled.article``;

export const RequestType = styled.section``;

export const Requests = styled.ul``;

export const SentRequests = styled(Requests)``;

export const ReceivedRequests = styled(Requests)``;

export const Request = styled.li``;

export const Filterbar = styled.div`
  padding: 2rem 5rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(max-content, 26rem)) minmax(
      max-content,
      100rem
    );
  column-gap: 3rem;
`;

export const FilterContainer = styled.div`
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
  width: 100%;
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
  padding: 2rem 2.5rem;
  display: inline-block;
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
      font-size: 1.7rem;
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
