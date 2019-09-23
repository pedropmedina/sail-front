import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

import { searchOnTimeout } from '../../utils';

import {
  SEARCH_FRIENDS_QUERY,
  SEARCH_PEOPLE_QUERY
} from '../../graphql/queries';

import * as Styled from './styled';
import { ReactComponent as BellIcon } from '../../assets/SVG/bell.svg';
import { ReactComponent as MessageIcon } from '../../assets/SVG/message-square.svg';

import Topbar from '../../components/Topbar';
import Friend from '../../components/Friend';

const Friends = () => {
  const [searchText, setSearchText] = useState('');
  const [searchPeople, { data: searchData }] = useLazyQuery(
    SEARCH_PEOPLE_QUERY
  );
  const { error, loading, data: friendsData } = useQuery(SEARCH_FRIENDS_QUERY);

  useEffect(() => {
    const timeout = searchOnTimeout(() => {
      searchPeople({ variables: { searchText } });
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  const handleSearch = event => {
    setSearchText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.FriendsWrapper>
      <Topbar
        value={searchText}
        placeholder="Search for friends..."
        onSearch={handleSearch}
        onSubmit={handleSubmit}
        results={searchData && searchData.people ? searchData.people : []}
      >
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
