import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_FRIENDS_QUERY } from '../../graphql/queries';

import * as Styled from './styled';
import { ReactComponent as BellIcon } from '../../assets/SVG/bell.svg';
import { ReactComponent as MessageIcon } from '../../assets/SVG/message-square.svg';

import Topbar from '../../components/Topbar';
import Friend from '../../components/Friend';

const Friends = () => {
  const { error, loading, data: friendsData } = useQuery(SEARCH_FRIENDS_QUERY);

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.FriendsWrapper>
      <Topbar>
        <Styled.TopbarBtn>
          <BellIcon className="icon icon-small" />
        </Styled.TopbarBtn>
        <Styled.TopbarBtn>
          <MessageIcon className="icon icon-small" />
        </Styled.TopbarBtn>
      </Topbar>
      <Styled.Friends>
        <Styled.FriendsList>
          {friendsData &&
            friendsData.friends &&
            friendsData.friends.map((friend, i) => {
              const { friends, inPlans, ...rest } = friend;
              return (
                <Friend
                  key={`${rest.username}-${i}`}
                  plansQty={inPlans.length}
                  friendsQty={friends.length}
                  {...rest}
                />
              );
            })}
        </Styled.FriendsList>
      </Styled.Friends>
    </Styled.FriendsWrapper>
  );
};

export default Friends;
