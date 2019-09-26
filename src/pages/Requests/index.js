/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { formatDistance } from 'date-fns';

import Context from '../../context';

import * as Styled from './styled';

import { ReactComponent as FilterIcon } from '../../assets/SVG/filter.svg';
import { ReactComponent as DownIcon } from '../../assets/SVG/chevron-down.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as MoreIcon } from '../../assets/SVG/more-vertical.svg';
import { ReactComponent as ThumbsUpIcon } from '../../assets/SVG/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '../../assets/SVG/thumbs-down.svg';
import { ReactComponent as LinkIcon } from '../../assets/SVG/external-link.svg';

import { GET_REQUESTS_QUERY } from '../../graphql/queries';

const FILTER_SECTIONS = [
  { filter: 'request type', list: ['friend', 'invite'] },
  { filter: 'status', list: ['pending', 'accepted', 'denied'] },
  { filter: 'relevance', list: ['oldests', 'newests'] },
  { filter: 'search' }
];

const isAuthor = (author, currentUser) => author.email === currentUser.email;

const formatRequestDate = (request, currentUser) => {
  return request.status !== 'PENDING' && isAuthor(request.author, currentUser)
    ? `${
        request.to.name ? request.to.name : request.to.username
      } ${request.status.toLowerCase()} your request ${formatDistance(
        parseInt(request.updatedAt),
        Date.now(),
        { addSuffix: true }
      )}`
    : formatDistance(parseInt(request.updatedAt), Date.now(), {
        addSuffix: true
      });
};

const RequestPopup = () => {
  return (
    <Styled.RequestPopup>
      <Styled.PopupBtn action="accept">
        Accept
        <ThumbsUpIcon className="icon icon-small" />
      </Styled.PopupBtn>
      <Styled.PopupBtn action="deny">
        Deny
        <ThumbsDownIcon className="icon icon-small" />
      </Styled.PopupBtn>
      <Styled.PopupBtn>
        Visit
        <LinkIcon className="icon icon-small" />
      </Styled.PopupBtn>
    </Styled.RequestPopup>
  );
};

const InviteRequest = ({ request, currentUser }) => {
  return (
    <Styled.Request status={request.status}>
      <Styled.RequestAuthor>
        {isAuthor ? 'Invite sent to ' : 'Invite from '}
        <b>
          {isAuthor(request.author, currentUser)
            ? request.to.name
              ? request.to.name
              : request.to.username
            : request.author.name
            ? request.author.name
            : request.author.username}
        </b>
      </Styled.RequestAuthor>
      <Styled.RequestTitle>{request.plan.title}</Styled.RequestTitle>
      <Styled.RequestDesc>{request.plan.description}</Styled.RequestDesc>
      <Styled.RequestDate>
        {formatRequestDate(request, currentUser)}
      </Styled.RequestDate>
      <Styled.RequestStatus>{request.status}</Styled.RequestStatus>
      <Styled.RequestBtn>
        <MoreIcon className="icon icon-small" />
      </Styled.RequestBtn>
      <RequestPopup />
    </Styled.Request>
  );
};

const FriendRequest = ({ request, currentUser }) => {
  return (
    <Styled.Request status={request.status}>
      <Styled.RequestImg
        src={
          isAuthor(request.author, currentUser) && request.to.image
            ? request.to.image
            : request.author.image
            ? request.author.iamge
            : 'https://via.placeholder.com/30'
        }
        alt="Profile image"
      />
      <Styled.RequestAuthor>
        <b>
          {isAuthor
            ? request.to.name
              ? request.to.name
              : request.to.username
            : request.author.name
            ? request.author.name
            : request.author.username}
        </b>
        {isAuthor
          ? ' received your friend request'
          : ' sent you a friend request'}
      </Styled.RequestAuthor>
      <Styled.RequestDate>
        {formatRequestDate(request, currentUser)}
      </Styled.RequestDate>
      <Styled.RequestStatus>{request.status}</Styled.RequestStatus>
      <Styled.RequestBtn>
        <MoreIcon className="icon icon-small" />
      </Styled.RequestBtn>
      <RequestPopup />
    </Styled.Request>
  );
};

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
                  <InviteRequest
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
                  <InviteRequest
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
                  <FriendRequest
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
                  <FriendRequest
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
