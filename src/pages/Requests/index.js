/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Context from '../../context';

import Request from '../../components/Request';

import * as Styled from './styled';

import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
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
  const { state } = useContext(Context);
  const [filters, setFilters] = useState({
    'request type': '',
    status: '',
    relevance: ''
  });
  const [searchText, setSearchText] = useState('');
  const {
    error: friendsError,
    loading: friendsLoading,
    data: friendsData
  } = useQuery(GET_REQUESTS_QUERY, {
    variables: { reqType: 'FRIEND' }
  });
  const {
    error: invitesError,
    loading: invitesLoading,
    data: invitesData
  } = useQuery(GET_REQUESTS_QUERY, {
    variables: { reqType: 'INVITE' }
  });

  // console.log({ friendsData, invitesData });

  const showRequestBySide = (data, currentUser) => {
    return data.reduce((acc, request) => {
      !acc['sent'] && (acc['sent'] = []);
      !acc['received'] && (acc['received'] = []);
      request.author.email === currentUser.email
        ? acc['sent'].push(request)
        : acc['received'].push(request);
      return acc;
    }, {});
  };

  const handleFilter = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchText = event => {
    setSearchText(event.target.value);
  };

  if ((!friendsError || !invitesError) && (friendsLoading || invitesLoading)) {
    return <div>Loading...</div>;
  }

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
      {state && state.currentUser && friendsData && invitesData && (
        <Styled.RequestTypes>
          {/* Invite Request */}
          <Styled.RequestType>
            <Styled.RequestTypeHeading>
              Invite requests
            </Styled.RequestTypeHeading>
            <Styled.LeftSide>
              <Styled.SideHeading>Sent Invites</Styled.SideHeading>
              <Styled.Requests>
                {showRequestBySide(
                  invitesData.requests,
                  state.currentUser
                ).sent.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                  />
                ))}
              </Styled.Requests>
            </Styled.LeftSide>
            <Styled.RightSide>
              <Styled.SideHeading>Received Invites</Styled.SideHeading>
              <Styled.Requests>
                {showRequestBySide(
                  invitesData.requests,
                  state.currentUser
                ).received.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                  />
                ))}
              </Styled.Requests>
            </Styled.RightSide>
          </Styled.RequestType>
          {/* Friend Request */}
          <Styled.RequestType>
            <Styled.RequestTypeHeading>
              Friend requests
            </Styled.RequestTypeHeading>
            <Styled.LeftSide>
              <Styled.SideHeading>Sent Friend Request</Styled.SideHeading>
              <Styled.Requests>
                {showRequestBySide(
                  friendsData.requests,
                  state.currentUser
                ).sent.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                  />
                ))}
              </Styled.Requests>
            </Styled.LeftSide>
            <Styled.RightSide>
              <Styled.SideHeading>Received Friend Request</Styled.SideHeading>
              <Styled.Requests>
                {showRequestBySide(
                  friendsData.requests,
                  state.currentUser
                ).received.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                  />
                ))}
              </Styled.Requests>
            </Styled.RightSide>
          </Styled.RequestType>
        </Styled.RequestTypes>
      )}
    </Styled.RequestsWrapper>
  );
};

export default Requests;
