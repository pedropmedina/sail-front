import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_FRIENDS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';

import Topbar from '../../components/Topbar';
import Friend from '../../components/Friend';

const Friends = () => {
  const { error, loading, data: friendsData } = useQuery(SEARCH_FRIENDS_QUERY, {
    fetchPolicy: 'cache-and-network'
  });

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.FriendsWrapper>
      <Topbar />
      <Styled.Friends>
        <Styled.FriendsList>
          {friendsData &&
            friendsData.friends &&
            friendsData.friends.map((friend, i) => {
              return (
                <Friend
                  key={`${friend.username}-${i}`}
                  plansQty={friend.inPlans.length}
                  friendsQty={friend.friends.length}
                  {...friend}
                />
              );
            })}
        </Styled.FriendsList>
      </Styled.Friends>
    </Styled.FriendsWrapper>
  );
};

export default Friends;
