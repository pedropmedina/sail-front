/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';

const Friend = ({
  name = '',
  username = '',
  address = {},
  image = '',
  friendsQty = 0,
  plansQty = 0
}) => (
  <Styled.Friend>
    {/* Details Row containing profile information such as name, about, etc... */}
    <Styled.DetailsRow>
      <Styled.Img
        src={image ? image : 'https://via.placeholder.com/80'}
        alt="Profile image"
      />
      <Styled.Name>{name ? name : username}</Styled.Name>
      <Styled.Address>
        {address.longitude && address.latitude ? '' : 'Miami, FL'}
      </Styled.Address>
    </Styled.DetailsRow>
    {/* Stats Row containing profile image and stats */}
    <Styled.StatsRow>
      <Styled.Stats>
        <Styled.Stat>
          <Styled.StatHeading>Plans</Styled.StatHeading>
          <Styled.StatData>{plansQty}</Styled.StatData>
        </Styled.Stat>
        <Styled.Stat>
          <Styled.StatHeading>Friends</Styled.StatHeading>
          <Styled.StatData>{friendsQty}</Styled.StatData>
        </Styled.Stat>
        <Styled.Link to={`/profile/${username}`}>View Profile</Styled.Link>
      </Styled.Stats>
    </Styled.StatsRow>
  </Styled.Friend>
);

export default Friend;
