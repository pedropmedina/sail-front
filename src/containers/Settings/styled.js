import styled from 'styled-components/macro';

export const SettingsWrapper = styled.div``;

export const InnerWrapper = styled.div`
  padding: 8rem 5rem;
  margin: 0 auto;
  max-width: 120rem;
`;

export const ProfileImg = styled.img``;

export const AvatarWrapper = styled.div`
  width: 9rem;
  height: 9rem;
  margin-bottom: 5rem;
  padding-left: 2rem;
  display: flex;
`;

export const AvatarBtns = styled.div`
  padding: 0 1rem;
`;

export const AvatarBtn = styled.button`
  border: none;
  width: 3.5rem;
  height: 3.5rem;
  background-color: var(--color-less-white);
  border-radius: 50%;
  margin: 0.2rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);

  svg {
    font-size: 1.6rem;
    fill: #fff;
  }
`;

export const SettingsForm = styled.form`
  width: 100%;
`;

export const FormFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`;

export const FormField = styled.div`
  flex: 1 1 auto;
  margin: 1rem;
  height: 6rem;
  position: relative;
`;

export const FormLabel = styled.label`
  color: var(--color-light-grey);
  position: absolute;
  bottom: 0;
  left: 2rem;
  opacity: 0;
  transition: all 0.2s;
`;

export const FormInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  text-indent: 2rem;
  outline: unset;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s;

  :valid,
  :focus {
    padding-top: 1rem;
  }

  :valid + label,
  :focus + label {
    top: 1rem;
    opacity: 1;
    z-index: 1;
  }
`;

export const FormTextarea = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  height: 6rem;
  font-size: 1.4rem;
  outline: unset;
  border-radius: 0.5rem;
  text-indent: 1rem;
`;

export const ButtonField = styled(FormField)`
  flex: unset;
  height: initial;
  margin-top: 3rem;
`;

export const FormBtn = styled.button`
  height: 100%;
  border: none;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  font-size: 1.4rem;
  border-radius: 0.7rem;
  outline: unset;
  padding: 1.5rem 5rem;
  cursor: pointer;
  box-shadow: 0 0.5rem 1.5rem 0.3rem rgba(0, 0, 0, 0.2);
`;

export const SaveBtn = styled(FormBtn)`
  background-color: var(--color-medium-grey);
`;

export const CancelBtn = styled(FormBtn)`
  background-color: var(--color-earth-red);
`;
