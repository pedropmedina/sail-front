import styled from 'styled-components/macro';
import { RoundButton } from '../../sharedStyles/buttons';

export const Plan = styled.li`
  width: 100%;
  max-width: 50rem;
  min-width: 35rem;
  padding: 1rem;
  margin: 1.5rem;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
  color: var(--color-light-grey);
  transition: all 0.2s;

  :hover {
    box-shadow: 0 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.2);
  }

  > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const Title = styled.h3`
  font-size: 2rem;
  font-weight: normal;
  color: var(--color-medium-grey);
  margin-right: 0.5rem;
`;

export const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-light-grey);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Date = styled(Description)`
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
  }
`;

export const Footer = styled.div`
  display: flex;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const ActionButton = styled(RoundButton)`
  background-color: transparent;
  color: var(--color-light-grey);
  margin: 0.5rem;
  box-shadow: unset;
  height: 4rem;
  width: 4rem;
  transition: all 0.2s;
  border: 0.1rem solid var(--color-light-grey);

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
  }

  svg {
    fill: currentColor;
    width: 2rem;
    height: 2rem;
  }
`;

export const ActionButtonDelete = styled(ActionButton)`
  color: var(--color-earth-red);
  border: 0.1rem solid var(--color-earth-red);

  :hover {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;

export const ActionButtonEdit = styled(ActionButton)`
  color: var(--color-medium-grey);
  border: 0.1rem solid var(--color-medium-grey);

  :hover {
    background-color: var(--color-medium-grey);
    color: var(--color-almost-white);
  }
`;

export const Participants = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  > *:not(:last-child) {
    margin-left: -4rem;
  }
`;

export const ParticipantImg = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.3rem solid var(--color-almost-white);

  &:not(:last-child) {
    margin-left: -4rem;
  }
`;

export const Chat = styled.div`
  color: var(--color-light-grey);
`;

export const Location = styled.div`
  width: 100%;
`;
