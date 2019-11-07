import styled, { css } from 'styled-components/macro';

export const FriendsPicker = styled.article`
  width: 100%;
  border-radius: var(--size-smallest);
  background-color: #fff;
  color: var(--color-light-grey);
`;


export const Friend = styled.li`
  text-transform: capitalize;
  font-size: var(--font-size-small);
  color: var(--color-light-grey);
  padding: 1rem 2rem;

  img {
    margin-right: 1.5rem;
  }

  ${({ disabled }) =>
    !disabled
      ? css`
          &:hover {
            background-color: var(--color-almost-white);
            color: var(--color-light-grey);
            cursor: pointer;
          }
        `
      : css`
          background-color: var(--color-light-white);
          opacity: 0.5;
          pointer-events: none;
        `}
`;

export const RemoveFriendBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background-color: transparent;
  outline: none;

  :hover svg {
    fill: #fff;
    cursor: pointer;
  }

  svg {
    font-size: var(--font-size-large);
    fill: var(--color-almost-white);
  }
`;
