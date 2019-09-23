/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';

import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';
import { ReactComponent as SendIcon } from '../../assets/SVG/send.svg';

const Friend = ({
  name = '',
  username = '',
  email = '',
  about = '',
  address = {},
  image = '',
  friendsQty = 0,
  plansQty = 0
}) => (
  <Styled.Friend>
    {/* Details Row containing profile information such as name, about, etc... */}
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
    {/* Stats Row containing profile image and stats */}
    <Styled.StatsRow>
      <Styled.Img
        src={image ? image : 'https://via.placeholder.com/80'}
        alt="Profile image"
      />
      <Styled.FriendStats>
        <Styled.FriendStat>
          <Styled.StatHeading>Plans</Styled.StatHeading>
          <Styled.StatData>{plansQty}</Styled.StatData>
        </Styled.FriendStat>
        <Styled.FriendStat>
          <Styled.StatHeading>Friends</Styled.StatHeading>
          <Styled.StatData>{friendsQty}</Styled.StatData>
        </Styled.FriendStat>
        <Styled.Link to={`/profile/${username}`}>View Profile</Styled.Link>
      </Styled.FriendStats>
    </Styled.StatsRow>
    {/* Friends Row containing user's friends */}
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

export default Friend;
