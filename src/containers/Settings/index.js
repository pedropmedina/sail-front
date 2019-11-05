/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Avatar from 'react-user-avatar';
import { ClipLoader } from 'react-spinners';

import * as Styled from './styled';
import { Form, Input, Label, Textarea } from '../../sharedStyles/forms';
import {
  SaveButton,
  CancelButton,
  RoundButton
} from '../../sharedStyles/buttons';

import { ReactComponent as TrashIcon } from '../../assets/SVG/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';

import GeocodingSearch from '../../components/GeocodingSearch';
import MapPreview from '../../components/MapPreview';

import history from '../../history';
import { deleteAccessToken } from '../../accessToken';
import Context from '../../context';
import {
  useProfileForm,
  useProfilePrivacy,
  useTextarea,
  useFileUpload,
  useColors
} from '../../customHooks';

import { ME_QUERY } from '../../graphql/queries';
import {
  UPDATE_USER_MUTATION,
  UPDATE_USER_PRIVACY_MUTATION,
  LOGOUT_USER_MUTATION
} from '../../graphql/mutations';

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

const renderFormButtons = ({ isLoadingUpdate, handleCancel }) => {
  return (
    <>
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
    </>
  );
};

const Privacy = ({
  handleSubmit,
  handleChange,
  handleCancel,
  handleUpdatePrivacy,
  isLoadingUpdate,
  inputs
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit(handleUpdatePrivacy)} noValidate>
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
            type="password"
            name="currentPassword"
            label="Current Password"
            inputs={inputs}
            handleChange={handleChange}
          />
          <FormField
            type="password"
            name="newPassword"
            label="New Password"
            inputs={inputs}
            handleChange={handleChange}
          />
        </Styled.FormFields>
        {/* Action buttons */}
        <Styled.FormFields>
          {renderFormButtons({ isLoadingUpdate, handleCancel })}
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
  handleTextareaChange,
  handleCancel,
  handleImageDelete,
  handleClickGeocodingResult,
  handleUpdateUser,
  editAddress,
  onEditAddress,
  file,
  handleFileChange,
  handleFileDelete
}) => {
  const { colors } = useColors();

  const searchCss = {
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

  const mapCss = `
    height: 25rem;
  `;

  return (
    <>
      {/* Avatar */}
      <Styled.AvatarWrapper>
        <Avatar
          className="UserAvatar--settings-round"
          size="90"
          name={inputs.firstName || 'unknown'}
          src={
            file
              ? window.URL.createObjectURL(file)
              : inputs.image
              ? inputs.image
              : ''
          }
          colors={colors}
        />
        <Styled.AvatarBtns>
          <Styled.AvatarFileLabel as="label">
            <Styled.AvatarFileInput type="file" onChange={handleFileChange} />
            <EditIcon />
          </Styled.AvatarFileLabel>
          {!file && !inputs.image ? null : (
            <RoundButton onClick={file ? handleFileDelete : handleImageDelete}>
              <TrashIcon />
            </RoundButton>
          )}
        </Styled.AvatarBtns>
      </Styled.AvatarWrapper>
      <Form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
        {/* Name info */}
        <Styled.FormFields>
          <FormField
            type="text"
            name="firstName"
            label="First Name"
            inputs={inputs}
            handleChange={handleChange()}
          />
          <FormField
            type="text"
            name="lastName"
            label="Last Name"
            inputs={inputs}
            handleChange={handleChange()}
          />
        </Styled.FormFields>
        {/* Contact information */}
        <Styled.FormFields>
          <FormField
            type="text"
            name="email"
            label="Email"
            inputs={inputs}
            handleChange={handleChange()}
          />
          <FormField
            type="text"
            name="phone"
            label="Phone#"
            inputs={inputs}
            handleChange={handleChange()}
          />
        </Styled.FormFields>
        {/* About section */}
        <Styled.FormFields>
          <FormField
            type="textarea"
            name="about"
            label="About"
            inputs={inputs}
            handleChange={handleChange(handleTextareaChange)}
            rows={rows}
          />
        </Styled.FormFields>
        {/* Location */}
        <Styled.FormFields>
          {inputs.address.name && !editAddress ? (
            <Styled.MapField>
              <MapPreview
                longitude={inputs.address.longitude}
                latitude={inputs.address.latitude}
                name={inputs.address.name}
                css={mapCss}
              />
              <Styled.MapButon
                type="button"
                onClick={() => onEditAddress(true)}
              >
                <EditIcon />
              </Styled.MapButon>
            </Styled.MapField>
          ) : (
            <Styled.FormField>
              <GeocodingSearch
                viewport={viewport}
                onClickGeocodingResult={handleClickGeocodingResult}
                css={searchCss}
              />
            </Styled.FormField>
          )}
        </Styled.FormFields>
        {/* Action buttons */}
        <Styled.FormFields>
          {renderFormButtons({ isLoadingUpdate, handleCancel })}
        </Styled.FormFields>
      </Form>
    </>
  );
};

const Settings = () => {
  const {
    inputs,
    handleChange,
    handleSubmit,
    handleCancel,
    handleImageDelete,
    handleAddress,
    loading
  } = useProfileForm();
  const { rows, handleTextareaChange } = useTextarea();
  const {
    file,
    handleFileChange,
    handleFileDelete,
    handleFileDrop,
    handleFileUpload
  } = useFileUpload();
  const privacyHook = useProfilePrivacy();
  const { path, url } = useRouteMatch();
  const [updateUser, { loading: loadingDetailsUpdate }] = useMutation(
    UPDATE_USER_MUTATION
  );
  const [updateUserPrivacy, { loading: loadingPrivacyUpdate }] = useMutation(
    UPDATE_USER_PRIVACY_MUTATION
  );
  const [logoutUser] = useMutation(LOGOUT_USER_MUTATION);
  const { state } = useContext(Context);
  const { viewport } = state;
  const [editAddress, setEditAddress] = useState(false);
  const client = useApolloClient();

  const spinnerCss = `
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

  const handleClickGeocodingResult = result => {
    handleAddress(result);
    handleEditAddress(false);
  };

  const handleUpdateUser = async inputs => {
    try {
      const { address } = inputs;
      const { __typename, ...rest } = address; // eslint-disable-line

      const image = await handleFileUpload();
      handleFileDelete();

      const input = image
        ? { ...inputs, image, address: rest }
        : { ...inputs, address: rest };

      await updateUser({
        variables: { input },
        update: (cache, { data: { updateUser } }) => {
          cache.writeQuery({
            query: ME_QUERY,
            data: { user: updateUser }
          });
        }
      });
    } catch (error) {
      //
    }
  };

  const handleUpdatePrivacy = async inputs => {
    try {
      const { currentPassword, newPassword } = inputs;

      await updateUserPrivacy({
        variables: { input: inputs },
        update: (cache, { data: { updateUserPrivacy } }) => {
          cache.writeQuery({
            query: ME_QUERY,
            data: { user: updateUserPrivacy }
          });
        }
      });

      // logout user if change of password performed
      if (currentPassword && newPassword) {
        handleLogout();
      }
    } catch (error) {
      //
    }
  };

  const handleEditAddress = bool => {
    setEditAddress(bool);
  };

  const handleLogout = async () => {
    await logoutUser();
    await client.clearStore();
    deleteAccessToken();
    history.push('/');
  };

  if (loading)
    return (
      <ClipLoader
        sizeUnit={'px'}
        size={70}
        color={'#6C8C96'}
        loading={loading}
        css={spinnerCss}
      />
    );

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
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              handleImageDelete={handleImageDelete}
              handleAddress={handleAddress}
              rows={rows}
              handleTextareaChange={handleTextareaChange}
              file={file}
              handleFileChange={handleFileChange}
              handleFileDelete={handleFileDelete}
              handleFileDrop={handleFileDrop}
              handleFileUpload={handleFileUpload}
              viewport={viewport}
              isLoadingUpdate={loadingDetailsUpdate}
              handleUpdateUser={handleUpdateUser}
              handleClickGeocodingResult={handleClickGeocodingResult}
              editAddress={editAddress}
              onEditAddress={handleEditAddress}
            />
          </Route>
          <Route path={`${path}/privacy`}>
            <Privacy
              {...privacyHook}
              isLoadingUpdate={loadingPrivacyUpdate}
              handleUpdatePrivacy={handleUpdatePrivacy}
            />
          </Route>
        </Switch>
      </Styled.InnerWrapper>
    </Styled.SettingsWrapper>
  );
};

export default Settings;
