import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Sidebar = styled.nav`
  grid-column: col-1-start / col-1-end;
  grid-row: row-1-start / row-3-end;
  z-index: 2;
  background-color: var(--color-almost-white);
  box-shadow: ${({ showingCurrentPin, showingDraftPin }) =>
    !(showingCurrentPin || showingDraftPin)
      ? '0 1rem 1rem 1rem rgba(0, 0, 0, 0.1)'
      : 'unset'};
  display: grid;
  grid-template-rows: repeat(20, minmax(max-content, 5vh));
  grid-template-columns: repeat(6, 16.6%);
<<<<<<< HEAD
  overflow-y: auto;
=======
>>>>>>> 2bb36f59a5fa3a91c9ce08abc1df907cb12940dc
`;

export const Profile = styled.aside`
  grid-column: 2 / 6;
  grid-row: 3 / 6;
  color: var(--color-almost-white);
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
`;

export const Location = styled.span`
  font-size: 1.2rem;
`;

<<<<<<< HEAD
export const ProfileMoreBtn = styled.button`
=======
export const MenuBtn = styled.button`
>>>>>>> 2bb36f59a5fa3a91c9ce08abc1df907cb12940dc
  border: none;
  background-color: transparent;
  color: var(--color-almost-white);
  width: 50%;
  display: block;
  margin: 1rem auto 0 auto;
  border-radius: 2rem;
  cursor: pointer;

  > svg {
    display: block;
    margin: 0 auto;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
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
  &:link,
  &:visited {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    font-size: 1.6rem;
    text-decoration: none;
    color: var(--color-light-grey);
    position: relative;
    transition: all 0.2s;

    &:hover {
      color: var(--color-almost-white);
      background-color: var(--color-light-grey);
    }
  }

  > svg {
    display: block;
    margin: 50% auto 0 auto;
    transform: translateY(-50%);
  }
`;

export const AuthWrapper = styled.div`
  grid-row: 19 / 20;
  grid-column: 3 / 5;
`;

export const AuthBtn = styled.button`
  border: none;
  padding: 0;
  width: 5rem;
  height: 5rem;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
<<<<<<< HEAD
  background-color: transparent;
=======
>>>>>>> 2bb36f59a5fa3a91c9ce08abc1df907cb12940dc
  color: var(--color-light-grey);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
  }
`;
