import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Sidebar = styled.nav`
  flex-basis: 30rem;
  background-color: var(--color-almost-white);
  display: grid;
  grid-template-rows: minmax(33vh, min-content) 1fr;
  grid-gap: 5rem;
`;

export const Profile = styled.aside`
  align-self: end;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);
  color: var(--color-light-grey);
`;

export const Figure = styled.figure`
  text-align: center;
  padding-top: 10rem;
`;

export const Pic = styled.img`
  border-radius: 50%;
  padding: 0.7rem;
  border: 0.2rem solid var(--color-earth-red);
`;

export const Name = styled.figcaption`
  font-size: 1.6rem;
  color: var(--color-almost-black);
`;

export const Location = styled.span`
  font-size: 1.2rem;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 5rem;

  h4 {
    color: var(--color-almost-black);
    font-weight: normal;
    font-size: 1.2rem;
  }
`;

export const List = styled.ul`
  list-style: none;
  font-size: 1.2rem;
`;

export const Item = styled.li`
  width: 50%;
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