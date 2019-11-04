/* eslint-disable no-console, react/prop-types */
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { object, string } from 'yup';
import keyBy from 'lodash/keyBy';

import Context from '../../context';
import {
  DELETE_DRAFT_PIN,
  SHOW_DRAFT_PIN_POPUP,
  DELETE_DRAFT_PLAN
} from '../../reducer';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { useFileUpload } from '../../customHooks';

import * as Styled from './styled';
import { CloseBtn, PinWrapper } from '../../stylesShare';
import { ReactComponent as DownloadIcon } from '../../assets/SVG/download.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

const PinMutation = ({ style }) => {
  const { state, dispatch } = useContext(Context);
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [createPin] = useMutation(CREATE_PIN_MUTATION, { ignoreResults: true });
  const {
    file,
    handleFileChange,
    handleFileDelete,
    handleFileDrop,
    handleFileUpload
  } = useFileUpload();

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

      handleFileDrop(event.dataTransfer.files[0]);
    }
  };

  const handleFieldChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const keyedSetters = {
      title: setTitle,
      content: setContent
    };
    keyedSetters[name](value);

    // clear errors upon changing field's value
    const keyedErrors = {
      title: { message: titleError, setter: setTitleError },
      content: { message: contentError, setter: setContentError }
    };
    if (keyedErrors[name]['message']) keyedErrors[name]['setter']('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // validated fields and return early if found errors
    const validatedFields = await validateForm();
    if (!validatedFields) return;

    const { longitude, latitude } = state.draftPin;
    const { url } = await handleFileUpload();
    await createPin({
      variables: { input: { title, content, image: url, longitude, latitude } }
    });
    dispatch({ type: DELETE_DRAFT_PIN });
    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
  };

  const validateForm = async () => {
    try {
      const schema = object().shape({
        title: string().required(),
        content: string().required()
      });

      return await schema.validate({ title, content }, { abortEarly: false });
    } catch (error) {
      const keyedErrors = keyBy(error.inner, 'path');
      const keyedSetters = {
        title: setTitleError,
        content: setContentError
      };
      for (let prop in keyedErrors) {
        if (keyedErrors.hasOwnProperty(prop)) {
          const { message } = keyedErrors[prop];
          keyedSetters[prop](message);
        }
      }
    }
  };

  const handleCancel = () => {
    dispatch({ type: DELETE_DRAFT_PIN });
    dispatch({ type: DELETE_DRAFT_PLAN });
  };

  return (
    <PinWrapper style={style}>
      <Styled.PinMutation>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.FieldLabel error={titleError}>
            Title
            <Styled.Field
              type="text"
              name="title"
              value={title}
              placeholder="Name the location."
              onChange={handleFieldChange}
              error={titleError}
            />
          </Styled.FieldLabel>
          <Styled.FieldLabel error={contentError}>
            Description
            <Styled.TextField
              as="textarea"
              name="content"
              value={content}
              placeholder="Briefly describe the location."
              onChange={handleFieldChange}
              error={contentError}
            />
          </Styled.FieldLabel>
          {/* Image upload and preview */}
          {!file ? (
            <Styled.Upload
              dragging={dragging}
              onDragOver={handleDrag}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDrop={handleDrop}
            >
              <DownloadIcon className="icon icon-large" />
              <Styled.FieldLabel>
                <strong>Choose an image</strong> or drag it here.
                <Styled.Field
                  fileType
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, png"
                  placeholder="Add a photo of the location."
                  onChange={handleFileChange}
                />
              </Styled.FieldLabel>
            </Styled.Upload>
          ) : (
            <Styled.UploadPreview
              dragging={dragging}
              onDragOver={handleDrag}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDrop={handleDrop}
            >
              <CloseBtn type="button" onClick={handleFileDelete}>
                <XIcon className="icon icon-smallest" />
              </CloseBtn>
              <Styled.PreviewImg src={window.URL.createObjectURL(file)} />
            </Styled.UploadPreview>
          )}
          <Styled.SaveBtn type="submit">Save</Styled.SaveBtn>
        </Styled.Form>
      </Styled.PinMutation>
      <Styled.CancelBtn type="button" onClick={handleCancel}>
        <XIcon className="icon icon-small" />
      </Styled.CancelBtn>
    </PinWrapper>
  );
};

export default PinMutation;
