/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks';

import Context from '../../context';
import history from '../../history';
import { getAccessToken, deleteAccessToken } from '../../accessToken';

import { LOGOUT_USER_MUTATION } from '../../graphql/mutations';
import {
  GET_CONVERSATIONS_QUERY,
  ME_QUERY,
  GET_REQUESTS_QUERY
} from '../../graphql/queries';
import {
  MESSAGE_CREATED_SUBSCRIPTION,
  CONVERSATION_CREATED_SUBSCRIPTION,
  REQUEST_CREATED_SUBSCRIPTION,
  REQUEST_DELETED_SUBSCRIPTION,
  REQUEST_UPDATED_SUBSCRIPTION
} from '../../graphql/subscriptions';

import * as Styled from './styled';

// SVG icons
import { ReactComponent as MapIcon } from '../../assets/SVG/map.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';
import { ReactComponent as UsersPin } from '../../assets/SVG/users.svg';
import { ReactComponent as MessageIcon } from '../../assets/SVG/message-square.svg';
import { ReactComponent as BellIcon } from '../../assets/SVG/bell.svg';
import { ReactComponent as SettingsIcon } from '../../assets/SVG/settings.svg';
import { ReactComponent as MoreIcon } from '../../assets/SVG/more-horizontal.svg';
import { ReactComponent as LoginIcon } from '../../assets/SVG/log-in.svg';
import { ReactComponent as LogoutIcon } from '../../assets/SVG/log-out.svg';
import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';

const ITEMS = [
  { text: 'map', icon: MapIcon },
  { text: 'plans', icon: CalendarIcon },
  { text: 'pins', icon: PinIcon },
  { text: 'friends', icon: UsersPin },
  { text: 'chats', icon: MessageIcon },
  { text: 'requests', icon: BellIcon },
  { text: 'settings', icon: SettingsIcon }
];

const Profile = props => {
  const { data } = props;
  const { username, firstName, image } = data;
  return (
    <Styled.Profile>
      <Styled.Figure>
        <Styled.Pic
          src={image ? image : 'https://via.placeholder.com/70'}
          alt="profile pic"
        />
        <Styled.Name>{firstName ? firstName : username}</Styled.Name>
        <Styled.Location>Miami, FL</Styled.Location>
      </Styled.Figure>
      <Styled.ProfileMoreBtn>
        <MoreIcon className="icon icon-small" />
      </Styled.ProfileMoreBtn>
    </Styled.Profile>
  );
};

const Sidebar = () => {
  const isLoggedIn = getAccessToken();
  const { state } = useContext(Context);
  const [logoutUser] = useMutation(LOGOUT_USER_MUTATION);
  const {
    error,
    loading,
    data,
    subscribeToMore: subscribeToMoreConversations
  } = useQuery(GET_CONVERSATIONS_QUERY);
  const {
    error: reqError,
    loading: reqLoading,
    data: reqData,
    subscribeToMore: subscribeToMoreRequests
  } = useQuery(GET_REQUESTS_QUERY);
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    ME_QUERY
  );
  const client = useApolloClient();

  useEffect(() => {
    subscribeToNewMessages();
    subscribeToNewConversations();
    subscribeToNewRequests();
    subscribeToUpdatedRequests();
    subscribeToDeletedRequests();
  }, []);

  const subscribeToNewMessages = () => {
    subscribeToMoreConversations({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { conversation } } = subscriptionData // prettier-ignore
        const chats = prev.chats.map(chat =>
          chat._id === conversation._id ? conversation : chat
        );
        return Object.assign({}, prev, { chats });
      }
    });
  };

  const subscribeToNewConversations = () => {
    subscribeToMoreConversations({
      document: CONVERSATION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { conversation }} = subscriptionData // prettier-ignore
        return Object.assign({}, prev, {
          chats: [...prev.chats, conversation]
        });
      }
    });
  };

  const subscribeToNewRequests = () => {
    subscribeToMoreRequests({
      document: REQUEST_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { request }} = subscriptionData // prettier-ignore
        return Object.assign({}, prev, {
          requests: [...prev.requests, request]
        });
      }
    });
  };

  const subscribeToUpdatedRequests = () => {
    subscribeToMoreRequests({
      document: REQUEST_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return prev;
      }
    });
  };

  const subscribeToDeletedRequests = () => {
    subscribeToMoreRequests({
      document: REQUEST_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: { request }} = subscriptionData // prettier-ignore
        return Object.assign({}, prev, {
          requests: prev.requests.filter(req => req._id !== request._id)
        });
      }
    });
  };

  const handleLogout = async () => {
    await logoutUser();
    await client.clearStore();
    deleteAccessToken();
    history.push('/');
  };

  const hasUnreadMsg = chats =>
    chats.reduce((count, chat) => count + chat.unreadCount.count, 0);

  // show badge if pending received requests, or approved/denied sent requests
  const hasModifiedReqs = (requests, me) => {
    const { username } = me;
    const statuses = ['ACCEPTED', 'DENIED'];
    return requests.reduce((count, request) => {
      const isAuthor = request.author.username === username;
      if (isAuthor && statuses.includes(request.status)) {
        count++;
      } else if (!isAuthor && request.status === 'PENDING') {
        count++;
      }
      return count;
    }, 0);
  };

  if ((!error || !meError || !reqError) && (loading || meLoading || reqLoading))
    return <div>Loading...</div>;

  return (
    <Styled.Sidebar
      showingCurrentPin={state.currentPin}
      showingDraftPin={state.draftPin && !state.showDraftPinPopup}
    >
      <Profile data={meData.user} />
      <Styled.List>
        {ITEMS.map(({ text, icon: Icon }, i) => (
          <Styled.Item
            key={i}
            isDirtyMsg={text === 'chats' && hasUnreadMsg(data.chats)}
            isDirtyReq={
              text === 'requests' &&
              hasModifiedReqs(reqData.requests, meData.user)
            }
          >
            <Styled.Link to={`/${text}`} activeClassName="selected-navLink">
              <Icon fill="currentColor" className="icon icon-small" />
            </Styled.Link>
          </Styled.Item>
        ))}
      </Styled.List>
      <Styled.AuthWrapper>
        <Styled.AuthBtn>
          {isLoggedIn ? (
            <LogoutIcon className="icon icon-small" onClick={handleLogout} />
          ) : (
            <LoginIcon className="icon icon-small" />
          )}
        </Styled.AuthBtn>
      </Styled.AuthWrapper>
    </Styled.Sidebar>
  );
};

export default Sidebar;
