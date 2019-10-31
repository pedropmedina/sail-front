/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';
import { PinWrapper } from '../../stylesShare';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as HeartIcon } from '../../assets/SVG/heart.svg';
import { ReactComponent as HeartContourIcon } from '../../assets/SVG/heart-o.svg';

import Context from '../../context';
import { reverseGeocode } from '../../utils';
import { DELETE_CURRENT_PIN } from '../../reducer';
import {
  CREATE_COMMENT_MUTATION,
  LIKE_PIN,
  UNLIKE_PIN
} from '../../graphql/mutations';
import { ME_QUERY } from '../../graphql/queries';

import Chat from '../Chat';

const PinQuery = ({ style, me }) => {
  const { state, dispatch } = useContext(Context);
  const { currentPin } = state;
  const { _id: pinId, title, content, image, comments } = currentPin;
  const [address, setAddress] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    ignoreResults: true
  });
  const [likePin] = useMutation(LIKE_PIN, { ignoreResults: true });
  const [unlikePin] = useMutation(UNLIKE_PIN, { ignoreResults: true });

  useEffect(() => {
    if (currentPin) {
      const { longitude, latitude } = currentPin;
      handleReverseGeocode(longitude, latitude);
    }
  }, [currentPin]);

  useEffect(() => {
    setIsLiked(me.likedPins.some(pin => pin._id === pinId));
  }, [currentPin, me]);

  const handleCreateComment = pinId => async content => {
    await createComment({
      variables: { input: { content, pinId } }
    });
  };

  const handleLikePin = async pinId => {
    await likePin({
      variables: { pinId },
      update: cache => {
        const { user } = cache.readQuery({ query: ME_QUERY });
        cache.writeQuery({
          query: ME_QUERY,
          data: {
            user: { ...user, likedPins: [...user.likedPins, currentPin] }
          }
        });
      }
    });
  };

  const handleUnlikePin = async pinId => {
    await unlikePin({
      variables: { pinId },
      update: cache => {
        const { user } = cache.readQuery({ query: ME_QUERY });
        cache.writeQuery({
          query: ME_QUERY,
          data: {
            user: {
              ...user,
              likedPins: user.likedPins.filter(pin => pin._id !== pinId)
            }
          }
        });
      }
    });
  };

  const handleReverseGeocode = async (longitude, latitude) => {
    setAddress(await reverseGeocode(longitude, latitude));
  };

  return (
    <PinWrapper style={style}>
      <Styled.PinQuery>
        {/* TopPanel deals with pin's details */}
        <Styled.TopPanel isLiked={isLiked}>
          {isLiked ? (
            <HeartIcon onClick={() => handleUnlikePin(pinId)} />
          ) : (
            <HeartContourIcon onClick={() => handleLikePin(pinId)} />
          )}
          <Styled.BgImage>
            <Styled.Image src={image} alt="current pin" />
            <Styled.Title>{title}</Styled.Title>
            <Styled.Address>{address}</Styled.Address>
            <Styled.Content>{content}</Styled.Content>
          </Styled.BgImage>
        </Styled.TopPanel>
        {/* BottomPanel deals with the chat */}
        <Styled.BottomPanel>
          <Chat data={comments} onCreateNew={handleCreateComment(pinId)} />
        </Styled.BottomPanel>
      </Styled.PinQuery>
      <Styled.CancelBtn onClick={() => dispatch({ type: DELETE_CURRENT_PIN })}>
        <XIcon className="icon icon-smallest" />
      </Styled.CancelBtn>
    </PinWrapper>
  );
};

export default PinQuery;
