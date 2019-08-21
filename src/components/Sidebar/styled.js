import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Sidebar = styled.nav`
  grid-column: col-2-start / col-3-start;
  grid-row: row-2-start / row-3-end;
  z-index: 1;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 3rem 3rem 0 0;
  display: grid;
  grid-template-rows: minmax(33vh, min-content) 1fr;
  grid-gap: 10rem;
`;

export const Profile = styled.aside`
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);
  color: var(--color-light-grey);
  background-color: var(--color-sky-blue);
  border-radius: 3rem 3rem 0 0;
`;

export const Figure = styled.figure`
  text-align: center;
  padding-top: 10rem;
`;

export const Pic = styled.img`
  border-radius: 50%;
  padding: 0.7rem;
  border: 0.2rem solid var(--color-almost-white);
`;

export const Name = styled.figcaption`
  margin-top: 2rem;
  font-size: 1.6rem;
  color: var(--color-almost-black);
`;

export const Location = styled.span`
  font-size: 1.2rem;
  color: var(--color-almost-white);
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 5rem;
  color: var(--color-almost-white);

  h4 {
    color: var(--color-almost-black);
    font-weight: normal;
    font-size: 1.4rem;
  }
`;

export const List = styled.ul`
  list-style: none;
  font-size: 1.2rem;
`;

export const Item = styled.li`
  width: 40%;
  margin: 0 auto;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export const Link = styled(NavLink)`
  &:link,
  &:visited {
    font-size: 1.6rem;
    text-decoration: none;
    color: var(--color-light-grey);
    display: block;
    display: flex;
    text-transform: capitalize;
  }
`;
