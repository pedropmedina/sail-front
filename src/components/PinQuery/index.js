/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Styled from './styled';
import XIcon from '../../assets/SVG/x.svg';

import Context from '../../context';
import { DELETE_CURRENT_PIN } from '../../reducer';

const PinQuery = ({ style }) => {
  const {
    state: { currentPin },
    dispatch
  } = useContext(Context);
  const { title, content, image } = currentPin;

  return (
    <Styled.PinQuery style={style}>
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
