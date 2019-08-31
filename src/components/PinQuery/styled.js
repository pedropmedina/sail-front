import styled from 'styled-components/macro';

import { CloseBtn } from '../../stylesShare';

export const PinQuery = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  & > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
      border-bottom: 0.1rem solid var(--color-almost-white);
    }
  }
`;

export const BgImage = styled.figure`
  padding: 0;
`;

export const Image = styled.img`
  height: 30rem;
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
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.5);
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
  padding: 2rem;
`;

export const NoExisingComments = styled.p`
  height: 40vh;
  color: var(--color-light-grey);
  font-size: 3rem;
  padding: 2rem 0;
`;

export const CommentsList = styled.ul`
  height: 40vh;
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

export const CommentForm = styled.form`
  position: relative;
  line-height: 1;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  text-indent: 1rem;
  font-size: 1.6rem;
  border: none;
  resize: none;
  padding: 1.5rem 0 0 0;
  line-height: 2.4rem;

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const SendComment = styled.button`
  position: absolute;
  right: 2.5rem;
  bottom: 3.4rem;
  transform: translateY(1.2rem);
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ existingText }) =>
    existingText ? 'var(--color-sky-blue)' : 'var(--color-light-grey)'};
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  line-height: 1;
  transition: all 0.2s;

  &:hover {
    color: ${({ existingText }) =>
      existingText ? 'var(--color-almost-white)' : 'var(--color-light-grey)'};
    background-color: ${({ existingText }) =>
      existingText ? 'var(--color-sky-blue)' : 'var(--color-almost-white)'};
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
