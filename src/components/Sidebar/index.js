/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import Context from '../../context';
import * as Styled from './styled';

// SVG icons
import MapIcon from '../../assets/SVG/map.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';
import UsersPin from '../../assets/SVG/users.svg';
import MessageIcon from '../../assets/SVG/message-square.svg';
import BellIcon from '../../assets/SVG/bell.svg';
import SettingsIcon from '../../assets/SVG/settings.svg';
<<<<<<< HEAD
import MoreIcon from '../../assets/SVG/more-horizontal.svg';
import LoginIcon from '../../assets/SVG/log-in.svg';
import LogoutIcon from '../../assets/SVG/log-out.svg';
=======
import MenuIcon from '../../assets/SVG/more-horizontal.svg';
import PowerIcon from '../../assets/SVG/power.svg';
>>>>>>> 2bb36f59a5fa3a91c9ce08abc1df907cb12940dc

const ITEMS = [
  { text: 'map', icon: MapIcon },
  { text: 'plans', icon: CompassIcon },
  { text: 'pins', icon: PinIcon },
  { text: 'friends', icon: UsersPin },
  { text: 'chats', icon: MessageIcon },
  { text: 'notifications', icon: BellIcon },
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
<<<<<<< HEAD
      <Styled.ProfileMoreBtn>
        <MoreIcon className="icon icon-small" />
      </Styled.ProfileMoreBtn>
=======
      <Styled.MenuBtn>
        <MenuIcon className="icon icon-small" />
      </Styled.MenuBtn>
>>>>>>> 2bb36f59a5fa3a91c9ce08abc1df907cb12940dc
    </Styled.Profile>
  );
};

const Sidebar = () => {
  const { state } = useContext(Context);
  return (
    <Styled.Sidebar
      showingCurrentPin={state.currentPin}
      showingDraftPin={state.draftPin}
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
<<<<<<< HEAD
          {state.isLoggedIn ? (
            <LogoutIcon className="icon icon-small" />
          ) : (
            <LoginIcon className="icon icon-small" />
          )}
=======
          <PowerIcon className="icon icon-small" />
>>>>>>> 2bb36f59a5fa3a91c9ce08abc1df907cb12940dc
        </Styled.AuthBtn>
      </Styled.AuthWrapper>
    </Styled.Sidebar>
  );
};

export default Sidebar;
