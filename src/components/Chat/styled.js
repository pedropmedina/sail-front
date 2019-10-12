import styled from 'styled-components/macro';

export const ChatWrapper = styled.div`
  height: 100%;
  background-color: var(--color-less-white);
`;

export const Chat = styled.article`
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
`;

export const TopPanel = styled.section`
  overflow-y: auto;
`;

export const BottomPanel = styled.section`
  align-self: end;
  background-color: var(--color-medium-grey);
`;

export const Messages = styled.ul`
  padding: 2rem;
  overflow: hidden;
`;

export const Message = styled.li`
  display: grid;
  grid-template-columns: max-content minmax(min-content, 1fr);
  grid-template-rows: max-content 3.5rem max-content;
  column-gap: 1.5rem;
  row-gap: 0.2rem;
  font-size: 1.2rem;
  padding: 1rem;
  color: var(--color-light-grey);
`;

export const UserImg = styled.img`
  display: inline-block;
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 50%;
  padding: 0.2rem;
`;

export const UserName = styled.p``;

export const MessageContent = styled.div`
  grid-column: 2 / -1;
  grid-row: 2 / -1;
  justify-self: start;

  padding: 1.5rem;
  background-color: var(--color-almost-white);
  border-radius: 0 1rem 1rem 1rem;
`;

export const MessageTime = styled.p`
  grid-column: 2 / -1;

  text-align: right;
`;

export const MessagePic = styled(UserImg)`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
`;

export const MessageName = styled(UserName)`
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  font-size: 1rem;
  text-align: center;
`;

export const Participants = styled.ul`
  list-style: none;
  padding: 1.5rem;

  display: flex;
  flex-wrap: wrap;
`;

export const Participant = styled.li`
  padding: 0.3rem;
`;

export const MessageFormWrapper = styled.div``;

export const MessageForm = styled.form`
  position: relative;
  width: 100%;
  display: block;
  margin: 0 auto;
  line-height: 1;
`;

export const MessageTextarea = styled.textarea`
  width: 90%;
  display: block;
  margin: 0 auto;
  padding: 1rem;
  border: none;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
  outline: none;
  background-color: inherit;
  color: var(--color-almost-white);
  text-indent: 1rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  resize: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.1);
  }
`;

export const MessageBtn = styled.button`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-light-grey);

  :hover {
    color: var(--color-almost-white);
  }
`;
