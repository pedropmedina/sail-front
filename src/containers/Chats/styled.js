import styled, { css } from 'styled-components/macro';

export const ChatsWrapper = styled.div`
  padding: 2rem 5rem;
  overflow-y: auto;
`;

export const Panels = styled.article`
  height: calc(100% - 15rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Panel = styled.section`
  flex: 1 1 30rem;
  padding: 1rem;
`;

export const LeftPanel = styled(Panel)`
  overflow-y: auto;
`;

export const RightPanel = styled(Panel)`
  height: 100%;
`;

export const ChatsList = styled.ul`
  list-style: none;
  color: var(--color-light-grey);

  display: flex;
  flex-wrap: wrap;
`;

export const ChatItem = styled.li`
  flex-basis: 100%;
  padding: 1.5rem;
  cursor: pointer;
  border-left: 0.3rem solid transparent;
  position: relative;

  :not(:last-child) {
    border-bottom: 0.1rem solid var(--color-less-white);
  }

  :hover {
    background-color: var(--color-less-white);
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-left: 0.3rem solid var(--color-medium-grey);
      background-color: var(--color-less-white);
    `}
`;

export const ChatPreview = styled.div`
  display: grid;
  grid-template-columns: max-content minmax(min-content, 1fr);
  align-items: center;
  gap: 1rem;
`;

export const ChatPreviewLeft = styled.div``;

export const ChatPreviewRight = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  column-gap: 1rem;
`;

export const ChatPlan = styled.p`
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  display: flex;
  align-items: center;

  > svg {
    fill: currentColor;
    font-size: 1.2rem;
    margin-right: 0.3rem;
  }
`;

export const ChatMsg = styled.div`
  grid-column: 1 / span 1;
  overflow: hidden;
`;

export const MsgContent = styled.p`
  font-size: 1.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ChatParticipantsImgs = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

export const ChatParticipantImg = styled.li`
  :not(:last-child) {
    margin-left: -4.5rem;
  }
`;

export const ParticipantImg = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 0.2rem solid var(--color-almost-white);
  display: inline-block;
`;

export const ChatParticipantsNames = styled.ul`
  grid-column: 1 / span 1;
  list-style: none;

  display: flex;
`;

export const ChatParticipantName = styled.li`
  font-size: 1.6rem;
  color: var(--color-medium-grey);
`;

export const ChatDate = styled.p`
  text-align: right;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
`;

export const NoChatSelected = styled.div`
  color: var(--color-light-grey);
  background-color: var(--color-less-white);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Topbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 3rem;
`;

export const TopbarSide = styled.div`
  flex: 1 1 auto;
`;

export const TopbarLeft = styled(TopbarSide)``;

export const TopbarRight = styled(TopbarSide)``;

export const FilterMessages = styled.form`
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
`;

export const FilterMessagesInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  text-indent: 5rem;
  font-size: 1.6rem;
  background-color: var(--color-less-white);
  color: var(--color-light-grey);
  outline: none;

  :focus {
    background-color: #fff;
  }

  ::placeholder {
    color: var(--color-light-grey);
  }
`;

export const FilterBtn = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  outline: none;
  border: none;
  background-color: transparent;
  color: var(--color-light-grey);
  padding: 0 1rem;
`;

export const UnreadCountBadge = styled.div`
  background-color: var(--color-earth-red);
  color: var(--color-almost-white);
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
