/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Styled from './styled';
import XIcon from '../../assets/SVG/x.svg';

import Context from '../../context';
import { DELETE_CURRENT_PIN } from '../../reducer';

const PinQuery = ({ isQuery, isMutation }) => {
  const { state, dispatch } = useContext(Context);
  const { title, content, image } = state.currentPin;

  return (
    <Styled.PinQuery isQuery={isQuery} isMutation={isMutation}>
      <Styled.BgImage>
        <Styled.Image src={image} alt="current pin" />
        <Styled.Title>{title}</Styled.Title>
        <Styled.Content>{content}</Styled.Content>
      </Styled.BgImage>
      <Styled.CancelBtn onClick={() => dispatch({ type: DELETE_CURRENT_PIN })}>
        <XIcon className="icon icon-small" />
      </Styled.CancelBtn>
    </Styled.PinQuery>
  );
};

export default PinQuery;
