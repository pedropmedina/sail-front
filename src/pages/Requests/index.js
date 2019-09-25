import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as Styled from './styled';

import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as UpIcon } from '../../assets/SVG/chevron-up.svg';
import { ReactComponent as DownIcon } from '../../assets/SVG/chevron-down.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import { GET_REQUESTS_QUERY } from '../../graphql/queries';

const FILTER_SECTIONS = [
  { filter: 'request type', list: ['friend', 'invite'] },
  { filter: 'status', list: ['pending', 'accepted', 'denied'] },
  { filter: 'relevance', list: ['oldests', 'newests'] },
  { filter: 'search' }
];

const Requests = () => {
  const [filters, setFilters] = useState({
    'request type': '',
    status: '',
    relevance: ''
  });
  const [searchText, setSearchText] = useState('');
  const { error, loading, data } = useQuery(GET_REQUESTS_QUERY);

  console.log({ data });

  const handleFilter = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchText = event => {
    setSearchText(event.target.value);
  };

  if (!error && loading) return <div>Loading...</div>;
  return (
    <Styled.RequestsWrapper>
      {/* filter bar */}
      <Styled.Filterbar>
        {FILTER_SECTIONS.map((section, i) => {
          return section.filter !== 'search' ? (
            <Styled.FilterContainer key={`${section.filter}-${i}`}>
              <Styled.FilterBtn>
                {filters[section.filter]
                  ? filters[section.filter]
                  : `-- ${section.filter} --`}
                <XIcon className="icon icon-smallest" /> |
                <DownIcon className="icon icon-small" />
              </Styled.FilterBtn>
              <Styled.FilterList>
                {section.list.map((option, i) => {
                  return (
                    <Styled.FilterItem
                      key={`${option}-${i}`}
                      onClick={() => handleFilter(section.filter, option)}
                    >
                      {option}
                    </Styled.FilterItem>
                  );
                })}
              </Styled.FilterList>
            </Styled.FilterContainer>
          ) : (
            <Styled.FilterContainer key={`${section.filter}-${i}`}>
              <Styled.FilterSearch>
                <FilterIcon className="icon icon-small" />
                <Styled.SearchInput
                  type="text"
                  value={searchText}
                  placeholder="Filter by name, plan..."
                  onChange={handleSearchText}
                />
              </Styled.FilterSearch>
            </Styled.FilterContainer>
          );
        })}
      </Styled.Filterbar>
      {/* request types */}
    </Styled.RequestsWrapper>
  );
};

export default Requests;
