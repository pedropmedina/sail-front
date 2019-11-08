import { useState } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState('');
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const validateFileType = file => {
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return fileTypes.some(type => type === file.type);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (validateFileType(file)) {
      setFile(file);
    }
  };

  const handleFileDelete = () => {
    setFile('');
  };

  const handleFileUpload = async () => {
    const CLOUD_NAME = 'pedropmedina';
    const UPLOAD_PRESET = 'sailApp';
    const URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);
      data.append('cloud_name', CLOUD_NAME);

      const res = await fetch(URL, { method: 'POST', body: data });
      const { url } = await res.json();
      return url;
    }
    return '';
  };

  const handleDrag = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragIn = event => {
    event.preventDefault();
    event.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (event.dataTransfer && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = event => {
    event.preventDefault();
    event.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter > 1) return;
    setDragging(false);
  };

  const handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      event.dataTransfer.clearData();
      setDragCounter(0);

      if (validateFileType(event.dataTransfer.files[0])) {
        setFile(event.dataTransfer.files[0]);
      }
    }
  };

  return {
    dragging,
    handleDrag,
    handleDragIn,
    handleDragOut,
    handleDrop,
    file,
    handleFileChange,
    handleFileDelete,
    handleFileUpload
  };
};