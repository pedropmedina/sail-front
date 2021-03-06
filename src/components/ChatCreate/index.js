/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ClipLoader } from 'react-spinners';
import Avatar from 'react-user-avatar';

import { SEARCH_PEOPLE_QUERY } from '../../graphql/queries';
import { CREATE_CONVERSATION_MUTATION } from '../../graphql/mutations';
import { searchOnTimeout } from '../../utils';
import { useColors } from '../../hooks/useColors';

import * as Styled from './styled';

import Chat from '../Chat';

const ChatCreate = ({
  onCancelNewMessage,
  onCreateNewChat,
  findExistingChat,
  onCreateMessage,
  me
}) => {
  const [participants, setParticipants] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [existingChat, setExistingChat] = useState(null);
  const [searchPeople, { error, loading, data }] = useLazyQuery(
    SEARCH_PEOPLE_QUERY
  );
  const [createChat] = useMutation(CREATE_CONVERSATION_MUTATION, {
    ignoreResults: true
  });
  const { colors } = useColors();

  useEffect(() => {
    if (searchText) {
      const timeout = searchOnTimeout(
        searchPeople({ variables: { searchText } }),
        400
      );
      return () => clearTimeout(timeout);
    }
  }, [searchText]);

  useEffect(() => {
    if (participants.length > 0) {
      const chat = findExistingChat(participants);
      chat ? setExistingChat(chat) : setExistingChat(null);
    } else {
      setExistingChat(null);
    }
  }, [participants]);

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const handleClickFriend = friend => {
    setParticipants(prevState => {
      return [...prevState, friend.username];
    });
    setSearchText('');
  };

  const handleKeyDown = event => {
    if (event.key === 'Backspace' && participants.length > 0 && !searchText) {
      setParticipants(prevState => prevState.slice(0, prevState.length - 1));
    }
  };

  const handleCreateNew = async message => {
    if (!existingChat) {
      const { data } = await createChat({
        variables: { input: { participants, message } }
      });
      onCreateNewChat(data.conversation);
    } else {
      onCreateMessage(existingChat)(message);
    }
  };

  return (
    <Styled.ChatCreateWrapper>
      <Styled.ToContainer>
        <Styled.ToTopbar>
          <Styled.TopbarHeading>Add New Message</Styled.TopbarHeading>
          <Styled.TopbarCancelBtn onClick={onCancelNewMessage}>
            Cancel
          </Styled.TopbarCancelBtn>
        </Styled.ToTopbar>
        <Styled.ToLeft>Sent to:</Styled.ToLeft>
        <Styled.ToRight>
          <Styled.ToList>
            {participants.map((to, i) => (
              <Styled.ToItem key={i}>{to}</Styled.ToItem>
            ))}
            <Styled.ToItemInput>
              <Styled.ToForm onSubmit={event => event.preventDefault()}>
                <Styled.ToInput
                  value={searchText}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Styled.ToForm>
            </Styled.ToItemInput>
          </Styled.ToList>
        </Styled.ToRight>
      </Styled.ToContainer>
      <Styled.FriendsContainer isVisible={!!searchText}>
        {!error && loading ? (
          <Styled.Loading>
            <ClipLoader
              sizeUnit={'px'}
              size={40}
              color={'#6C8C96'}
              loading={loading}
            />
          </Styled.Loading>
        ) : data ? (
          <Styled.FriendsList>
            {data.people
              .filter(friend => friend.username !== me.username)
              .map((friend, i) => (
                <Styled.FriendItem
                  key={`${friend.username}-${i}`}
                  onClick={() => handleClickFriend(friend)}
                >
                  <Avatar
                    size='50'
                    name={friend.fullName}
                    src={friend.image}
                    colors={colors}
                    style={{ marginRight: '1rem' }}
                  />
                  {friend.username}
                </Styled.FriendItem>
              ))}
          </Styled.FriendsList>
        ) : null}
      </Styled.FriendsContainer>
      <Styled.ChatContainer>
        <Chat
          data={existingChat ? existingChat.messages : []}
          onCreateNew={handleCreateNew}
        />
      </Styled.ChatContainer>
    </Styled.ChatCreateWrapper>
  );
};

export default ChatCreate;
