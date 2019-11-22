import styled, { css } from 'styled-components/macro';

export const ChatCreateWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: minmax(5rem, max-content);
`;

export const ToContainer = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / -1;
  background-color: var(--color-medium-grey);
  z-index: 1;
  padding: 1rem;
  font-size: 1.4rem;

  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 1rem;
  align-items: center;
`;

export const FriendsContainer = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / -1;
  opacity: 0;
  transition: all 0.2s;

  ${({ isVisible }) =>
    isVisible &&
    css`
      grid-row: 2 / span 1;
      z-index: 1;
      opacity: 1;
      background-color: var(--color-less-white);
    `}
`;

export const ChatContainer = styled.div`
  grid-row: 2 / span 1;
  grid-column: 1 / -1;
  height: 100%;
  overflow: auto;
`;

export const ToTopbar = styled.div`
  grid-column: 1 / -1;

  display: flex;
  justify-content: space-between;
`;

export const ToLeft = styled.div`
  grid-column: 1 / span 1;
  margin-right: 0.5rem;
`;

export const ToRight = styled.div`
  grid-column: 2 / span 1;
`;

export const ToForm = styled.form`
  display: inline-block;
  height: 100%;
  width: fit-content;
`;

export const ToInput = styled.input`
  display: inline-block;
  height: 100%;
  width: 100%;
  font-size: 1.4rem;
  background-color: transparent;
  border: none;
  text-indent: 1rem;
  outline: unset;
  color: var(--color-almost-white);
`;

export const ToList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  list-style: none;
`;

export const ToItem = styled.li`
  background-color: var(--color-less-white);
  color: var(--color-medium-grey);
  padding: 0 1rem;
  border-radius: 1rem;
  margin: 0.1rem;
`;

export const ToItemInput = styled.li``;

export const TopbarHeading = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const TopbarCancelBtn = styled.button`
  border: none;
  outline: unset;
  background-color: transparent;
  color: var(--color-almost-white);
  font-size: 1.6rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const FriendsList = styled.ul`
  list-style: none;
  color: var(--color-light-grey);
`;

export const FriendItem = styled.li`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  cursor: pointer;
  border-bottom: 0.1rem solid var(--color-almost-white);

  :hover {
    background-color: var(--color-almost-white);
  }
`;

export const Loading = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
