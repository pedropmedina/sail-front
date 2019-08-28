import styled from 'styled-components/macro';
import { animated } from 'react-spring';

import { CloseBtn } from '../../stylesShare';

export const PinQuery = styled(animated.div)`
  height: calc(100vh - 1.5rem);
  width: 40rem;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  border-radius: 3rem 3rem 0 0;
  background-color: var(--color-almost-white);

  & > * {
    &:not(:last-child) {
      margin-bottom: 2rem;
      border-bottom: 0.1rem solid var(--color-almost-white);
    }
  }
`;

export const BgImage = styled.figure`
  padding: 0;
  border-radius: 3rem 3rem 0 0;
  overflow: hidden;
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
  height: 5rem;
  position: relative;
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
  right: 2rem;
  top: 75%;
  transform: translateY(-75%);
  border: none;
  background-color: transparent;
  color: var(--color-light-grey);
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
