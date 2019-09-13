/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';
import ClickOutside from '../ClickOutside';

const FriendsPicker = ({ css = {} }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setSearchText(value);
  };

  return (
    <ClickOutside>
      <Styled.FriendsPickerWrapper css={css}>
        <Styled.FriendsPicker>
          {/* Picks */}
          <Styled.Picks>
            <Styled.PicksList>
              <Styled.PicksItem>Pick #1</Styled.PicksItem>
              <Styled.PicksItem>Pick #2</Styled.PicksItem>
            </Styled.PicksList>
          </Styled.Picks>
          {/* Search */}
          <Styled.FriendsPickerSearch>
            <Styled.SearchInput
              type="text"
              value={searchText}
              placeholder="Pick friends"
              onChange={handleChange}
            />
          </Styled.FriendsPickerSearch>
          {/* Results */}
          <Styled.FriendsPickerResults>
            <Styled.FriendsList>
              <Styled.Friend>Friend #1</Styled.Friend>
              <Styled.Friend>Friend #2</Styled.Friend>
            </Styled.FriendsList>
          </Styled.FriendsPickerResults>
        </Styled.FriendsPicker>
      </Styled.FriendsPickerWrapper>
    </ClickOutside>
  );
};

export default FriendsPicker;
