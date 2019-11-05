import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { formatDistanceToNow } from 'date-fns';
import ClipLoader from 'react-spinners/ClipLoader';
import Avatar from 'react-user-avatar';

import { useColors } from '../../customHooks';

import * as Styled from './styled';
import { CreateBtn } from '../../stylesShare';

import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';

import ChatCreate from '../../components/ChatCreate';
import Chat from '../../components/Chat';

import {
  GET_CONVERSATIONS_QUERY,
  GET_CONVERSATION_QUERY,
  ME_QUERY
} from '../../graphql/queries';
import {
  CREATE_MESSAGE_MUTATION,
  UPDATE_CONVERSATION_UNREADCOUNT_MUTATION
} from '../../graphql/mutations';

const Chats = () => {
  const [searchText, setSearchText] = useState('');
  const [showChatCreate, setShowChatCreate] = useState(false);
  const { error, loading, data } = useQuery(GET_CONVERSATIONS_QUERY, {
    fetchPolicy: 'cache-and-network'
  });
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    ME_QUERY
  );
  const [
    getChat,
    { error: chatError, loading: chatLoading, data: chatData }
  ] = useLazyQuery(GET_CONVERSATION_QUERY);
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [updateConversationUnreadCount] = useMutation(
    UPDATE_CONVERSATION_UNREADCOUNT_MUTATION,
    { ignoreResults: true }
  );
  const { colors } = useColors();

  useEffect(() => {
    if (data.chats && !chatData) {
      setDefaultChat(0);
    }
  }, [data]);

  // reset unreadCount in selected conversation
  useEffect(() => {
    if (chatData && chatData.chat) {
      handleUpdateUnreadCount(chatData.chat, 'RESET');
    }
  }, [chatData]);

  const handleUpdateUnreadCount = async (chat, operation) => {
    const { _id: conversationId, unreadCount } = chat;
    const { _id: unreadCountId, count } = unreadCount;
    // only update if new messages have been posted
    if (count > 0) {
      await updateConversationUnreadCount({
        variables: {
          input: { conversationId, unreadCountId, operation }
        }
      });
    }
  };

  const setDefaultChat = index => {
    const conversation = data.chats[index];
    // make sure there's at least a conversation for this user
    if (conversation) {
      getChat({ variables: { conversationId: conversation._id } });
    }
  };

  const handleNewMessage = conversation => async content => {
    await createMessage({
      variables: { input: { conversation: conversation._id, content } }
    });

    // if in showChatCreate, unmount showChatCreate and view current chat
    if (showChatCreate) {
      handleCreateNewChat(conversation);
    }
  };

  const handleCancelNewMessage = () => {
    setShowChatCreate(false);
    setDefaultChat(0);
  };

  const handleClickChatItem = conversation => {
    getChat({ variables: { conversationId: conversation._id } });
    if (showChatCreate) setShowChatCreate(false);
  };

  const handleChange = event => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const filterChats = chats =>
    chats.filter(
      chat =>
        chat.participants.some(participant =>
          participant.username.toLowerCase().includes(searchText.toLowerCase())
        ) ||
        (chat.plan &&
          chat.plan.title.toLowerCase().includes(searchText.toLowerCase()))
    );

  const handleClickNewChat = () => {
    setShowChatCreate(true);
  };

  const handleCreateNewChat = async conversation => {
    setShowChatCreate(false);
    await getChat({ variables: { conversationId: conversation._id } });
  };

  // find existing chat for current participants
  // when interating over each chat.participats, total starts at 1 to exclude currentUser
  const findExistingChat = chats => (participants = []) => {
    const includesParticipants = chat =>
      chat.participants.reduce((total, participant) => {
        participants.includes(participant.username) ? total++ : total--;
        return total;
      }, 1);
    return chats.find(
      chat => includesParticipants(chat) === participants.length
    );
  };

  const filterOutPlanChats = chats => chats.filter(chat => !chat.plan);

  // if a two party chat, only return the other participant else return all participants
  const prepareParticipantsData = (chat, me) => {
    const { plan, participants } = chat;
    return !plan && participants.length === 2
      ? participants.filter(participant => participant.username !== me.username)
      : participants;
  };

  if ((!error || !meError) && (loading || meLoading))
    return <div>Loading...</div>;

  return (
    <Styled.ChatsWrapper>
      <Styled.Topbar>
        <Styled.TopbarLeft>
          <CreateBtn onClick={handleClickNewChat}>
            <EditIcon className="icon icon-small" />
          </CreateBtn>
        </Styled.TopbarLeft>
        <Styled.TopbarRight>
          <Styled.FilterMessages onSubmit={handleSubmit}>
            <Styled.FilterBtn>
              <FilterIcon className="icon icon-small" />
            </Styled.FilterBtn>
            <Styled.FilterMessagesInput
              placeholder="filter through messages"
              value={searchText}
              onChange={handleChange}
            />
          </Styled.FilterMessages>
        </Styled.TopbarRight>
      </Styled.Topbar>
      <Styled.Panels>
        {/* List of current Chats */}
        <Styled.LeftPanel>
          <Styled.ChatsList>
            {filterChats(data.chats).map(chat => (
              <Styled.ChatItem
                key={chat._id}
                onClick={() => handleClickChatItem(chat)}
                isSelected={
                  chatData && chatData.chat
                    ? chat._id === chatData.chat._id
                    : false
                }
              >
                <Styled.ChatPreview>
                  <Styled.ChatPreviewLeft>
                    <Styled.ChatParticipantsImgs>
                      {prepareParticipantsData(chat, meData.user).map(
                        participant => {
                          const { username, firstName, image } = participant;
                          return (
                            <Styled.ChatParticipantImg key={username}>
                              <Avatar
                                size="50"
                                name={firstName}
                                src={image}
                                colors={colors}
                              />
                            </Styled.ChatParticipantImg>
                          );
                        }
                      )}
                    </Styled.ChatParticipantsImgs>
                  </Styled.ChatPreviewLeft>
                  <Styled.ChatPreviewRight>
                    {chat.plan && (
                      <Styled.ChatPlan>
                        <CalendarIcon />
                        {chat.plan.title}
                      </Styled.ChatPlan>
                    )}
                    <Styled.ChatParticipantsNames>
                      {prepareParticipantsData(chat, meData.user).map(
                        (participant, i, arr) => {
                          const { email, username, firstName } = participant;
                          return !(arr.length - 1 === i) ? (
                            <Styled.ChatParticipantName key={email}>
                              {firstName ? firstName : username},&nbsp;
                            </Styled.ChatParticipantName>
                          ) : (
                            <Styled.ChatParticipantName key={email}>
                              {firstName ? firstName : username}
                            </Styled.ChatParticipantName>
                          );
                        }
                      )}
                    </Styled.ChatParticipantsNames>
                    <Styled.ChatDate>
                      {formatDistanceToNow(parseInt(chat.createdAt), {
                        addSuffix: true
                      })}
                    </Styled.ChatDate>
                    <Styled.ChatMsg>
                      <Styled.MsgContent>
                        {chat.messages[chat.messages.length - 1].content}
                      </Styled.MsgContent>
                    </Styled.ChatMsg>
                    {chat.unreadCount.count > 0 &&
                      (chatData &&
                        chatData.chat &&
                        chat._id !== chatData.chat._id) && (
                        <Styled.UnreadCountBadge>
                          {chat.unreadCount.count} new
                        </Styled.UnreadCountBadge>
                      )}
                  </Styled.ChatPreviewRight>
                </Styled.ChatPreview>
              </Styled.ChatItem>
            ))}
          </Styled.ChatsList>
        </Styled.LeftPanel>
        {/* Current Chat in view or ChatCreate component */}
        {!showChatCreate ? (
          <Styled.RightPanel>
            {(!chatError && chatLoading) || !chatData ? (
              <Styled.NoChatSelected>
                <ClipLoader
                  sizeUnit={'px'}
                  size={60}
                  color={'#6C8C96'}
                  loading={chatLoading}
                />
              </Styled.NoChatSelected>
            ) : (
              <Chat
                data={chatData.chat.messages}
                onCreateNew={handleNewMessage(chatData.chat)}
              />
            )}
          </Styled.RightPanel>
        ) : (
          <Styled.RightPanel>
            <ChatCreate
              onCancelNewMessage={handleCancelNewMessage}
              onCreateNewChat={handleCreateNewChat}
              findExistingChat={findExistingChat(
                filterOutPlanChats(data.chats)
              )}
              onCreateMessage={handleNewMessage}
            />
          </Styled.RightPanel>
        )}
      </Styled.Panels>
    </Styled.ChatsWrapper>
  );
};

export default Chats;
