/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { object, string } from 'yup';
import keyBy from 'lodash/keyBy';
import { ClipLoader } from 'react-spinners';

import Context from '../../context';
import {
  DELETE_DRAFT_PIN,
  SHOW_DRAFT_PIN_POPUP,
  DELETE_DRAFT_PLAN
} from '../../reducer';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { useFileUpload, useTextarea } from '../../hooks';

import * as Styled from './styled';
import { SaveButton } from '../../sharedStyles/buttons';
import {
  Form,
  Fields,
  Field,
  Label,
  Input,
  Textarea
} from '../../sharedStyles/forms';
import { PinWrapper } from '../../stylesShare';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import Upload from '../Upload';

const PinMutation = ({ style }) => {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [createPin, { loading }] = useMutation(CREATE_PIN_MUTATION);
  const {
    file,
    handleFileChange,
    handleFileDelete,
    handleFileUpload,
    handleDrag,
    handleDragIn,
    handleDragOut,
    handleDrop,
    dragging
  } = useFileUpload();
  const { rows, handleTextareaChange } = useTextarea();

  // TODO: create hook to deal with default forms and errors
  const handleFieldChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const keyedSetters = {
      title: setTitle,
      content: setContent
    };
    keyedSetters[name](value);

    if (name === 'content') {
      handleTextareaChange(event);
    }

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
    const image = await handleFileUpload();
    await createPin({
      variables: { input: { title, content, image, longitude, latitude } }
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
        <Form onSubmit={handleSubmit} noValidate>
          <Fields>
            <Field>
              <Input
                name="title"
                id="title"
                placeholder="Give the Pin a name"
                onChange={handleFieldChange}
              />
              <Label htmlFor="title">Title</Label>
            </Field>
          </Fields>
          <Fields>
            <Field>
              <Textarea
                as="textarea"
                rows={rows}
                name="content"
                id="content"
                placeholder="Describe this location"
                onChange={handleFieldChange}
              />
              <Label htmlFor="content">Content</Label>
            </Field>
          </Fields>
          <Fields>
            <Field>
              <Upload
                file={file}
                handleFileChange={handleFileChange}
                handleFileDelete={handleFileDelete}
                handleDrag={handleDrag}
                handleDragIn={handleDragIn}
                handleDragOut={handleDragOut}
                handleDrop={handleDrop}
                dragging={dragging}
              />
            </Field>
          </Fields>
          <Fields>
            <Field>
              <SaveButton disabled={loading}>
                {loading ? (
                  <ClipLoader
                    sizeUnit={'rem'}
                    size={3}
                    color={'#fff'}
                    loading={loading}
                  />
                ) : (
                  'Save'
                )}
              </SaveButton>
            </Field>
          </Fields>
        </Form>
      </Styled.PinMutation>
      <Styled.CancelBtn type="button" onClick={handleCancel}>
        <XIcon className="icon icon-small" />
      </Styled.CancelBtn>
    </PinWrapper>
  );
};

export default PinMutation;
