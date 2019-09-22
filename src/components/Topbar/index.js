/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import ClickOutside from '../ClickOutside';

import * as Styled from './styled';
import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';

const onClickOutsideCss = `
  height: 100%;
`;

const Topbar = ({
  children,
  value = '',
  placeholder = '',
  results = [],
  onSearch = () => {},
  onSubmit = () => {}
}) => {
  const [showResults, setShowResults] = useState(false);

  const handleChange = event => {
    onSearch(event);

    if (results.length > 0 && !showResults) {
      setShowResults(true);
    }
  };

  return (
    <Styled.Topbar>
      <Styled.LeftSide>{children}</Styled.LeftSide>
      <Styled.RightSide>
        <ClickOutside
          onClickOutside={() => setShowResults(false)}
          onClickInside={() => setShowResults(true)}
          css={onClickOutsideCss}
        >
          <Styled.Search onSubmit={onSubmit}>
            <Styled.Input
              type="text"
              name="search"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
            />
            <Styled.SearchBtn>
              <FilterIcon className="icon icon-small" />
            </Styled.SearchBtn>
          </Styled.Search>
          {results && results.length > 0 && showResults && (
            <Styled.SearchResults>
              <Styled.Results>
                {results.map(result => {
                  switch (result.__typename) {
                    case 'Plan':
                      return (
                        <Styled.Result key={result._id}>
                          {result.title}
                        </Styled.Result>
                      );
                    case 'Pin':
                      return (
                        <Styled.Result key={result._id}>
                          {result.title}
                        </Styled.Result>
                      );
                    case 'User':
                      return (
                        <Styled.Result key={result.username}>
                          <Styled.ProfileImg
                            src={
                              result.image
                                ? result.image
                                : 'https://via.placeholder.com/40'
                            }
                            alt="Profile image"
                          />
                          {result.username}
                        </Styled.Result>
                      );
                  }
                })}
              </Styled.Results>
            </Styled.SearchResults>
          )}
        </ClickOutside>
      </Styled.RightSide>
    </Styled.Topbar>
  );
};

export default Topbar;
