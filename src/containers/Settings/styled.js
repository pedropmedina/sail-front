import styled from 'styled-components/macro';
import { NavLink as Link } from 'react-router-dom';
import { RoundButton } from '../../sharedStyles/buttons';

export const SettingsWrapper = styled.div`
  overflow-y: auto;
`;

export const InnerWrapper = styled.div`
  padding: 5rem;
  margin: 0 auto;
  max-width: 120rem;
`;

export const ProfileImg = styled.img``;

export const AvatarWrapper = styled.div`
  margin-bottom: 5rem;
  padding-left: 2rem;
  display: flex;
`;

export const AvatarBtns = styled.div`
  padding: 0 1rem;
`;

export const AvatarFileLabel = styled(RoundButton)``;

export const AvatarFileInput = styled.input`
  display: none;
`;

export const FormFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`;

export const FormField = styled.div`
  flex: 1 1 auto;
  margin: 1rem;
  min-height: 6rem;
  position: relative;
`;

export const MapField = styled(FormField)`
  padding: 1rem;
  background-color: #fff;
  border-radius: var(--size-smallest);
`;

export const ButtonField = styled(FormField)`
  flex: unset;
`;

export const SettingsNav = styled.div`
  color: var(--color-light-grey);
  margin-bottom: 5rem;
`;

export const Nav = styled.nav`
  border-bottom: 0.1rem solid var(--color-light-grey);
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
  :link,
  :visited,
  :active {
    display: inline-block;
    border: none;
    border-bottom: 0.2rem solid transparent;
    font-size: 1.6rem;
    text-decoration: none;
    color: var(--color-light-grey);
    padding: 2rem 4rem;
    transition: all 0.2s;
  }

  :hover {
    background-color: var(--color-less-white);
  }
`;

export const MapButon = styled(RoundButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;
