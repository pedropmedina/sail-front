/* eslint-disable react/prop-types */
import React from 'react';
import Avatar from 'react-avatar';

import * as Styled from './styled';
import { ReactComponent as TrashIcon } from '../../assets/SVG/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/SVG/edit.svg';

import { useProfileForm } from '../../customHooks';

const FormField = ({
  type,
  name,
  label,
  placeholder,
  inputs,
  handleChange
}) => (
  <Styled.FormField>
    {type === 'textarea' ? (
      <Styled.FormTextarea
        id={name}
        placeholder={placeholder ? placeholder : label}
        value={inputs[name]}
        onChange={handleChange}
        required
      />
    ) : (
      <Styled.FormInput
        type={type}
        id={name}
        placeholder={placeholder ? placeholder : label}
        value={inputs[name]}
        onChange={handleChange}
        required
      />
    )}
    <Styled.FormLabel htmlFor={name}>{label}</Styled.FormLabel>
  </Styled.FormField>
);

const Settings = () => {
  const { inputs, handleChange, handleSubmit } = useProfileForm();

  return (
    <Styled.SettingsWrapper>
      <Styled.InnerWrapper>
        <Styled.AvatarWrapper>
          <Avatar
            name="Pedro Medina"
            round={true}
            size="90"
            textSizeRatio="3"
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
        <Styled.SettingsForm onSubmit={handleSubmit()}>
          {/* Name info */}
          <Styled.FormFields>
            <FormField
              type="text"
              name="name"
              label="First Name"
              inputs={inputs}
              handleChange={handleChange}
            />
            <FormField
              type="text"
              name="last"
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
            />
          </Styled.FormFields>
          {/* Location */}
          <Styled.FormFields>
            <FormField
              type="text"
              name="location"
              label="Location"
              inputs={inputs}
              handleChange={handleChange}
            />
          </Styled.FormFields>
          <Styled.FormFields>
            <Styled.ButtonField>
              <Styled.SaveBtn>Save</Styled.SaveBtn>
            </Styled.ButtonField>
            <Styled.ButtonField>
              <Styled.CancelBtn type="button">Cancel</Styled.CancelBtn>
            </Styled.ButtonField>
          </Styled.FormFields>
        </Styled.SettingsForm>
      </Styled.InnerWrapper>
    </Styled.SettingsWrapper>
  );
};

export default Settings;
