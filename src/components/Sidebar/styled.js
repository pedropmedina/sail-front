import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Sidebar = styled.nav`
  grid-column: col-1-start / col-1-start;
  grid-row: row-1-start / row-3-end;
  z-index: 1;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: repeat(20, 5vh);
  grid-template-columns: repeat(6, 16.6%);
  overflow: auto;
`;

export const Profile = styled.aside`
  grid-column: 2 / 6;
  grid-row: 3 / 6;
  color: var(--color-light-grey);
  background-color: var(--color-medium-grey);
  padding: 2rem 1rem;
  border-radius: 2rem;
`;

export const Figure = styled.figure`
  text-align: center;
`;

export const Pic = styled.img`
  border-radius: 50%;
`;

export const Name = styled.figcaption`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: var(--color-almost-white);
`;

export const Location = styled.span`
  font-size: 1.2rem;
  color: var(--color-almost-white);
`;

export const List = styled.ul`
  list-style: none;
  font-size: 1.2rem;
  grid-column: 3 / 5;
  grid-row: 7 / 15;
`;

export const Item = styled.li`
  display: flex;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const Link = styled(NavLink)`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:link,
  &:visited {
    font-size: 1.6rem;
    text-decoration: none;
    color: var(--color-light-grey);
  }

  &:hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
  }

  > * {
    display: block;
    margin: 50% auto 0 auto;
    transform: translateY(-50%);
  }
`;
