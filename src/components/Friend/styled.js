import styled from 'styled-components/macro';
import { Link as L } from 'react-router-dom';

export const Friend = styled.li`
  font-size: 1.6rem;
  color: var(--color-light-grey);
  padding: 1rem;
  margin: 1.5rem;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;

  display: grid;
  grid-template-columns: 8rem minmax(min-content, 25rem);
  grid-template-rows: repeat(3, min-content);
  column-gap: 1rem;
  row-gap: 1.5rem;
`;

export const Row = styled.div`
  grid-column: 1 / -1;
`;

export const StatsRow = styled(Row)`
  grid-row: 1 / span 1;

  display: flex;
`;

export const DetailsRow = styled(Row)`
  grid-row: 2 / span 1;
`;

export const FriendsFriendsRow = styled(Row)`
  grid-row: 3 / span 1;

  display: flex;
`;

export const FriendsFriend = styled.figure`
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: -1.5rem;
  border: 0.2rem solid var(--color-almost-white);
  cursor: pointer;
`;

export const FriendsFriendImg = styled.img``;

export const Img = styled.img`
  margin-right: 2rem;
  border-radius: 0.5rem;
`;

export const FriendStats = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const FriendStat = styled.div`
  flex-basis: 50%;

  > * {
    text-align: center;
  }
`;

export const StatHeading = styled.h6`
  font-weight: 300;
  font-size: 1.2rem;
  color: var(--color-medium-grey);
`;

export const StatData = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-dark-grey);
`;

export const Link = styled(L)`
  :link,
  :visited,
  :active {
    flex-basis: 70%;
    padding: 0.5rem 2rem;
    margin-top: 1rem;
    text-decoration: none;
    font-size: 1.2rem;
    background-color: var(--color-less-white);
    color: var(--color-light-grey);
    text-align: center;
    border-radius: 0.5rem;
    transition: all 0.2s;
  }

  :hover {
    background-color: var(--color-medium-grey);
    color: var(--color-almost-white);
  }
`;

export const Name = styled.h4`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--color-medium-grey);
`;

export const About = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

export const Email = styled(Name)`
  text-transform: lowercase;
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--color-light-grey);

  svg {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
`;

export const Address = styled(About)`
  svg {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
`;
