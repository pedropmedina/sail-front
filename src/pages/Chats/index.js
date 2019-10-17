import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { formatDistanceToNow } from 'date-fns';

import * as Styled from './styled';

import Chat from '../../components/Chat';
import { GET_CONVERSATIONS_QUERY } from '../../graphql/queries';

const Chats = () => {
  const { error, loading, data } = useQuery(GET_CONVERSATIONS_QUERY);
  const [selectedChat, setSelectedChat] = useState([]);

  const handleNewMessage = () => {};

  const subscribeToNewMessages = () => {};

  if (!error && loading) return <div>Loading...</div>;

  // console.log(data);

  return (
    <Styled.ChatsWrapper>
      <Styled.Panels>
        {/* List of current Chats */}
        <Styled.LeftPanel>
          <Styled.ChatsList>
            {data.chats.map(({ _id, participants, messages, createdAt }) => (
              <Styled.ChatItem
                key={_id}
                onClick={() => setSelectedChat(messages)}
              >
                <Styled.ChatPreview>
                  <Styled.ChatPreviewLeft>
                    <Styled.ChatParticipantsImgs>
                      {participants.map(participant => (
                        <Styled.ChatParticipantImg
                          key={participant.username}
                          dimension={
                            participants.length > 1
                              ? 5 / participants.length
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
                              participants.length > 1
                                ? 5 / participants.length
                                : 5
                            }
                          />
                        </Styled.ChatParticipantImg>
                      ))}
                    </Styled.ChatParticipantsImgs>
                  </Styled.ChatPreviewLeft>
                  <Styled.ChatPreviewRight>
                    <Styled.ChatParticipantsNames>
                      {participants.map((participant, i, arr) =>
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
                      {messages[messages.length - 1].content}
                    </Styled.ChatMsg>
                    <Styled.ChatDate>
                      {formatDistanceToNow(parseInt(createdAt), {
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
          <Chat
            data={selectedChat}
            onCreateNew={handleNewMessage}
            subscribeToNew={subscribeToNewMessages}
          />
        </Styled.RightPanel>
      </Styled.Panels>
    </Styled.ChatsWrapper>
  );
};

export default Chats;
