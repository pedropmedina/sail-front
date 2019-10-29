/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMutation, useQuery} from '@apollo/react-hooks';
import { compareAsc, compareDesc } from 'date-fns';

import Request from '../../components/Request';

import * as Styled from './styled';

import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as DownIcon } from '../../assets/SVG/chevron-down.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import { GET_REQUESTS_QUERY, ME_QUERY } from '../../graphql/queries';
import {
  UPDATE_REQUEST_MUTATION,
  DELETE_REQUEST_MUTATION
} from '../../graphql/mutations';

const FILTER_SECTIONS = [
  { filter: 'reqType', list: ['friend', 'invite'] },
  { filter: 'status', list: ['pending', 'accepted', 'denied'] },
  { filter: 'relevance', list: ['oldests', 'newests'] },
  { filter: 'search' }
];

const Requests = () => {
  const [filters, setFilters] = useState({
    reqType: '',
    status: '',
    relevance: ''
  });
  const [searchText, setSearchText] = useState('');

  const { error: reqError, loading: reqLoading, data: reqData } = useQuery(
    GET_REQUESTS_QUERY
  );
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    ME_QUERY
  );
  const [updateRequest] = useMutation(UPDATE_REQUEST_MUTATION, {
    ignoreResults: true
  });
  const [deleteRequest] = useMutation(DELETE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  // helpers callback functions for filtering of requests
  const sortReqsByDate = (relevance = 'newests') => (req1, req2) =>
    !relevance || relevance === 'newests'
      ? compareDesc(parseInt(req1.updatedAt), parseInt(req2.updatedAt))
      : compareAsc(parseInt(req1.updatedAt), parseInt(req2.updatedAt));

  const filterByStatus = status => req =>
    status ? req.status.toLowerCase() === status : true;

  const filterBySearch = searchText => req => {
    const text = searchText && searchText.toLowerCase();

    switch (req.reqType) {
      case 'INVITE':
        return text
          ? req.plan.title.toLowerCase().includes(text) ||
              req.plan.description.toLowerCase().includes(text)
          : true;
      case 'FRIEND':
        return text
          ? req.to.username.toLowerCase().includes(text) ||
              req.author.username.toLowerCase().includes(text)
          : true;
    }
  };

  const filterByType = reqType => req =>
    reqType ? req.reqType.toLowerCase() === reqType : true;

  const filterByNoPending = me => req => {
    return req.to.username === me.username ? req.status === 'PENDING' : true;
  };

  const filterReqs = (reqs, { reqType, status, searchText, relevance }) =>
    reqs
      .filter(filterByNoPending(meData.user))
      .filter(filterByType(reqType))
      .filter(filterByStatus(status))
      .filter(filterBySearch(searchText))
      .sort(sortReqsByDate(relevance));

  const prepReqsByType = (reqs, type) =>
    reqs.filter(req => req.reqType === type);

  const prepReqsBySent = (reqs, author) =>
    reqs.filter(req => req.author.email === author.email);

  const prepReqsByReceived = (reqs, author) =>
    reqs.filter(req => req.author.email !== author.email);

  const handleFilter = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchText = event => {
    setSearchText(event.target.value);
  };

  const handleClearFilter = filter => {
    setFilters(prevFilters => ({ ...prevFilters, [filter]: '' }));
  };

  // work-around for focusing button in browsers that don't
  // support button:focus state such as Firefox
  const handleClickToFocus = event => {
    event.target.focus();
  };

  const handleUpdateRequest = input => {
    updateRequest({
      variables: { input }
    });
  };

  const handleDeleteRequest = reqId => {
    deleteRequest({
      variables: { reqId }
    });
  };

  if (((!meError || !reqError) && (meLoading || reqLoading)) || !reqData) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.RequestsWrapper>
      {/* filter bar */}
      <Styled.Filterbar>
        {FILTER_SECTIONS.map((section, i) => {
          return section.filter !== 'search' ? (
            <Styled.FilterContainer key={`${section.filter}-${i}`}>
              <Styled.FilterBtn onClick={handleClickToFocus}>
                {filters[section.filter]
                  ? filters[section.filter]
                  : `-- ${
                      section.filter === 'reqType'
                        ? 'request type'
                        : section.filter
                    } --`}
                <XIcon
                  className="icon icon-smallest"
                  onClick={() => handleClearFilter(section.filter)}
                />{' '}
                |
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
      <Styled.RequestTypes>
        {/* Invite Request */}
        <Styled.RequestType>
          <Styled.RequestTypeHeading>Invite requests</Styled.RequestTypeHeading>
          <Styled.LeftSide>
            <Styled.SideHeading>Sent Invites</Styled.SideHeading>
            <Styled.Requests>
              {filterReqs(
                prepReqsByType(
                  prepReqsBySent(reqData.requests, meData.user),
                  'INVITE'
                ),
                {
                  ...filters,
                  searchText
                }
              ).map(request => (
                <Request
                  key={request._id}
                  request={request}
                  currentUser={meData.user}
                  onUpdateRequest={handleUpdateRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
              ))}
            </Styled.Requests>
          </Styled.LeftSide>
          <Styled.RightSide>
            <Styled.SideHeading>Received Invites</Styled.SideHeading>
            <Styled.Requests>
              {filterReqs(
                prepReqsByType(
                  prepReqsByReceived(reqData.requests, meData.user),
                  'INVITE'
                ),
                {
                  ...filters,
                  searchText
                }
              ).map(request => (
                <Request
                  key={request._id}
                  request={request}
                  currentUser={meData.user}
                  onUpdateRequest={handleUpdateRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
              ))}
            </Styled.Requests>
          </Styled.RightSide>
        </Styled.RequestType>
        {/* Friend Request */}
        <Styled.RequestType>
          <Styled.RequestTypeHeading>Friend requests</Styled.RequestTypeHeading>
          <Styled.LeftSide>
            <Styled.SideHeading>Sent Friend Request</Styled.SideHeading>
            <Styled.Requests>
              {filterReqs(
                prepReqsByType(
                  prepReqsBySent(reqData.requests, meData.user),
                  'FRIEND'
                ),
                {
                  ...filters,
                  searchText
                }
              ).map(request => (
                <Request
                  key={request._id}
                  request={request}
                  currentUser={meData.user}
                  onUpdateRequest={handleUpdateRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
              ))}
            </Styled.Requests>
          </Styled.LeftSide>
          <Styled.RightSide>
            <Styled.SideHeading>Received Friend Request</Styled.SideHeading>
            <Styled.Requests>
              {filterReqs(
                prepReqsByType(
                  prepReqsByReceived(reqData.requests, meData.user),
                  'FRIEND'
                ),
                {
                  ...filters,
                  searchText
                }
              ).map(request => (
                <Request
                  key={request._id}
                  request={request}
                  currentUser={meData.user}
                  onUpdateRequest={handleUpdateRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
              ))}
            </Styled.Requests>
          </Styled.RightSide>
        </Styled.RequestType>
      </Styled.RequestTypes>
    </Styled.RequestsWrapper>
  );
};

export default Requests;
