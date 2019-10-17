import styled from 'styled-components/macro';

export const FriendsWrapper = styled.div`
  overflow-y: auto;
`;

export const TopbarBtn = styled.button`
  border: none;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin: 0 1rem;
  cursor: pointer;

  :hover {
    background-color: #fff;
  }
`;

export const Friends = styled.div`
  padding: 2rem 5rem;
`;

export const FriendsList = styled.ul`
  list-style: none;

  display: flex;
  flex-wrap: wrap;
`;
