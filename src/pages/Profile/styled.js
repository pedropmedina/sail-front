import styled from 'styled-components/macro';

export const ProfileWrapper = styled.div`
  grid-row: 1 / -1;
  overflow-y: auto;
`;

export const Profile = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 1fr) max-content;
`;

export const ProfileDetails = styled.article`
  grid-column: 2 / -1;
  grid-row: 1 / -1;

  padding: 0 4rem;
  color: var(--color-light-grey);
`;

export const ProfileImg = styled.img`
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const Name = styled.h1`
  font-weight: 500;
  font-size: 1.6rem;
  color: var(--color-almost-black);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export const Location = styled.p`
  font-size: 1.2rem;
`;

export const Stats = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Stat = styled.div`
  margin-right: 1.5rem;

  display: flex;
  flex-direction: row-reverse;
`;

export const StatHeading = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
`;

export const StatData = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  margin-right: 0.5rem;
  color: var(--color-almost-black);
`;

export const About = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;

export const Email = styled.p`
  font-size: 1.2rem;
`;

export const Content = styled.article`
  grid-column: 1 / 2;
  grid-row: 1 / -1;
`;

export const Section = styled.section`
  padding: 4rem;
`;

export const ContentPlans = styled(Section)``;

export const ContentFriends = styled(Section)``;

export const ContentHeading = styled.h3`
  color: var(--color-almost-black);
  font-weight: 300;
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

export const NoContent = styled.div`
  font-size: 1.6rem;
  color: var(--color-light-grey);
  background-color: var(--color-less-white);
  padding: 2rem;
`;

export const FriendRequestBtn = styled.button`
  border: none;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  font-size: 1.6rem;
  padding: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: none;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};

  display: flex;
  align-items: center;

  :hover {
    background-color: #fff;
  }

  svg {
    margin-right: 1rem;
  }
`;
