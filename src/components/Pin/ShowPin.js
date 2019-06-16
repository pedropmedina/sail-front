/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer } from 'antd';

const ShowPin = ({ showDrawer, onCloseDrawer }) => {
  return (
    <Drawer
      title="Show Pin Info"
      width={500}
      placement="right"
      visible={showDrawer}
      onClose={onCloseDrawer}
    />
  );
};

export default ShowPin;
