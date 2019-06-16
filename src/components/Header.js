/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Row, Col, Layout, Menu, Avatar, Dropdown, Icon } from 'antd';

import Context from '../context';

const { Header: AntdHeader } = Layout;

const Header = props => {
  const { isAuthenticated, profile } = props.auth;
  const { state, dispatch } = useContext(Context);

  const login = () => {
    props.auth.login();
  };

  const logout = () => {
    dispatch({ type: 'IS_LOGGED_IN', payload: { isLoggedIn: false } });
    props.auth.logout();
  };

  const menu =
    isAuthenticated() && state.isLoggedIn ? (
      <Menu>
        <Menu.Item>{profile.name}</Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon type="logout" style={{ marginRight: '15px' }} />
          <span>logout</span>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item onClick={login}>
          <Icon type="login" style={{ marginRight: '15px' }} />
          <span>login</span>
        </Menu.Item>
      </Menu>
    );

  return (
    <AntdHeader className="header">
      <Row type="flex" justify="space-between" align="middle">
        <Col span={4}>
          <div className="logo" />
        </Col>
        <Col span={4} offset={16}>
          <Dropdown overlay={menu} placement="bottomCenter">
            {isAuthenticated() && state.isLoggedIn ? (
              <Avatar size="large" src={profile.picture} shape="square" />
            ) : (
              <Avatar size="large" icon="user" shape="square" />
            )}
          </Dropdown>
        </Col>
      </Row>
    </AntdHeader>
  );
};

export default Header;

/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */
