/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';
import { PinWrapper } from '../../stylesShare';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import Context from '../../context';
import { reverseGeocode } from '../../utils';
import { DELETE_CURRENT_PIN } from '../../reducer';
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';

import Chat from '../Chat';

const PinQuery = ({ style }) => {
  const { state, dispatch } = useContext(Context);
  const { currentPin } = state;
  const { _id: pinId, title, content, image, comments } = currentPin;
  const [address, setAddress] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    ignoreResults: true
  });

  useEffect(() => {
    if (currentPin) {
      const { longitude, latitude } = currentPin;
      handleReverseGeocode(longitude, latitude);
    }
  }, [currentPin]);

  const handleCreateComment = pinId => async content => {
    await createComment({
      variables: { input: { content, pinId } }
    });
  };

  const handleReverseGeocode = async (longitude, latitude) => {
    setAddress(await reverseGeocode(longitude, latitude));
  };

  return (
    <PinWrapper style={style}>
      <Styled.PinQuery>
        {/* TopPanel deals with pin's details */}
        <Styled.TopPanel>
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
