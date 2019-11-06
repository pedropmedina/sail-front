/* eslint-disable react/prop-types */
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
import React from 'react';
import styled from 'styled-components/macro'; // eslint-disable-line

import * as Styled from './styled';
import { RoundButton } from '../../sharedStyles/buttons';

import { ReactComponent as DownloadIcon } from '../../assets/SVG/download.svg';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';

const overwrite = `
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  z-index: 1;
  background-color: #fff;
  color: var(--color-light-grey);
  box-shadow: 0 .3rem .7rem .2rem rgba(0,0,0,.2);

  :hover {
    background-color: var(--color-earth-red);
    color: #fff;
  }
`;

const Upload = ({
  file,
  handleFileChange,
  handleFileDelete,
  handleDrag,
  handleDragIn,
  handleDragOut,
  handleDrop,
  dragging
}) => {
  return (
    <Styled.UploadWrapper>
      <Styled.Upload
        dragging={dragging}
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
      >
        {file ? (
          <>
            <RoundButton css={overwrite} onClick={handleFileDelete}>
              <EditIcon />
            </RoundButton>
            <Styled.UploadPreview>
              <Styled.PreviewImg
                src={window.URL.createObjectURL(file)}
                alt="preview image"
              />
            </Styled.UploadPreview>
          </>
        ) : (
          <Styled.Label>
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
