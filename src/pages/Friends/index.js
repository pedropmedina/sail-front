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
import { ReactComponent as SendIcon } from '../../assets/SVG/send.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

import Topbar from '../../components/Topbar';

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
              const { name, username, email, address, about, image } = friend;
              return (
                <Styled.Friend key={`${email}-${i}`}>
                  <Styled.DetailsRow>
                    <Styled.Name>{name ? name : username}</Styled.Name>
                    <Styled.About>{about ? about : 'One of many'}</Styled.About>
                    <Styled.Email as="h5">
                      <SendIcon className="icon icon-smallest" />
                      {email}
                    </Styled.Email>
                    <Styled.Address>
                      <PinIcon className="icon icon-smallest" />
                      {address.longitude && address.latitude ? '' : 'Miami, FL'}
                    </Styled.Address>
                  </Styled.DetailsRow>
                  <Styled.StatsRow>
                    <Styled.Img
                      src={image ? image : 'https://via.placeholder.com/80'}
                      alt="Profile image"
                    />
                    <Styled.FriendStats>
                      <Styled.FriendStat>
                        <Styled.StatHeading>Plans</Styled.StatHeading>
                        <Styled.StatData>
                          {friend.inPlans.length}
                        </Styled.StatData>
                      </Styled.FriendStat>
                      <Styled.FriendStat>
                        <Styled.StatHeading>Friends</Styled.StatHeading>
                        <Styled.StatData>
                          {friend.friends.length}
                        </Styled.StatData>
                      </Styled.FriendStat>
                    </Styled.FriendStats>
                  </Styled.StatsRow>
                  <Styled.FriendsFriendsRow>
                    <Styled.FriendsFriend>
                      <Styled.FriendsFriendImg
                        src="https://via.placeholder.com/60"
                        alt="Friends's friend profile"
                      />
                    </Styled.FriendsFriend>
                    <Styled.FriendsFriend>
                      <Styled.FriendsFriendImg
                        src="https://via.placeholder.com/60"
                        alt="Friends's friend profile"
                      />
                    </Styled.FriendsFriend>
                    <Styled.FriendsFriend>
                      <Styled.FriendsFriendImg
                        src="https://via.placeholder.com/60"
                        alt="Friends's friend profile"
                      />
                    </Styled.FriendsFriend>
                  </Styled.FriendsFriendsRow>
                </Styled.Friend>
              );
            })}
        </Styled.FriendsList>
      </Styled.Friends>
    </Styled.FriendsWrapper>
  );
};

export default Friends;
