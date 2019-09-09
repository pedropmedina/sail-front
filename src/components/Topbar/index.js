/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import * as Styled from './styled';
import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';

const Topbar = props => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = e => {
    const value = e.target.value;
    setSearchText(value);
  };

  const hanldeSubmit = e => {
    e.preventDefault();
  };

  return (
    <Styled.Topbar>
      <Styled.CreateNewBtn onClick={() => props.history.push('/create-plan')}>
        Create New <PlusIcon className="icon icon-small" />
      </Styled.CreateNewBtn>
      <Styled.Search onSubmit={hanldeSubmit}>
        <Styled.Input
          type="text"
          name="search"
          placeholder="Filter results"
          value={searchText}
          onChange={handleSearch}
        />
        <Styled.SearchBtn>
          <FilterIcon className="icon icon-small" />
        </Styled.SearchBtn>
      </Styled.Search>
    </Styled.Topbar>
  );
};

export default Topbar;
