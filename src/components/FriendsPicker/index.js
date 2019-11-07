/* eslint-disable react/prop-types */
import styled from 'styled-components/macro'; // eslint-disable-line
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Avatar from 'react-user-avatar';

import * as Styled from './styled';
import {
  Select,
  SelectSearch,
  SelectSearchInput,
  SelectResults,
  SelectResultsList,
  SelectResultsItem,
  SelectPicksList,
  SelectPicksItem,
  SelectPickItemButton
} from '../../sharedStyles/select';

import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';

import ClickOutside from '../ClickOutside';

import { SEARCH_FRIENDS_QUERY } from '../../graphql/queries';

import { useColors } from '../../customHooks';

const FriendsPicker = ({ defaultInvites = [], onHandleInvites = () => {} }) => {
  const [searchText, setSearchText] = useState('');
  const [invites, setInvites] = useState(defaultInvites);
  const [showResults, setShowResults] = useState(false);
  const { data } = useQuery(SEARCH_FRIENDS_QUERY);
  const { colors } = useColors();

  useEffect(() => {
    onHandleInvites(invites);
  }, [invites]);

  const handleChange = event => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleAddInvite = invite => {
    setInvites(invites => [invite, ...invites]);
  };

  const handleRemoveInvite = invite => {
    setInvites(invites =>
      invites.filter(each => each.username !== invite.username)
    );
  };

  const onClickOutside = () => {
    setShowResults(false);
  };

  const onClickInside = () => {
    setShowResults(true);
  };

  const handleKeyDown = event => {
    if (event.key === 'Backspace' && invites.length > 0 && !searchText) {
      setInvites(prevInvites => prevInvites.slice(0, prevInvites.length - 1));
    }
  };

  return (
    <ClickOutside onClickOutside={onClickOutside} onClickInside={onClickInside}>
      <Styled.FriendsPicker>
        <Select>
          <SelectPicksList>
            {invites.map(invite => (
              <SelectPicksItem key={invite.email}>
                <Avatar
                  size="50"
                  name={invite.firstName ? invite.firstName : invite.username}
                  src={invite.image}
                  colors={colors}
                  style={{ marginRight: '0.5rem' }}
                />
                {invite.username}
                <SelectPickItemButton
                  onClick={() => handleRemoveInvite(invite)}
                >
                  <XIcon />
                </SelectPickItemButton>
              </SelectPicksItem>
            ))}
            <SelectPicksItem>
              <SelectSearch>
                <FilterIcon />
                <SelectSearchInput
                  id="search"
                  type="text"
                  value={searchText}
                  placeholder="Search and add friend to plan."
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </SelectSearch>
            </SelectPicksItem>
          </SelectPicksList>
          <SelectResults showResults={showResults}>
            <SelectResultsList>
              {data &&
                data.friends &&
                data.friends
                  .filter(f => {
                    const s = f.firstName
                      ? f.firstName + f.username + f.email
                      : f.username + f.email;
                    return searchText
                      ? s
                          .toLowerCase()
                          .includes(searchText.trim().toLowerCase())
                      : f;
                  })
                  .map(friend => (
                    <SelectResultsItem
                      key={friend.username}
                      onClick={() => handleAddInvite(friend)}
                    >
                      <Avatar
                        size="30"
                        name={
                          friend.firstName ? friend.firstName : friend.username
                        }
                        src={friend.image}
                        colors={colors}
                      />
                    </SelectResultsItem>
                  ))}
            </SelectResultsList>
          </SelectResults>
        </Select>
      </Styled.FriendsPicker>
    </ClickOutside>
  );
};

export default FriendsPicker;
