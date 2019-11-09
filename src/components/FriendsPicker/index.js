/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as Styled from './styled';
import Select from '../Select';

import { SEARCH_FRIENDS_QUERY } from '../../graphql/queries';

const FriendsPicker = ({ defaultInvites, onHandleInvites }) => {
  const { data } = useQuery(SEARCH_FRIENDS_QUERY);

  const prepareOptions = friends => {
    return friends
      ? friends.map(friend => ({ ...friend, option: friend.username }))
      : [];
  };

  return (
    <Styled.FriendsPicker>
      <Select
        defaultPicks={defaultInvites}
        showPicks={true}
        options={prepareOptions(data.friends)}
        onPicksChange={onHandleInvites}
        label="Let friends be part of your plan"
      />
    </Styled.FriendsPicker>
  );
};

export default FriendsPicker;
