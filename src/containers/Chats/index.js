import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { formatDistanceToNow } from 'date-fns';
import Avatar from 'react-user-avatar';

import { useColors } from '../../hooks';

import * as Styled from './styled';
import { TopbarButton } from '../../sharedStyles/buttons';
import { NoContentFull } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';
import { ReactComponent as FrownIcon } from '../../assets/SVG/frown.svg';

import ChatCreate from '../../components/ChatCreate';
import Chat from '../../components/Chat';
import Loader from '../../components/Loader';

import {
  GET_CONVERSATION_QUERY,
  GET_CONVERSATIONS_ME_QUERY
} from '../../graphql/queries';
import {
  CREATE_MESSAGE_MUTATION,
  UPDATE_CONVERSATION_UNREADCOUNT_MUTATION
} from '../../graphql/mutations';

const Chats = () => {
  const [searchText, setSearchText] = useState('');
  const [showChatCreate, setShowChatCreate] = useState(false);
  const { loading, data } = useQuery(GET_CONVERSATIONS_ME_QUERY);
  const [getChat, { loading: chatLoading, data: chatData }] = useLazyQuery(
    GET_CONVERSATION_QUERY
  );
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [updateConversationUnreadCount] = useMutation(
    UPDATE_CONVERSATION_UNREADCOUNT_MUTATION,
    {
      ignoreResults: true
    }
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

  if (loading || !data) return <Loader loading={loading} />;

  return (
    <Wrapper>
      <Styled.Topbar>
        <Styled.TopbarLeft>
          <TopbarButton onClick={handleClickNewChat}>
            <EditIcon className='icon icon-small' />
          </TopbarButton>
        </Styled.TopbarLeft>
        <Styled.TopbarRight>
          <Styled.FilterMessages onSubmit={handleSubmit}>
            <Styled.FilterBtn>
              <FilterIcon className='icon icon-small' />
            </Styled.FilterBtn>
            <Styled.FilterMessagesInput
              placeholder='filter through messages'
              value={searchText}
              onChange={handleChange}
            />
          </Styled.FilterMessages>
        </Styled.TopbarRight>
      </Styled.Topbar>
      <Styled.Panels>
        {/* List of current Chats */}
        {data.chats.length === 0 && !showChatCreate ? (
          <NoContentFull>
            <FrownIcon />
            You have no chats, create one
          </NoContentFull>
        ) : (
          <>
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
                          {prepareParticipantsData(chat, data.me).map(
                            participant => {
                              const { username, image, fullName } = participant;
                              return (
                                <Styled.ChatParticipantImg key={username}>
                                  <Avatar
                                    size='50'
                                    name={fullName}
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
                          {prepareParticipantsData(chat, data.me).map(
                            (participant, i, arr) => {
                              const { email, fullName } = participant;
                              return !(arr.length - 1 === i) ? (
                                <Styled.ChatParticipantName key={email}>
                                  {fullName},&nbsp;
                                </Styled.ChatParticipantName>
                              ) : (
                                <Styled.ChatParticipantName key={email}>
                                  {fullName}
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
                          chatData &&
                          chatData.chat &&
                          chat._id !== chatData.chat._id && (
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
            {!showChatCreate ? (
              <Styled.RightPanel>
                {chatLoading || !chatData ? (
                  <Styled.NoChatSelected>
                    <Loader loading={chatLoading} />
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
                  me={data.me}
                />
              </Styled.RightPanel>
            )}
          </>
        )}
      </Styled.Panels>
    </Wrapper>
  );
};

export default Chats;
