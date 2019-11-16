/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import Avatar from 'react-user-avatar';

import { SEARCH_QUERY } from '../../graphql/queries';

import * as Styled from './styled';

import ClickOutside from '../ClickOutside';

import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';
import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';

import { searchOnTimeout } from '../../utils';
import history from '../../history';
import { useColors } from '../../hooks';

const onClickOutsideCss = `
  height: 100%;
`;

const Topbar = ({ children }) => {
  const [showResults, setShowResults] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [conductSearch, { data }] = useLazyQuery(SEARCH_QUERY);
  const { colors } = useColors();

  useEffect(() => {
    let timeout;
    let isSubscribed = true;
    if (isSubscribed && searchText) {
      timeout = searchOnTimeout(() => {
        conductSearch({ variables: { searchText } });
      }, 400);
    }

    return () => {
      clearTimeout(timeout);
      isSubscribed = false;
    };
  }, [searchText]);

  useEffect(() => {
    if (searchText && data && data.search && data.search.length > 0) {
      setResults(data.search);
      setShowResults(true);
    } else {
      setResults([]);
    }
  }, [data, searchText]);

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const handleClick = result => {
    switch (result.__typename) {
      case 'User':
        history.push(`/profile/${result.username}`);
        break;
      case 'Plan':
        break;
      case 'Pin':
        break;
      default:
        break;
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
          <Styled.Search onSubmit={event => event.preventDefault()}>
            <Styled.Input
              type='text'
              name='search'
              placeholder='Search plans, pins, and friends (e.g., weekend at the park, Whole Foods, Joe)'
              value={searchText}
              onChange={handleChange}
            />
            <Styled.SearchBtn>
              <FilterIcon className='icon icon-small' />
            </Styled.SearchBtn>
          </Styled.Search>
          {results && results.length > 0 && showResults && (
            <Styled.SearchResults>
              <Styled.Results>
                {results.map(result => {
                  switch (result.__typename) {
                    case 'Plan':
                      return (
                        <Styled.Result
                          key={result._id}
                          onClick={() => handleClick(result)}
                        >
                          <CalendarIcon className='icon icon-small' />
                          {result.title}
                        </Styled.Result>
                      );
                    case 'Pin':
                      return (
                        <Styled.Result
                          key={result._id}
                          onClick={() => handleClick(result)}
                        >
                          <PinIcon className='icon icon-small' />
                          {result.title}
                        </Styled.Result>
                      );
                    case 'User':
                      return (
                        <Styled.Result
                          key={result.username}
                          onClick={() => handleClick(result)}
                        >
                          <Avatar
                            size='40'
                            style={{ marginRight: '1rem' }}
                            name={
                              result.firstName
                                ? result.firstName
                                : result.username
                            }
                            src={result.image}
                            colors={colors}
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
