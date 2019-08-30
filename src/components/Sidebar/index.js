/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';

// SVG icons
import MapIcon from '../../assets/SVG/map.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';
import UsersPin from '../../assets/SVG/users.svg';
import MessageIcon from '../../assets/SVG/message-square.svg';
import BellIcon from '../../assets/SVG/bell.svg';
import SettingsIcon from '../../assets/SVG/settings.svg';

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
    </Styled.Profile>
  );
};

const Sidebar = () => {
  return (
    <Styled.Sidebar>
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
    </Styled.Sidebar>
  );
};

export default Sidebar;
