/* eslint-disable no-console, react/prop-types */
import React, { useState } from 'react';

import * as Styled from './styled';
import DownloadIcon from '../../assets/SVG/download.svg';

const PinMutation = ({ isQuery, isMutation }) => {
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter > 1) return;
    setDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      e.dataTransfer.clearData();
      setDragCounter(0);
      if (!validateFileType(e.dataTransfer.files[0])) return;
      setImage(e.dataTransfer.files[0]);
    }
  };

  const validateFileType = file => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pjpeg'];
    return fileTypes.some(type => type === file.type);
  };

  const handleFieldChange = e => {
    const name = e.target.name;
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    const mappedSetters = {
      title: setTitle,
      content: setContent,
      image: setImage
    };
    mappedSetters[name](value);
  };

  const handleFileUpload = async () => {
    const cloudName = 'pedropmedina';
    const uploadPreset = 'sailApp';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', uploadPreset);
    data.append('cloud_name', cloudName);
    const res = await fetch(url, { method: 'POST', body: data });
    return await res.json();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { url } = await handleFileUpload();
    console.log(url);
  };

  return (
    <Styled.PinMutation isMutation={isMutation} isQuery={isQuery}>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.FieldLabel>
          Title
          <Styled.Field
            type="text"
            name="title"
            value={title}
            placeholder="Name the location."
            onChange={handleFieldChange}
          />
        </Styled.FieldLabel>
        <Styled.FieldLabel>
          Description
          <Styled.TextField
            as="textarea"
            name="content"
            value={content}
            placeholder="Briefly describe the location."
            onChange={handleFieldChange}
          />
        </Styled.FieldLabel>
        <Styled.Upload
          dragging={dragging}
          onDragOver={handleDrag}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDrop={handleDrop}
        >
          <Styled.UploadPreview />
          <DownloadIcon className="download-icon" />
          <Styled.UploadButton>
            <strong>Choose an image</strong> or drag it here.
            <Styled.FileField
              type="file"
              name="image"
              accept=".jpg, .jpeg, png"
              placeholder="Add a photo of the location."
              onChange={handleFieldChange}
            />
          </Styled.UploadButton>
        </Styled.Upload>
        <Styled.SaveButton type="submit">Save</Styled.SaveButton>
        <Styled.CancelButton type="button">Cancel</Styled.CancelButton>
      </Styled.Form>
    </Styled.PinMutation>
  );
};

export default PinMutation;
