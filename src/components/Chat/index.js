/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Avatar from 'react-user-avatar';

import * as Styled from './styled';

import { ReactComponent as SendIcon } from '../../assets/SVG/send.svg';

import { useTextarea, useColors } from '../../hooks';

const Chat = ({ data, onCreateNew, subscribeToNew }) => {
  const refEl = useRef(null);
  const [text, setText] = useState('');
  const { rows, handleTextareaChange } = useTextarea();
  const { colors } = useColors();

  useEffect(() => {
    if (subscribeToNew && subscribeToNew instanceof Function) {
      subscribeToNew();
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      scrollToBottom(refEl);
    }
  }, [data]);

  const scrollToBottom = ref => {
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const handleOnChange = event => {
    handleTextareaChange(event);
    setText(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    onCreateNew(text);
    setText('');
  };

  return (
    <Styled.ChatWrapper>
      <Styled.Chat>
        {/* Top panel dealing with list of messages */}
        <Styled.TopPanel>
          <Styled.Messages>
            {data.map((message, index, arr) => (
              <Styled.Message
                key={message._id}
                ref={arr.length - 1 === index ? refEl : null}
              >
                <Styled.MessageLeftSide>
                  <Avatar
                    size='40'
                    name={message.author.fullName}
                    src={message.author.image}
                    colors={colors}
                  />
                  <Styled.MessageName>
                    {message.author.fullName}
                  </Styled.MessageName>
                </Styled.MessageLeftSide>
                <Styled.MessageRightSide>
                  <Styled.MessageContent>
                    {message.content}
                  </Styled.MessageContent>
                  <Styled.MessageTime>
                    {formatDistanceToNow(parseInt(message.createdAt), {
                      addSuffix: true
                    })}
                  </Styled.MessageTime>
                </Styled.MessageRightSide>
              </Styled.Message>
            ))}
          </Styled.Messages>
        </Styled.TopPanel>
        {/* Bottom panel handles the form */}
        <Styled.BottomPanel>
          <Styled.MessageFormWrapper>
            <Styled.MessageForm onSubmit={handleSubmit}>
              <Styled.MessageTextarea
                rows={rows}
                type='text'
                placeholder='message'
                value={text}
                onChange={handleOnChange}
              />
              <Styled.MessageBtn>
                <SendIcon className='icon icon-smallest' />
              </Styled.MessageBtn>
            </Styled.MessageForm>
          </Styled.MessageFormWrapper>
        </Styled.BottomPanel>
      </Styled.Chat>
    </Styled.ChatWrapper>
  );
};

export default Chat;
