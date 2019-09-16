import styled from 'styled-components/macro';

import { Box } from '../../stylesShare';

export const FriendsPickerWrapper = styled.div``;

export const FriendsPicker = styled.article`
  background-color: inherit;
  color: inherit;
  position: relative;
`;

export const FriendsPickerSearch = styled.article`
  display: flex;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  height: 6rem;
  font-size: inherit;
  background-color: inherit;
  color: var(--color-dark-grey);
  border: none;
  outline: none;
  text-indent: 2rem;
  flex: 1;

  ::placeholder {
    color: var(--color-light-grey);
  }
`;

export const FriendsPickerResults = styled(Box)`
  display: ${({ showResults }) => (showResults ? 'block' : 'none')};
  padding: 1rem 0;
  max-height: calc((5rem * 5) + 10rem + 1rem);
  overflow-y: auto;
`;

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

export const FriendImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const PicksList = styled(List)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const PicksItem = styled(Item)`
  height: 6rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  font-size: 1.2rem;
  position: relative;
`;

export const FriendsList = styled(List)``;

export const Friend = styled(Item)`
  padding: 1rem 2rem;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
    cursor: pointer;
  }
`;

export const RemoveFriendBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background-color: transparent;
  outline: none;

  :hover svg {
    fill: #fff;
    cursor: pointer;
  }

  svg {
    font-size: 1.2rem;
    fill: var(--color-almost-white);
  }
`;
