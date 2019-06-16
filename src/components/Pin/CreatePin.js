/* eslint-disable no-console, react/prop-types */
import React, { useState } from 'react';
import { Drawer, Form, Select, Input, Upload, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const CreatePin = ({ showDrawer, onCloseDrawer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('none');
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);

  const handleSubmit = evt => {
    evt.preventDefault();
    const data = handleImageUpload();
    console.log({ name, description, category, data });
    // reset state and close drawer
    onCloseDrawer();
    setName('');
    setDescription('');
    setCategory('none');
    setFileList([]);
    setFile(null);
  };

  const handleUpload = file => {
    setFile(file);
    setFileList([file]);
    return false;
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pins');
    data.append('cloud_name', 'pedropmedina');
    return data;
  };

  const handleChange = evt => {
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    fieldName === 'name' ? setName(fieldValue) : setDescription(fieldValue);
  };

  return (
    <Drawer
      title="Create Pin"
      width={350}
      placement="right"
      visible={showDrawer}
      onClose={onCloseDrawer}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            name="name"
            placeholder="Enter Location's Name"
            value={name}
            allowClear
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            name="description"
            placeholder="Enter a description of the location"
            value={description}
            autosize={{ minRows: 10, maxRows: 20 }}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Select defaultValue="none" onChange={cat => setCategory(cat)}>
            <Option value="none">none</Option>
            <Option value="restaurant">restaurant</Option>
            <Option value="hotel">hotels</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Upload
            listType="text"
            fileList={fileList}
            beforeUpload={handleUpload}
          >
            <Button icon="upload">Upload Photo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button block ghost type="primary" htmlType="submit">
            Add Pin
          </Button>
          <Button
            block
            ghost
            type="danger"
            htmlType="button"
            onClick={onCloseDrawer}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreatePin;
