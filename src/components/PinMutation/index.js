/* eslint-disable no-console, react/prop-types */
import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';
import { ClipLoader } from 'react-spinners';

import Context from '../../context';
import {
  DELETE_DRAFT_PIN,
  SHOW_DRAFT_PIN_POPUP,
  DELETE_DRAFT_PLAN
} from '../../reducer';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { useFileUpload, useTextarea, useForm } from '../../hooks';

import * as Styled from './styled';
import { SaveButton, PositionedButton } from '../../sharedStyles/buttons';
import {
  Form,
  Fields,
  Field,
  Input,
  Textarea,
  Error
} from '../../sharedStyles/forms';
import { PinWrapper } from '../../sharedStyles/wrappers';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

import Upload from '../Upload';

const PinMutation = ({ style }) => {
  const { state, dispatch } = useContext(Context);
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
  const {
    inputs,
    errors,
    handleSubmitForm,
    handleChangeInputs,
    handleValidateFields,
    handleSetError
  } = useForm({
    title: '',
    content: '',
    image: ''
  });

  const handleChange = event => {
    const name = event.target.name;

    handleChangeInputs(event);
    if (name === 'content') {
      handleTextareaChange(event);
    }
    // clear errors
    if (errors[name]) {
      handleSetError(name, '');
    }
  };

  const handleCreatePin = async () => {
    const { title, content } = inputs;
    const { longitude, latitude } = state.draftPin;
    const image = await handleFileUpload();

    // validated fields and return early if found errors
    const schema = yup.object().shape({
      title: yup.string().required(),
      content: yup.string().required(),
      image: yup.string().required()
    });

    const validatedFields = await handleValidateFields(schema, {
      title,
      content,
      image
    });
    if (!validatedFields) return;

    await createPin({
      variables: { input: { title, content, image, longitude, latitude } }
    });

    dispatch({ type: DELETE_DRAFT_PIN });
    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
  };

  const handleCancel = () => {
    dispatch({ type: DELETE_DRAFT_PIN });
    dispatch({ type: DELETE_DRAFT_PLAN });
  };

  return (
    <PinWrapper style={style}>
      <Styled.PinMutation>
        <Form onSubmit={handleSubmitForm(handleCreatePin)} noValidate>
          <Fields>
            <Field error={errors.title}>
              <Input
                name='title'
                id='title'
                placeholder='Give the Pin a name'
                onChange={handleChange}
                required
              />
              {errors.title && <Error>{errors.title}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field error={errors.content}>
              <Textarea
                as='textarea'
                rows={rows}
                name='content'
                id='content'
                placeholder='Describe this location'
                onChange={handleChange}
                required
              />
              {errors.content && <Error>{errors.content}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field error={errors.image}>
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
              {errors.image && <Error>{errors.image}</Error>}
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
      <PositionedButton type='button' onClick={handleCancel}>
        <XIcon className='icon icon-small' />
      </PositionedButton>
    </PinWrapper>
  );
};

export default PinMutation;
