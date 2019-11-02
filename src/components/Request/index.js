/* eslint-disable react/prop-types */
import React from 'react';
import { formatDistance } from 'date-fns';

import * as Styled from './styled';

import { ReactComponent as MoreIcon } from '../../assets/SVG/more-vertical.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';
import { ReactComponent as TrashIcon } from '../../assets/SVG/trash.svg';
import { ReactComponent as ThumbsUpIcon } from '../../assets/SVG/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '../../assets/SVG/thumbs-down.svg';
import { ReactComponent as LinkIcon } from '../../assets/SVG/external-link.svg';

const isAuthor = (author, currentUser) => author.email === currentUser.email;

const formatRequestDate = (request, currentUser) => {
  return request.status !== 'PENDING' && isAuthor(request.author, currentUser)
    ? `${
        request.to.firstName ? request.to.firstName : request.to.username
      } ${request.status.toLowerCase()} your request ${formatDistance(
        parseInt(request.updatedAt),
        Date.now(),
        { addSuffix: true }
      )}`
    : formatDistance(parseInt(request.updatedAt), Date.now(), {
        addSuffix: true
      });
};

const displayHeadingName = (request, currentUser) => {
  return isAuthor(request.author, currentUser)
    ? request.to.firstName
      ? request.to.firstName
      : request.to.username
    : request.author.firstName
    ? request.author.firstName
    : request.author.username;
};

const RequestPopup = ({
  request,
  currentUser,
  onUpdateRequest,
  onDeleteRequest
}) => {
  return (
    <Styled.RequestPopup>
      {isAuthor(request.author, currentUser) ? (
        <>
          <Styled.PopupBtn
            action="cancel"
            onClick={() => onDeleteRequest(request._id)}
          >
            {request.status === 'ACCEPTED' || request.status === 'DENIED'
              ? 'Remove'
              : 'Cancel'}
            {request.status === 'ACCEPTED' || request.status === 'DENIED' ? (
              <TrashIcon className="icon icon-small" />
            ) : (
              <XIcon className="icon icon-small" />
            )}
          </Styled.PopupBtn>
          <Styled.PopupBtn>
            Visit
            <LinkIcon className="icon icon-small" />
          </Styled.PopupBtn>
        </>
      ) : (
        <>
          {request.status === 'PENDING' && (
            <>
              <Styled.PopupBtn
                action="accept"
                onClick={() =>
                  onUpdateRequest({ reqId: request._id, status: 'ACCEPTED' })
                }
              >
                Accept
                <ThumbsUpIcon className="icon icon-small" />
              </Styled.PopupBtn>
              <Styled.PopupBtn
                action="deny"
                onClick={() =>
                  onUpdateRequest({ reqId: request._id, status: 'DENIED' })
                }
              >
                Deny
                <ThumbsDownIcon className="icon icon-small" />
              </Styled.PopupBtn>
            </>
          )}
          <Styled.PopupBtn>
            Visit
            <LinkIcon className="icon icon-small" />
          </Styled.PopupBtn>
        </>
      )}
    </Styled.RequestPopup>
  );
};

const InviteRequest = ({
  request,
  currentUser,
  onUpdateRequest,
  onDeleteRequest,
  onFocus
}) => {
  return (
    <Styled.Request status={request.status}>
      <Styled.RequestHeading>
        {isAuthor(request.author, currentUser)
          ? 'Invite sent to '
          : 'Invite from '}
        <b>{displayHeadingName(request, currentUser)}</b>
      </Styled.RequestHeading>
      <Styled.RequestTitle>{request.plan.title}</Styled.RequestTitle>
      <Styled.RequestDesc>{request.plan.description}</Styled.RequestDesc>
      <Styled.RequestDate>
        {formatRequestDate(request, currentUser)}
      </Styled.RequestDate>
      <Styled.RequestStatus>{request.status}</Styled.RequestStatus>
      <Styled.RequestBtn onClick={onFocus}>
        <MoreIcon className="icon icon-small" />
      </Styled.RequestBtn>
      <RequestPopup
        request={request}
        currentUser={currentUser}
        onUpdateRequest={onUpdateRequest}
        onDeleteRequest={onDeleteRequest}
      />
    </Styled.Request>
  );
};

const FriendRequest = ({
  request,
  currentUser,
  onUpdateRequest,
  onDeleteRequest,
  onFocus
}) => {
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
      <Styled.RequestHeading>
        <b>{displayHeadingName(request, currentUser)}</b>
        {isAuthor(request.author, currentUser)
          ? ' received your friend request'
          : ' sent you a friend request'}
      </Styled.RequestHeading>
      <Styled.RequestDate>
        {formatRequestDate(request, currentUser)}
      </Styled.RequestDate>
      <Styled.RequestStatus>{request.status}</Styled.RequestStatus>
      <Styled.RequestBtn onClick={onFocus}>
        <MoreIcon className="icon icon-small" />
      </Styled.RequestBtn>
      <RequestPopup
        request={request}
        currentUser={currentUser}
        onUpdateRequest={onUpdateRequest}
        onDeleteRequest={onDeleteRequest}
      />
    </Styled.Request>
  );
};

const Request = ({
  request,
  currentUser,
  onUpdateRequest,
  onDeleteRequest
}) => {
  const handleFocus = event => {
    event.target.parentElement.focus();
  };

  return request.reqType === 'INVITE' ? (
    <InviteRequest
      request={request}
      currentUser={currentUser}
      onUpdateRequest={onUpdateRequest}
      onDeleteRequest={onDeleteRequest}
      onFocus={handleFocus}
    />
  ) : (
    <FriendRequest
      request={request}
      currentUser={currentUser}
      onUpdateRequest={onUpdateRequest}
      onDeleteRequest={onDeleteRequest}
      onFocus={handleFocus}
    />
  );
};

export default Request;
