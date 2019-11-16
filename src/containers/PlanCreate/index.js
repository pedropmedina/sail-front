/* eslint-disable no-console, react/prop-types */
import React, { useContext } from 'react';
import { Marker } from 'react-map-gl';
import { ClipLoader } from 'react-spinners';

import * as Styled from './styled';
import { SaveButton, CancelButton } from '../../sharedStyles/buttons';
import {
  Fields,
  Field,
  Form,
  Input,
  Textarea,
  Error
} from '../../sharedStyles/forms';
import { Popup } from '../../sharedStyles/popup';

import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

import Context from '../../context';
import { usePlan } from '../../hooks';

import GeocodingSearch from '../../components/GeocodingSearch';
import DatePicker from '../../components/DatePicker';
import FriendsPicker from '../../components/FriendsPicker';
import MapPreview from '../../components/MapPreview';

const css = `
  font-size: 1.6rem;
  background-color: var(--color-less-white);
`;

const mapPreviewCss = `
  height: 100%;
  width: 100%;
`;

const PlanCreate = () => {
  const { state } = useContext(Context);
  const { draftPlan, viewport, currentPin } = state;
  const {
    inputs,
    descriptionRows,
    loading,
    errors,
    handleCreatePlan,
    handleCancelPlan,
    handleCancelLocation,
    handleChange,
    handleInvites,
    handleSelectDate,
    handleSelectGeocoding
  } = usePlan();

  return (
    <Styled.PlanCreateWrapper>
      <Styled.PlanCreate>
        <Form onSubmit={handleCreatePlan} noValidate>
          <Fields>
            <Field error={errors.title}>
              <Input
                type='text'
                name='title'
                value={inputs.title}
                placeholder='Title the plan'
                onChange={handleChange}
              />
              {errors.title && <Error>{errors.title}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field error={errors.description}>
              <Textarea
                rows={descriptionRows}
                as='textarea'
                name='description'
                value={inputs.description}
                placeholder='Describe your plan to friends'
                onChange={handleChange}
              />
              {errors.description && <Error>{errors.description}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field error={errors.location}>
              {draftPlan && draftPlan.location && currentPin ? (
                <Styled.MapPreviewWrapper>
                  <MapPreview
                    css={mapPreviewCss}
                    {...viewport}
                    showEditButton={currentPin}
                    onEditMap={handleCancelLocation}
                  >
                    <Marker
                      longitude={currentPin.longitude}
                      latitude={currentPin.latitude}
                    >
                      <PinIcon className='icon icon-small pin-icon' />
                    </Marker>
                    <Popup
                      longitude={currentPin.longitude}
                      latitude={currentPin.latitude}
                      offsetLeft={24}
                      offsetTop={12}
                      anchor='left'
                      closeButton={false}
                    >
                      <p style={{ width: '20rem' }}>{draftPlan.placeName}</p>
                    </Popup>
                  </MapPreview>
                </Styled.MapPreviewWrapper>
              ) : (
                <GeocodingSearch
                  viewport={viewport}
                  onClickGeocodingResult={handleSelectGeocoding}
                />
              )}
              {errors.location && <Error>{errors.location}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field error={errors.date}>
              <DatePicker
                css={css}
                defaultDate={draftPlan ? draftPlan.date : new Date()}
                onSelectDate={handleSelectDate}
              />
              {errors.date && <Error>{errors.date}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field error={errors.invites}>
              <FriendsPicker
                css={css}
                defaultInvites={draftPlan ? draftPlan.invites : []}
                onHandleInvites={handleInvites}
              />
              {errors.invites && <Error>{errors.invites}</Error>}
            </Field>
          </Fields>
          <Fields>
            <Field style={{ flex: '0 1 25%' }}>
              <SaveButton disabled={loading} type='submit'>
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
            <Field style={{ flex: '0 1 25%' }}>
              <CancelButton type='button' onClick={handleCancelPlan}>
                Cancel
              </CancelButton>
            </Field>
          </Fields>
        </Form>
      </Styled.PlanCreate>
    </Styled.PlanCreateWrapper>
  );
};

export default PlanCreate;
