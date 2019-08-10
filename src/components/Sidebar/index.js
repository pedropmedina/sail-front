/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';
import svgicons from '../../assets/sprite.svg';

const ITEMS = [
  { text: 'map', icon: '#icon-map' },
  { text: 'plans', icon: '#icon-compass' },
  { text: 'pins', icon: '#icon-map-pin' },
  { text: 'friends', icon: '#icon-users' },
  { text: 'chats', icon: '#icon-message-square' },
  { text: 'notifications', icon: '#icon-bell' },
  { text: 'settings', icon: '#icon-settings' }
];

const Profile = () => {
  return (
    <Styled.Profile>
      <Styled.Figure>
        <Styled.Pic src="https://via.placeholder.com/100" alt="profile pic" />
        <Styled.Name>Luca Medina</Styled.Name>
        <Styled.Location>Miami, FL</Styled.Location>
      </Styled.Figure>
      <Styled.Stats>
        <div>
          <h4>friends</h4>
          <span>500</span>
        </div>
        <div>
          <h4>plans</h4>
          <span>23</span>
        </div>
        <div>
          <h4>pins</h4>
          <span>43</span>
        </div>
      </Styled.Stats>
    </Styled.Profile>
  );
};

const Sidebar = () => {
  return (
    <Styled.Sidebar>
      <Profile />
      <Styled.List>
        {ITEMS.map(({ text, icon }, i) => (
          <Styled.Item key={i}>
            <Styled.Link
              to={text === 'map' ? '/' : `/${text}`}
              activeClassName="selected-navLink"
              exact
            >
              <Styled.NavIcon>
                <use href={svgicons + icon} />
              </Styled.NavIcon>
              <Styled.NavText>{text}</Styled.NavText>
            </Styled.Link>
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.Sidebar>
  );
};

export default Sidebar;
