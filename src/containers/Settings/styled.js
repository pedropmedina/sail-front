import styled from 'styled-components/macro';
import { NavLink as Link } from 'react-router-dom';

export const InnerWrapper = styled.div`
  margin: 0 auto;
  max-width: 120rem;
`;

export const Upload = styled.div`
  margin-bottom: 5rem;
  padding-left: 2rem;
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
