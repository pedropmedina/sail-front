/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';

import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import ClickOutside from '../ClickOutside';

const FriendsPicker = ({ css = {}, friends = [] }) => {
  const [searchText, setSearchText] = useState('');
  const [invites, setInvites] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleChange = event => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleAddInvite = invite => {
    setInvites(invites => [invite, ...invites]);
  };

  const handleRemoveInvite = invite => {
    setInvites(invites => invites.filter(name => name !== invite));
  };

  const onClickOutside = () => {
    setShowResults(false);
  };

  const onClickInside = () => {
    setShowResults(true);
  };

  return (
    <ClickOutside onClickOutside={onClickOutside} onClickInside={onClickInside}>
      <Styled.FriendsPickerWrapper css={css}>
        <Styled.FriendsPicker>
          {/* Search */}
          <Styled.FriendsPickerSearch>
            <Styled.PicksList>
              {invites.map((f, i) => (
                <Styled.PicksItem key={i}>
                  <Styled.FriendImg src="https://via.placeholder.com/50" />
                  {f}
                  <Styled.RemoveFriendBtn onClick={() => handleRemoveInvite(f)}>
                    <XIcon />
                  </Styled.RemoveFriendBtn>
                </Styled.PicksItem>
              ))}
            </Styled.PicksList>
            <Styled.SearchLabel>
              <FilterIcon className="icon icon-small" />
              <Styled.SearchInput
                type="text"
                value={searchText}
                placeholder="Search and add friend to plan."
                onChange={handleChange}
              />
            </Styled.SearchLabel>
          </Styled.FriendsPickerSearch>
          {/* Results */}
          <Styled.FriendsPickerResults showResults={showResults}>
            <Styled.FriendsList>
              {friends &&
                friends
                  .filter(f => {
                    const s = f.name
                      ? f.name + f.username + f.email
                      : f.username + f.email;
                    return searchText
                      ? s
                          .toLowerCase()
                          .includes(searchText.trim().toLowerCase())
                      : f;
                  })
                  .map(({ name, username, email, image }, i) => (
                    <Styled.Friend
                      key={`${i}-${email}`}
                      onClick={() => handleAddInvite(email)}
                      disabled={invites.includes(email)}
                    >
                      <Styled.FriendImg
                        src={image ? image : 'https://via.placeholder.com/50'}
                      />
                      {name ? name : username}
                    </Styled.Friend>
                  ))}
            </Styled.FriendsList>
          </Styled.FriendsPickerResults>
        </Styled.FriendsPicker>
      </Styled.FriendsPickerWrapper>
    </ClickOutside>
  );
};

export default FriendsPicker;
