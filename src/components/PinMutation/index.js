/* eslint-disable no-console, react/prop-types */
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { object, string } from 'yup';
import keyBy from 'lodash/keyBy';

import history from '../../history';
import Context from '../../context';
import {
  DELETE_DRAFT_PIN,
  SHOW_DRAFT_PIN_POPUP,
  UPDATE_DRAFT_PLAN
} from '../../reducer';
import { GET_PINS_QUERY } from '../../graphql/queries';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';

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
  const [image, setImage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [imageError, setImageError] = useState('');
  const [createPin] = useMutation(CREATE_PIN_MUTATION, { ignoreResults: true });

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
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return fileTypes.some(type => type === file.type);
  };

  const handleFieldChange = e => {
    const name = e.target.name;
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    const keyedSetters = {
      title: setTitle,
      content: setContent,
      image: setImage
    };
    keyedSetters[name](value);

    // clear errors upon changing field's value
    const keyedErrors = {
      title: { message: titleError, setter: setTitleError },
      content: { message: contentError, setter: setContentError },
      image: { message: imageError, setter: setImageError }
    };
    if (keyedErrors[name]['message']) keyedErrors[name]['setter']('');
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

    // validated fields and return early if found errors
    const validatedFields = await validateForm();
    if (!validatedFields) return;

    const { longitude, latitude } = state.draftPin;
    const { url } = await handleFileUpload();
    const { data } = await createPin({
      variables: { input: { title, content, image: url, longitude, latitude } },
      update: (cache, { data: { pin } }) => {
        const { pins } = cache.readQuery({ query: GET_PINS_QUERY });
        cache.writeQuery({
          query: GET_PINS_QUERY,
          data: { pins: pins.concat([pin]) }
        });
      }
    });
    setTitle('');
    setContent('');
    setImage('');
    dispatch({ type: DELETE_DRAFT_PIN });
    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });

    // if creation of pin was initiated when creating new plan,
    // update draftPlan and continue with the creating of plan
    if (state.draftPlan) {
      dispatch({
        type: UPDATE_DRAFT_PLAN,
        payload: { location: data.pin._id }
      });
      history.push('/create-plan');
    }
  };

  const validateForm = async () => {
    try {
      const schema = object().shape({
        title: string().required(),
        content: string().required(),
        image: string().required()
      });

      return await schema.validate(
        { title, content, image },
        { abortEarly: false }
      );
    } catch (error) {
      const keyedErrors = keyBy(error.inner, 'path');
      const keyedSetters = {
        title: setTitleError,
        content: setContentError,
        image: setImageError
      };
      for (let prop in keyedErrors) {
        if (keyedErrors.hasOwnProperty(prop)) {
          const { message } = keyedErrors[prop];
          keyedSetters[prop](message);
        }
      }
    }
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
          {!image ? (
            <Styled.Upload
              error={imageError}
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
                  onChange={handleFieldChange}
                />
              </Styled.FieldLabel>
            </Styled.Upload>
          ) : (
            <Styled.UploadPreview
              error={imageError}
              dragging={dragging}
              onDragOver={handleDrag}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDrop={handleDrop}
            >
              <CloseBtn type="button" onClick={() => setImage('')}>
                <XIcon className="icon icon-smallest" />
              </CloseBtn>
              <Styled.PreviewImg src={window.URL.createObjectURL(image)} />
            </Styled.UploadPreview>
          )}
          <Styled.SaveBtn type="submit">Save</Styled.SaveBtn>
        </Styled.Form>
      </Styled.PinMutation>
      <Styled.CancelBtn
        type="button"
        onClick={() => dispatch({ type: DELETE_DRAFT_PIN })}
      >
        <XIcon className="icon icon-small" />
      </Styled.CancelBtn>
    </PinWrapper>
  );
};

export default PinMutation;
