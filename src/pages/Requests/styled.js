import styled from 'styled-components/macro';

export const RequestsWrapper = styled.div`
  grid-row: 1 / -1;
  padding: 2rem 5rem;
  overflow-y: auto;
`;

export const RequestTypes = styled.article``;

export const RequestType = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(min-content, 1fr));
  column-gap: 3rem;
  margin-bottom: 2rem;
  padding: 2rem 0;
`;

export const RequestTypeHeading = styled.h2`
  color: var(--color-almost-black);
  font-weight: 300;
  font-size: 2.4rem;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
`;

export const Requests = styled.ul`
  list-style: none;
`;

export const Request = styled.li`
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: ${({ status }) =>
    status ? 'var(--color-almost-white)' : 'var(--color-light-grey)'};
  background-color: ${({ status }) =>
    status === 'PENDING'
      ? 'var(--color-warning)'
      : status === 'DENIED'
      ? 'var(--color-danger)'
      : status === 'ACCEPTED'
      ? 'var(--color-success)'
      : 'var(--color-almost-white)'};
  position: relative;
`;

export const RequestAuthor = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;

  b {
    text-transform: capitalize;
    font-weight: 700;
  }
`;

export const RequestImg = styled.img`
  width: 3rem;
  height: 3rem;
  display: inline-block;
  border-radius: 50%;
  border: 0.1rem solid var(--color-almost-white);
  padding: 0.2rem;
`;

export const RequestTime = styled.p``;

export const RequestTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 300;
`;

export const RequestDesc = styled.p``;

export const RequestStatus = styled.p`
  font-size: 1.4rem;
  text-transform: lowercase;
  text-align: right;
  width: fit-content;
  position: absolute;
  top: 1.5rem;
  right: 5rem;
  padding: 0.2rem 1rem;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const RequestDate = styled.p``;

export const RequestBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--color-almost-white);
  cursor: pointer;

  :focus {
    + div {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const RequestPopup = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% + 1rem);
  background-color: #fff;
  border-radius: 0.5rem;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s;
  box-shadow: 0 0.3rem 1.3rem rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
`;

export const PopupBtn = styled.button`
  display: block;
  width: 15rem;
  padding: 1rem 0;
  border: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--color-light-grey);
  font-size: 1.6rem;
  cursor: pointer;

  :hover {
    background-color: ${({ action }) =>
      action === 'accept'
        ? 'var(--color-success)'
        : action === 'deny'
        ? 'var(--color-danger)'
        : 'var(--color-less-white)'};
    color: #fff;
  }
`;

export const Side = styled.div``;

export const LeftSide = styled(Side)``;

export const RightSide = styled(Side)``;

export const SideHeading = styled.h3`
  font-weight: 300;
  font-size: 1.4rem;
  color: var(--color-light-grey);
  margin-bottom: 1rem;
`;

export const Filterbar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(max-content, 26rem)) minmax(
      max-content,
      100rem
    );
  column-gap: 3rem;
  margin-bottom: 3rem;
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
