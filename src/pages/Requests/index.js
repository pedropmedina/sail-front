/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { compareAsc, compareDesc } from 'date-fns';

import Context from '../../context';

import Request from '../../components/Request';

import * as Styled from './styled';

import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as DownIcon } from '../../assets/SVG/chevron-down.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import { GET_REQUESTS_QUERY } from '../../graphql/queries';
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
  const { state } = useContext(Context);
  const [filters, setFilters] = useState({
    reqType: '',
    status: '',
    relevance: ''
  });
  const [searchText, setSearchText] = useState('');
  const {
    error: friendsError,
    loading: friendsLoading,
    data: friendsData,
    refetch: friendsRefetch
  } = useQuery(GET_REQUESTS_QUERY, {
    variables: { reqType: 'FRIEND' }
  });
  const {
    error: invitesError,
    loading: invitesLoading,
    data: invitesData,
    refetch: invitesRefetch
  } = useQuery(GET_REQUESTS_QUERY, {
    variables: { reqType: 'INVITE' }
  });
  const [updateRequest] = useMutation(UPDATE_REQUEST_MUTATION, {
    ignoreResults: true
  });
  const [deleteRequest] = useMutation(DELETE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  // refetch data guaranteeing synchronicity of the cache with the server
  // during the creation of new requests
  useEffect(() => {
    friendsRefetch();
    invitesRefetch();
  }, []);

  // Prepare request data by sent and received requests
  const prepRequestsBySide = (data, currentUser) => {
    return data.reduce((acc, request) => {
      !acc['sent'] && (acc['sent'] = []);
      !acc['received'] && (acc['received'] = []);
      request.author.email === currentUser.email
        ? acc['sent'].push(request)
        : acc['received'].push(request);
      return acc;
    }, {});
  };

  // helpers callback functions for filtering of data
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

  const filterRequest = (reqs, { status, searchText, relevance }) =>
    reqs
      .filter(filterByStatus(status))
      .filter(filterBySearch(searchText))
      .sort(sortReqsByDate(relevance));

  // prepare data by friends and invites. Filter out based on current filters.
  const filterData = (reqs = [], currentUser = {}, filters = {}) => {
    // default response for requests split in sent/received
    const defaultRes = { sent: [], received: [] };
    // short circuit response with defaultRes if !reqs || reqs !== reqType && reqType !== ''
    if (
      reqs.length <= 0 ||
      (filters.reqType !== '' &&
        filters.reqType !== reqs[0].reqType.toLowerCase())
    ) {
      return defaultRes;
    }
    // prepare data by sent and received requests for both invites and friends
    let reqsBySide = prepRequestsBySide(reqs, currentUser);

    const sent = filterRequest(reqsBySide.sent, filters);
    const received = filterRequest(reqsBySide.received, filters);

    return { sent, received };
  };

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
      variables: { reqId },
      update: (cache, { data: { request } }) => {
        const { reqType } = request;
        const { requests } = cache.readQuery({
          query: GET_REQUESTS_QUERY,
          variables: { reqType }
        });
        cache.writeQuery({
          query: GET_REQUESTS_QUERY,
          variables: { reqType },
          data: { requests: requests.filter(req => req._id !== request._id) }
        });
      }
    });
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
                {filterData(invitesData.requests, state.currentUser, {
                  ...filters,
                  searchText
                }).sent.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                    onUpdateRequest={handleUpdateRequest}
                    onDeleteRequest={handleDeleteRequest}
                  />
                ))}
              </Styled.Requests>
            </Styled.LeftSide>
            <Styled.RightSide>
              <Styled.SideHeading>Received Invites</Styled.SideHeading>
              <Styled.Requests>
                {filterData(invitesData.requests, state.currentUser, {
                  ...filters,
                  searchText
                }).received.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                    onUpdateRequest={handleUpdateRequest}
                    onDeleteRequest={handleDeleteRequest}
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
                {filterData(friendsData.requests, state.currentUser, {
                  ...filters,
                  searchText
                }).sent.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                    onUpdateRequest={handleUpdateRequest}
                    onDeleteRequest={handleDeleteRequest}
                  />
                ))}
              </Styled.Requests>
            </Styled.LeftSide>
            <Styled.RightSide>
              <Styled.SideHeading>Received Friend Request</Styled.SideHeading>
              <Styled.Requests>
                {filterData(friendsData.requests, state.currentUser, {
                  ...filters,
                  searchText
                }).received.map(request => (
                  <Request
                    key={request._id}
                    request={request}
                    currentUser={state.currentUser}
                    onUpdateRequest={handleUpdateRequest}
                    onDeleteRequest={handleDeleteRequest}
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
