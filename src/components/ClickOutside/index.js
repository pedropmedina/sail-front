/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';

const ClickOutside = ({
  onClickOutside = () => {},
  onClickInside = () => {},
  css = {},
  children
}) => {
  const refElem = useRef(null);

  const handleClickOutside = event => {
    if (refElem.current && !refElem.current.contains(event.target)) {
      onClickOutside();
    } else {
      onClickInside();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Styled.ClickOutside ref={refElem} css={css}>
      {children}
    </Styled.ClickOutside>
  );
};

export default ClickOutside;
