import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { formatDistanceToNow } from 'date-fns';
import ClipLoader from 'react-spinners/ClipLoader';

import * as Styled from './styled';
import { CreateBtn } from '../../stylesShare';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import ChatCreate from '../../components/ChatCreate';

import Chat from '../../components/Chat';
import {
  GET_CONVERSATIONS_QUERY,
  GET_CONVERSATION_QUERY,
  ME_QUERY
} from '../../graphql/queries';
import {
  MESSAGE_CREATED_SUBSCRIPTION,
  CONVERSATION_CREATED_SUBSCRIPTION
} from '../../graphql/subscriptions';
import {
  CREATE_MESSAGE_MUTATION,
  UPDATE_CONVERSATION_UNREADCOUNT_MUTATION
} from '../../graphql/mutations';

const Chats = () => {
  const [searchText, setSearchText] = useState('');
  const [showChatCreate, setShowChatCreate] = useState(false);
  const { error, loading, data, subscribeToMore } = useQuery(
    GET_CONVERSATIONS_QUERY
  );
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

  useEffect(() => {
    subscribeToNewConversations();
    subscribeToNewMessages();
  }, []);

  useEffect(() => {
    if (data.chats && !chatData) {
      setDefaultChat(0);
    }
  }, [data]);

  // reset unreadCount in selected conversation for current user
  useEffect(() => {
    if (chatData && chatData.chat && (meData && meData.user)) {
      handleUpdateUnreadCount(chatData.chat, meData.user, 'RESET');
    }
  }, [chatData, meData]);

  const subscribeToNewMessages = () => {
    subscribeToMore({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { conversation } } = subscriptionData // prettier-ignore
        const chats = prev.chats.map(chat =>
          chat._id === conversation._id ? conversation : chat
        );
        return Object.assign({}, prev, { chats });
      }
    });
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: CONVERSATION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { conversation }} = subscriptionData // prettier-ignore
        return Object.assign({}, prev, {
          chats: [...prev.chats, conversation]
        });
      }
    });
  };

  const handleUpdateUnreadCount = async (chat, me, operation) => {
    const { _id: conversationId, unreadCount } = chat;
    const { _id: unreadCountId, count } = unreadCount.find(
      unread => unread.username === me.username
    );
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
    getChat({ variables: { conversationId: conversation._id } });
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
    chats.filter(chat =>
      chat.participants.some(participant =>
        participant.username.toLowerCase().includes(searchText)
      )
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

  const getUnreadCount = (chat, username) => {
    const unreadCount = chat.unreadCount.find(
      unread => unread.username === username
    );
    return unreadCount.count;
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
                      {chat.participants.map(participant => (
                        <Styled.ChatParticipantImg
                          key={participant.username}
                          dimension={
                            chat.participants.length > 1
                              ? 5 / chat.participants.length
                              : 5
                          }
                        >
                          <Styled.ParticipantImg
                            src={
                              participant.image
                                ? participant
                                : 'https://via.placeholder.com/70'
                            }
                            alt="User Image"
                            dimension={
                              chat.participants.length > 1
                                ? 5 / chat.participants.length
                                : 5
                            }
                          />
                        </Styled.ChatParticipantImg>
                      ))}
                    </Styled.ChatParticipantsImgs>
                  </Styled.ChatPreviewLeft>
                  <Styled.ChatPreviewRight>
                    <Styled.ChatParticipantsNames>
                      {chat.participants.map((participant, i, arr) =>
                        !(arr.length - 1 === i) ? (
                          <Styled.ChatParticipantName key={participant.email}>
                            {participant.username},&nbsp;
                          </Styled.ChatParticipantName>
                        ) : (
                          <Styled.ChatParticipantName key={participant.email}>
                            {participant.username}
                          </Styled.ChatParticipantName>
                        )
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
                    {getUnreadCount(chat, meData.user.username) > 0 &&
                      (chatData &&
                        chatData.chat &&
                        chat._id !== chatData.chat._id) && (
                        <Styled.UnreadCountBadge>
                          {getUnreadCount(chat, meData.user.username)} new
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
