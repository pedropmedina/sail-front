import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_FRIENDS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { NoContentFull } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as FrownIcon } from '../../assets/SVG/frown.svg';

import Topbar from '../../components/Topbar';
import Friend from '../../components/Friend';
import Loader from '../../components/Loader';

const Friends = () => {
  const { loading, data } = useQuery(SEARCH_FRIENDS_QUERY, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading || !data) return <Loader loading={loading} />;

  return (
    <Wrapper>
      <Topbar />
      <Styled.Friends>
        {data.friends.length === 0 ? (
          <NoContentFull>
            <FrownIcon />
            You have not friends
          </NoContentFull>
        ) : (
          <Styled.FriendsList>
            {data.friends.map((friend, i) => {
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
        )}
      </Styled.Friends>
    </Wrapper>
  );
};

export default Friends;
