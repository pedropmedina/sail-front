import styled from 'styled-components/macro';

import { CloseBtn } from '../../stylesShare';

export const PinQuery = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  display: grid;
  grid-template-rows: minmax(min-content, 47rem) 1fr;
  grid-gap: 2rem;
`;

export const BgImage = styled.figure`
  grid-row: 1 / 2;
  border-bottom: 0.1rem solid var(--color-light-grey);
`;

export const Image = styled.img`
  height: 60%;
  width: 100%;
  object-position: center;
  object-fit: cover;
  transition: all 0.2s;

  &:hover {
    filter: opacity(90%) brightness(93%);
  }
`;

export const Title = styled.figcaption`
  color: var(--color-almost-black);
  font-size: 1.6rem;
  padding: 2rem;
`;

export const Content = styled.p`
  color: var(--color-almost-black);
  font-size: 1.2rem;
  padding: 2rem;
`;

export const CancelBtn = styled(CloseBtn)`
  right: -5rem;
  top: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  opacity: 1;

  &:hover {
    background-color: var(--color-almost-white);
    color: var(--color-light-grey);
  }
`;

export const Comments = styled.div`
  grid-row: 2 / -1;
  /* padding: 2rem; */
  position: relative;

  display: grid;
  grid-template-rows: minmax(30rem, calc(100vh - 47rem - 29rem)) 1fr;
`;

// When no existing comments display text else display list of comments
export const NoExisingComments = styled.p`
  padding: 2rem;
  color: var(--color-light-grey);
  font-size: 3rem;
`;

export const CommentsList = styled.ul`
  grid-row: 1 / 2;
  padding: 0 2rem;
  color: var(--color-dark-grey);
  list-style: none;
  overflow-y: auto;
`;

export const Comment = styled.li`
  display: flex;
  margin-bottom: 3rem;
`;

export const CommentDetails = styled.div`
  flex-basis: calc(100% - 5rem);
  margin-left: 1rem;
  font-size: 1.4rem;

  display: grid;
  grid-template-columns: max-content 1fr;

  > * {
    margin-left: 1rem;
  }
`;

export const CommentAuthor = styled.p`
  color: var(--color-almost-black);
`;

export const CommentDate = styled.span`
  color: var(--color-light-grey);
`;

export const CommentText = styled.p`
  grid-column: 1 / -1;
`;

export const FormWrapper = styled.div`
  grid-row: 2 / -1;
  padding: 1rem;
  background-color: var(--color-medium-grey);
`;

export const CommentForm = styled.form`
  position: relative;
  width: 95%;
  display: block;
  margin: 0 auto;
  line-height: 1;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  background-color: var(--color-medium-grey);
  border: none;
  border-bottom: 0.1rem solid var(--color-light-grey);
  outline: none;
  text-indent: 1rem;
  font-size: 1.6rem;
  resize: none;
  padding: 1.5rem 0 0 0;
  line-height: 2.4rem;
  color: var(--color-almost-white);

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const SendComment = styled.button`
  position: absolute;
  right: 2.5rem;
  bottom: 3rem;
  transform: translateY(1.2rem);
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ existingText }) =>
    existingText ? 'var(--color-almost-white)' : 'var(--color-light-grey)'};
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  line-height: 1;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Profile = styled.figure`
  flex-basis: 5rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;
