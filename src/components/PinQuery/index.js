/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { formatDistance } from 'date-fns';

import * as Styled from './styled';
import { PinWrapper } from '../../stylesShare';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as SendIcon } from '../../assets/SVG/send.svg';

import Context from '../../context';
import { reverseGeocode } from '../../utils';
import { DELETE_CURRENT_PIN, UPDATE_CURRENT_PIN } from '../../reducer';
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';
import { COMMENT_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions';

const TEXTAREA_DEFAULTS = {
  rows: 2,
  minRows: 2,
  maxRows: 10,
  lineHeight: 24
};

const PinQuery = ({ style }) => {
  const commentListEndEl = useRef(null);
  const {
    state: { currentPin },
    dispatch
  } = useContext(Context);
  const { _id: pinId, title, content, image, comments } = currentPin;
  const [text, setText] = useState('');
  const [address, setAddress] = useState('');
  const [rows, setRows] = useState(TEXTAREA_DEFAULTS.rows);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    ignoreResults: true
  });
  const { data } = useSubscription(COMMENT_CREATED_SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_CURRENT_PIN, payload: data.pin });
    }
    comments.length > 0 && scrollToBottom(commentListEndEl);
  }, [data, dispatch]);

  useEffect(() => {
    if (currentPin) {
      const { longitude, latitude } = currentPin;
      handleReverseGeocode(longitude, latitude);
    }
  }, [currentPin]);

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
    await createComment({
      variables: { input: { text, pinId } }
    });
    setText('');
    comments.length > 0 && scrollToBottom(commentListEndEl);
  };

  const handleReverseGeocode = async (longitude, latitude) => {
    setAddress(await reverseGeocode(longitude, latitude));
  };

  const scrollToBottom = ref => {
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <PinWrapper style={style}>
      <Styled.PinQuery>
        {/* Pin's detail */}
        <Styled.BgImage>
          <Styled.Image src={image} alt="current pin" />
          <Styled.Title>{title}</Styled.Title>
          <Styled.Address>{address}</Styled.Address>
          <Styled.Content>{content}</Styled.Content>
        </Styled.BgImage>
        {/* Comments sesison */}
        <Styled.Comments>
          {comments.length === 0 ? (
            <Styled.NoExisingComments>
              Be the first to leave a comment.
            </Styled.NoExisingComments>
          ) : (
            <Styled.CommentsList>
              {comments.map((comment, index, arr) => {
                return (
                  <Styled.Comment
                    key={comment._id}
                    ref={arr.length - 1 === index ? commentListEndEl : null}
                  >
                    <Styled.Profile>
                      <Styled.ProfileImg
                        src="https://via.placeholder.com/50"
                        alt="profile image"
                      />
                    </Styled.Profile>
                    <Styled.CommentDetails>
                      <Styled.CommentAuthor>
                        {comment.author.name || comment.author.username}
                      </Styled.CommentAuthor>
                      <Styled.CommentDate>
                        {formatDistance(
                          Date.now(),
                          parseInt(comment.createdAt),
                          {
                            includeSeconds: true
                          }
                        )}
                      </Styled.CommentDate>
                      <Styled.CommentText>{comment.text}</Styled.CommentText>
                    </Styled.CommentDetails>
                  </Styled.Comment>
                );
              })}
            </Styled.CommentsList>
          )}
          <Styled.FormWrapper>
            <Styled.CommentForm onSubmit={handleSubmit}>
              <Styled.CommentTextarea
                rows={rows}
                name="comment"
                type="text"
                placeholder="message"
                value={text}
                onChange={handleOnChange}
              />
              <Styled.SendComment existingText={text.length > 0}>
                <SendIcon className="icon icon-smallest" />
              </Styled.SendComment>
            </Styled.CommentForm>
          </Styled.FormWrapper>
        </Styled.Comments>
      </Styled.PinQuery>
      <Styled.CancelBtn onClick={() => dispatch({ type: DELETE_CURRENT_PIN })}>
        <XIcon className="icon icon-smallest" />
      </Styled.CancelBtn>
    </PinWrapper>
  );
};

export default PinQuery;
