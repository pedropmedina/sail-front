import styled from 'styled-components/macro';
import { DefaultLink } from '../../sharedStyles/links';

export const Friend = styled.li`
  font-size: 1.6rem;
  color: var(--color-light-grey);
  padding: 1rem;
  margin: 1.5rem;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: var(--color-almost-white);
  border-radius: var(--size-smallest);
  transition: all 0.2s;

  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 1rem;

  :hover {
    box-shadow: 0 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.2);
  }
`;

export const Row = styled.div``;

export const DetailsRow = styled(Row)`
  grid-column: 1 / span 1;
  text-align: center;
`;

export const StatsRow = styled(Row)`
  grid-column: 2 / span 1;
  display: flex;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const Stat = styled.div`
  text-align: center;
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

export const Link = styled(DefaultLink)`
  :link,
  :visited,
  :active {
    flex-basis: 70%;
    align-self: flex-end;
  }
`;

export const Name = styled.h4`
  font-weight: 500;
  text-transform: capitalize;
  color: var(--color-medium-grey);
`;
