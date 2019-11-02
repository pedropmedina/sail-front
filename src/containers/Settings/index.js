/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Avatar from 'react-avatar';
import { ClipLoader } from 'react-spinners';

import * as Styled from './styled';
import { Form, Input, Label, Textarea } from '../../sharedStyles/forms';
import { SaveButton, CancelButton } from '../../sharedStyles/buttons';
import { ReactComponent as TrashIcon } from '../../assets/SVG/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';
import GeocodingSearch from '../../components/GeocodingSearch';
// import MapPreview from '../../components/MapPreview'

import Context from '../../context';
import { useProfileForm, useTextarea } from '../../customHooks';
import { ME_QUERY } from '../../graphql/queries';
import { UPDATE_USER_MUTATION } from '../../graphql/mutations';

const FormField = ({
  type,
  name,
  label,
  placeholder,
  inputs,
  handleChange,
  rows
}) => (
  <Styled.FormField>
    {type === 'textarea' ? (
      <Textarea
        as="textarea"
        id={name}
        name={name}
        placeholder={placeholder ? placeholder : label}
        value={inputs[name]}
        onChange={handleChange}
        required
        rows={rows}
      />
    ) : (
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ? placeholder : label}
        value={inputs[name]}
        onChange={handleChange}
        required
      />
    )}
    <Label htmlFor={name}>{label}</Label>
  </Styled.FormField>
);

const Privacy = ({ handleSubmit, handleChange, inputs }) => {
  return (
    <>
      <Form onSubmit={handleSubmit()} noValidate>
        {/* Username */}
        <Styled.FormFields>
          <FormField
            type="text"
            name="username"
            label="Username"
            inputs={inputs}
            handleChange={handleChange}
          />
        </Styled.FormFields>
        {/* Password */}
        <Styled.FormFields>
          <FormField
            type="text"
            name="currentPassword"
            label="Current Password"
            inputs={inputs}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="newPassword"
            label="New Password"
            inputs={inputs}
            handleChange={handleChange}
          />
        </Styled.FormFields>
        {/* Action buttons */}
        <Styled.FormFields>
          <Styled.ButtonField>
            <SaveButton>Save</SaveButton>
          </Styled.ButtonField>
          <Styled.ButtonField>
            <CancelButton type="button">Cancel</CancelButton>
          </Styled.ButtonField>
        </Styled.FormFields>
      </Form>
    </>
  );
};

const UserDetails = ({
  inputs,
  viewport,
  rows,
  isLoadingUpdate,
  handleSubmit,
  handleChange,
  handleCancel,
  handleClickGeocodingResult
}) => {
  const css = {
    wrapper: `
      width: 100%;
      border-radius: 0.5rem;
      background-color: #fff;
  `,
    search: `
      color: var(--color-light-grey);
  `,
    input: `
      font-size: var(--font-size-small);
  `,
    results: `
      background-color: #fff;
  `,
    item: `
      &:hover {
        background-color: var(--color-almost-white);
        color: var(--color-light-grey);
      }
  `
  };

  return (
    <>
      {/* Avatar */}
      <Styled.AvatarWrapper>
        <Avatar
          name="Pedro Medina"
          round={5}
          size="90"
          textSizeRatio={3}
          style={{ boxShadow: '0 .5rem 1rem .2rem rgba(0,0,0,.2)' }}
        />
        <Styled.AvatarBtns>
          <Styled.AvatarBtn>
            <EditIcon />
          </Styled.AvatarBtn>
          <Styled.AvatarBtn>
            <TrashIcon />
          </Styled.AvatarBtn>
        </Styled.AvatarBtns>
      </Styled.AvatarWrapper>
      <Form onSubmit={handleSubmit} noValidate>
        {/* Name info */}
        <Styled.FormFields>
          <FormField
            type="text"
            name="firstName"
            label="First Name"
            inputs={inputs}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="lastName"
            label="Last Name"
            inputs={inputs}
            handleChange={handleChange}
          />
        </Styled.FormFields>
        {/* Contact information */}
        <Styled.FormFields>
          <FormField
            type="text"
            name="email"
            label="Email"
            inputs={inputs}
            handleChange={handleChange}
          />
          <FormField
            type="text"
            name="phone"
            label="Phone#"
            inputs={inputs}
            handleChange={handleChange}
          />
        </Styled.FormFields>
        {/* About section */}
        <Styled.FormFields>
          <FormField
            type="textarea"
            name="about"
            label="About"
            inputs={inputs}
            handleChange={handleChange}
            rows={rows}
          />
        </Styled.FormFields>
        {/* Location */}
        <Styled.FormFields>
          <Styled.FormField>
            <GeocodingSearch
              viewport={viewport}
              onClickGeocodingResult={handleClickGeocodingResult}
              css={css}
            />
          </Styled.FormField>
        </Styled.FormFields>
        {/* Action buttons */}
        <Styled.FormFields>
          <Styled.ButtonField>
            <SaveButton disabled={isLoadingUpdate}>
              {isLoadingUpdate ? (
                <ClipLoader
                  sizeUnit={'rem'}
                  size={3}
                  color={'#fff'}
                  loading={isLoadingUpdate}
                />
              ) : (
                'Save'
              )}
            </SaveButton>
          </Styled.ButtonField>
          <Styled.ButtonField>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
          </Styled.ButtonField>
        </Styled.FormFields>
      </Form>
    </>
  );
};

const Settings = () => {
  const { inputs, handleChange, handleSubmit, handleCancel } = useProfileForm();
  const { rows, handleTextareaChange } = useTextarea();
  const { path, url } = useRouteMatch();
  const [updateUser, { loading: loadingUpdate }] = useMutation(
    UPDATE_USER_MUTATION
  );
  const { state } = useContext(Context);
  const { viewport } = state;

  const handleClickGeocodingResult = () => {};

  const handleUpdateUser = async inputs => {
    await updateUser({
      variables: {
        input: {
          ...inputs
        }
      },
      update: (cache, { data: { updateUser } }) => {
        cache.writeQuery({
          query: ME_QUERY,
          data: { user: updateUser }
        });
      }
    });
  };

  return (
    <Styled.SettingsWrapper>
      <Styled.InnerWrapper>
        {/* Nav bar */}
        <Styled.SettingsNav>
          <Styled.Nav>
            <Styled.NavList>
              <Styled.NavItem>
                <Styled.NavLink
                  exact
                  to={`${url}`}
                  activeClassName="activeLink"
                >
                  User Details
                </Styled.NavLink>
              </Styled.NavItem>
              <Styled.NavItem>
                <Styled.NavLink
                  to={`${url}/privacy`}
                  activeClassName="activeLink"
                >
                  Privacy
                </Styled.NavLink>
              </Styled.NavItem>
            </Styled.NavList>
          </Styled.Nav>
        </Styled.SettingsNav>
        <Switch>
          <Route exact path={`${path}`}>
            <UserDetails
              inputs={inputs}
              rows={rows}
              viewport={viewport}
              isLoadingUpdate={loadingUpdate}
              handleChange={handleChange(handleTextareaChange)}
              handleSubmit={handleSubmit(handleUpdateUser)}
              handleCancel={handleCancel}
              handleClickGeocodingResult={handleClickGeocodingResult}
            />
          </Route>
          <Route path={`${path}/privacy`}>
            <Privacy
              inputs={inputs}
              handleChange={handleChange()}
              handleSubmit={handleSubmit}
            />
          </Route>
        </Switch>
      </Styled.InnerWrapper>
    </Styled.SettingsWrapper>
  );
};

export default Settings;
