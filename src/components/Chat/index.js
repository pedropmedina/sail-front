/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

import * as Styled from './styled';

import { ReactComponent as SendIcon } from '../../assets/SVG/send.svg';

const TEXTAREA_DEFAULTS = {
  rows: 2,
  minRows: 2,
  maxRows: 10,
  lineHeight: 24
};

const Chat = ({ data, onCreateNew, subscribeToNew }) => {
  const refEl = useRef(null);
  const [text, setText] = useState('');
  const [rows, setRows] = useState(TEXTAREA_DEFAULTS.rows);

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

  const displayName = ({ name, username }) => (name ? name : username);

  const handleOnChange = e => {
    const { minRows, maxRows, lineHeight } = TEXTAREA_DEFAULTS;
    const prevRows = e.target.rows;
    e.target.rows = minRows; // reset rows
    const currentRows = ~~(e.target.scrollHeight / lineHeight);

    if (currentRows === prevRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
    setText(e.target.value);
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
                <Styled.MessageName>
                  {displayName(message.author)}
                </Styled.MessageName>
                <Styled.MessagePic
                  src={'https://via.placeholder.com/40'}
                  alt="User Img"
                />
                <Styled.MessageContent>{message.content}</Styled.MessageContent>
                <Styled.MessageTime>
                  {formatDistanceToNow(parseInt(message.createdAt), {
                    addSuffix: true
                  })}
                </Styled.MessageTime>
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
                type="text"
                placeholder="message"
                value={text}
                onChange={handleOnChange}
              />
              <Styled.MessageBtn>
                <SendIcon className="icon icon-smallest" />
              </Styled.MessageBtn>
            </Styled.MessageForm>
            {/* <Styled.Participants>
              {data.participants.map(({ username, image }) => (
                <Styled.Participant key={username}>
                  <Styled.UserImg
                    src={image ? image : 'https://via.placeholder.com/40'}
                  />
                </Styled.Participant>
              ))}
            </Styled.Participants> */}
          </Styled.MessageFormWrapper>
        </Styled.BottomPanel>
      </Styled.Chat>
    </Styled.ChatWrapper>
  );
};

export default Chat;
