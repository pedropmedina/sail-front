import styled from 'styled-components/macro';

export const Plan = styled.div`
  width: 50rem;
  padding: 1rem;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;

  > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: normal;
  color: var(--color-medium-grey);
`;

export const Description = styled.p`
  color: var(--color-light-grey);
  font-size: 1.2rem;
`;

export const Date = styled(Description)``;

export const Participants = styled.div`
  color: var(--color-light-grey);
  display: flex;
`;

export const ParticipantImg = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.3rem solid var(--color-almost-white);

  &:not(:first-child) {
    margin-left: -2.5rem;
  }
`;

export const Chat = styled.div`
  color: var(--color-light-grey);
`;

export const Location = styled.div`
  width: 100%;
`;
