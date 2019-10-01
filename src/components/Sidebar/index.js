/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import * as Cookies from 'js-cookie';

import Context from '../../context';
import history from '../../history';

import { BLACKLIST_TOKENS } from '../../graphql/mutations';

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

const Profile = () => {
  return (
    <Styled.Profile>
      <Styled.Figure>
        <Styled.Pic src="https://via.placeholder.com/70" alt="profile pic" />
        <Styled.Name>Luca Medina</Styled.Name>
        <Styled.Location>Miami, FL</Styled.Location>
      </Styled.Figure>
      <Styled.ProfileMoreBtn>
        <MoreIcon className="icon icon-small" />
      </Styled.ProfileMoreBtn>
    </Styled.Profile>
  );
};

const Sidebar = () => {
  const { state } = useContext(Context);
  const [logout] = useMutation(BLACKLIST_TOKENS, { ignoreResults: true });

  const handleLogout = () => {
    logout();
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    history.push('/');
  };

  return (
    <Styled.Sidebar
      showingCurrentPin={state.currentPin}
      showingDraftPin={state.draftPin && !state.showDraftPinPopup}
    >
      <Profile />
      <Styled.List>
        {ITEMS.map(({ text, icon: Icon }, i) => (
          <Styled.Item key={i}>
            <Styled.Link
              to={text === 'map' ? '/' : `/${text}`}
              activeClassName="selected-navLink"
              exact
            >
              <Icon fill="currentColor" className="icon icon-small" />
            </Styled.Link>
          </Styled.Item>
        ))}
      </Styled.List>
      <Styled.AuthWrapper>
        <Styled.AuthBtn>
          {state.isLoggedIn ? (
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
