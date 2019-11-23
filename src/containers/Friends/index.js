import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ClipLoader } from 'react-spinners';

import { SEARCH_FRIENDS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { Spinner, NoContentFull } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers'

import { ReactComponent as FrownIcon } from '../../assets/SVG/frown.svg';

import Topbar from '../../components/Topbar';
import Friend from '../../components/Friend';

const Friends = () => {
  const { error, loading, data: friendsData } = useQuery(SEARCH_FRIENDS_QUERY, {
    fetchPolicy: 'cache-and-network'
  });

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Wrapper>
      <Topbar />
      <Styled.Friends>
        {loading && !friendsData ? (
          <Spinner>
            <ClipLoader
              sizeUnit={'rem'}
              size={4}
              color={'#6C8C96'}
              loading={loading && !friendsData}
            />
          </Spinner>
        ) : friendsData.friends && friendsData.friends.length === 0 ? (
          <NoContentFull>
            <FrownIcon />
            You have not friends
          </NoContentFull>
        ) : (
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
        )}
      </Styled.Friends>
    </Wrapper>
  );
};

export default Friends;
