/* eslint-disable react/prop-types */
import React from 'react';
import Avatar from 'react-user-avatar';

import { useColors } from '../../hooks';

import * as Styled from './styled';

const Friend = ({
  username = '',
  image = '',
  friendsQty = 0,
  plansQty = 0,
  fullName
}) => {
  const { colors } = useColors();
  return (
    <Styled.Friend>
      {/* Details Row containing profile information such as name, about, etc... */}
      <Styled.DetailsRow>
        <Avatar size='80' name={fullName} src={image} colors={colors} />
        <Styled.Name>{fullName}</Styled.Name>
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
};

export default Friend;
