/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Avatar from 'react-user-avatar';
import { ClipLoader } from 'react-spinners';

import * as Styled from './styled';
import {
  Fields,
  Field,
  Form,
  Input,
  Label,
  Textarea
} from '../../sharedStyles/forms';
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
  <Field>
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
  </Field>
);

const renderFormButtons = ({ isLoadingUpdate, handleCancel }) => {
  return (
    <>
      <Field style={{ flex: '0 1 25%' }}>
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
      </Field>
      <Field style={{ flex: '0 1 25%' }}>
        <CancelButton type="button" onClick={handleCancel}>
          Cancel
        </CancelButton>
      </Field>
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
        <Fields>
          <FormField
            type="text"
            name="username"
            label="Username"
            inputs={inputs}
            handleChange={handleChange}
          />
        </Fields>
        {/* Password */}
        <Fields>
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
        </Fields>
        {/* Action buttons */}
        <Fields>{renderFormButtons({ isLoadingUpdate, handleCancel })}</Fields>
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
        <Fields>
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
        </Fields>
        {/* Contact information */}
        <Fields>
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
        </Fields>
        {/* About section */}
        <Fields>
          <FormField
            type="textarea"
            name="about"
            label="About"
            inputs={inputs}
            handleChange={handleChange(handleTextareaChange)}
            rows={rows}
          />
        </Fields>
        {/* Location */}
        <Fields>
          {inputs.address.name && !editAddress ? (
            <Field style={{ backgroundColor: '#fff', padding: '1rem' }}>
              <MapPreview
                longitude={inputs.address.longitude}
                latitude={inputs.address.latitude}
                name={inputs.address.name}
              />
              <RoundButton
                style={{ position: 'absolute', top: '2rem', right: '2rem' }}
                type="button"
                onClick={() => onEditAddress(true)}
              >
                <EditIcon />
              </RoundButton>
            </Field>
          ) : (
            <Field>
              <GeocodingSearch
                viewport={viewport}
                onClickGeocodingResult={handleClickGeocodingResult}
              />
            </Field>
          )}
        </Fields>
        {/* Action buttons */}
        <Fields>{renderFormButtons({ isLoadingUpdate, handleCancel })}</Fields>
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
