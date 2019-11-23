import styled from 'styled-components/macro';

export const FriendsWrapper = styled.div`
  overflow-y: auto;
  position: relative;
  padding: 2rem 5rem;
`;

export const Friends = styled.div`
  height: calc(100% - 15rem);
`;

export const FriendsList = styled.ul`
  list-style: none;

  display: flex;
  flex-wrap: wrap;
`;
