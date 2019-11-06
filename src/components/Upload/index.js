/* eslint-disable react/prop-types */
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
import React from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';
import { EditButton } from '../../sharedStyles/buttons';

import { ReactComponent as DownloadIcon } from '../../assets/SVG/download.svg';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit-3.svg';

const Upload = ({
  file,
  handleFileChange,
  handleFileDelete,
  handleDrag,
  handleDragIn,
  handleDragOut,
  handleDrop,
  dragging,
  image,
  css = {}
}) => {
  return (
    <Styled.UploadWrapper dragging={dragging} css={css.upload || ''}>
      <Styled.Upload
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
      >
        {file || image ? (
          <>
            <Styled.EditWrapper css={css.edit || ''}>
              <EditButton onClick={handleFileDelete}>
                <EditIcon />
              </EditButton>
            </Styled.EditWrapper>
            <Styled.UploadPreview dragging={dragging} css={css.preview || ''}>
              <Styled.PreviewImg
                src={
                  file ? window.URL.createObjectURL(file) : image ? image : ''
                }
                alt="preview image"
              />
            </Styled.UploadPreview>
          </>
        ) : (
          <Styled.Label css={css.area || ''}>
            <DownloadIcon />
            <Styled.Input
              fileType
              type="file"
              name="image"
              accept=".jpg, .jpeg, png"
              placeholder="Add a photo of the location."
              onChange={handleFileChange}
            />
          </Styled.Label>
        )}
      </Styled.Upload>
    </Styled.UploadWrapper>
  );
};

export default Upload;
