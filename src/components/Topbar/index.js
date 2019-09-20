/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';

const Topbar = ({
  children,
  searchValue = '',
  searchPlaceholder = '',
  onSearch = () => {},
  onSubmit = () => {}
}) => {
  return (
    <Styled.Topbar>
      <Styled.LeftSide>{children}</Styled.LeftSide>
      <Styled.RightSide>
        <Styled.Search onSubmit={onSubmit}>
          <Styled.Input
            type="text"
            name="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearch}
          />
          <Styled.SearchBtn>
            <FilterIcon className="icon icon-small" />
          </Styled.SearchBtn>
        </Styled.Search>
      </Styled.RightSide>
    </Styled.Topbar>
  );
};

export default Topbar;
