import styled from 'styled-components/macro';
import { NavLink as Link } from 'react-router-dom';

export const SettingsWrapper = styled.div`
  overflow-y: auto;
`;

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
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  border-radius: 50%;
  margin: 0.2rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: unset;

  svg {
    font-size: 1.6rem;
    fill: currentColor;
  }
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

export const ButtonField = styled(FormField)`
  flex: unset;
  margin-top: 3rem;
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
