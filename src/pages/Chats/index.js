import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { formatDistanceToNow } from 'date-fns';
import ClipLoader from 'react-spinners/ClipLoader';

import * as Styled from './styled';

import Chat from '../../components/Chat';
import {
  GET_CONVERSATIONS_QUERY,
  GET_CONVERSATION_QUERY
} from '../../graphql/queries';
import { MESSAGE_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations';

const Chats = () => {
  const [selected, setSelected] = useState(null);
  const { error, loading, data, subscribeToMore } = useQuery(
    GET_CONVERSATIONS_QUERY
  );
  const [
    getChat,
    { error: chatError, loading: chatLoading, data: chatData }
  ] = useLazyQuery(GET_CONVERSATION_QUERY);
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  useEffect(() => {
    if (data.chats && !chatData) {
      const conversationId = data.chats[0]._id;
      getChat({ variables: { conversationId } });
      setSelected(conversationId);
    }
  }, [data]);

  useEffect(() => {
    subscribeToNewMessages();
  }, []);

  const handleNewMessage = conversation => async content => {
    await createMessage({ variables: { input: { conversation, content } } });
  };

  const subscribeToNewMessages = () => {
    subscribeToMore({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { message } } = subscriptionData // prettier-ignore
        const chats = prev.chats.map(chat =>
          chat._id === message.conversation._id
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        );
        return Object.assign({}, prev, { chats });
      }
    });
  };

  const handleClickChatItem = conversationId => {
    getChat({ variables: { conversationId } });
    setSelected(conversationId);
  };

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.ChatsWrapper>
      <Styled.Panels>
        {/* List of current Chats */}
        <Styled.LeftPanel>
          <Styled.ChatsList>
            {data.chats.map(chat => (
              <Styled.ChatItem
                key={chat._id}
                onClick={() => handleClickChatItem(chat._id)}
                isSelected={chat._id === selected}
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
                    <Styled.ChatMsg>
                      <Styled.MsgContent>
                        {chat.messages[chat.messages.length - 1].content}
                      </Styled.MsgContent>
                    </Styled.ChatMsg>
                    <Styled.ChatDate>
                      {formatDistanceToNow(parseInt(chat.createdAt), {
                        addSuffix: true
                      })}
                    </Styled.ChatDate>
                  </Styled.ChatPreviewRight>
                </Styled.ChatPreview>
              </Styled.ChatItem>
            ))}
          </Styled.ChatsList>
        </Styled.LeftPanel>
        {/* Current Chat in view */}
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
              onCreateNew={handleNewMessage(chatData.chat._id)}
            />
          )}
        </Styled.RightPanel>
      </Styled.Panels>
    </Styled.ChatsWrapper>
  );
};

export default Chats;
