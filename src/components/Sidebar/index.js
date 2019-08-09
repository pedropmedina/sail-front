/* eslint-disable react/prop-types */
import React from 'react';

import * as Styled from './styled';

const ITEMS = ['plans', 'pins', 'friends', 'chats'];

const Profile = () => {
  return (
    <aside>
      <figure>
        <img src="" alt="" />
        <figcaption>Full Name</figcaption>
        <span>Location</span>
      </figure>
      <div>
        <span>friends</span>
        <span>pins</span>
        <span>plans</span>
      </div>
    </aside>
  );
};

const Sidebar = () => {
  return (
    <Styled.Nav>
      <Profile />
      <Styled.List>
        {ITEMS.map((item, i) => (
          <Styled.Item key={i}>
            <Styled.Link to={`/${item}`}>{item}</Styled.Link>
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.Nav>
  );
};

export default Sidebar;
