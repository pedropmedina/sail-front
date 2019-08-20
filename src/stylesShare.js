import styled from 'styled-components/macro';

export const Btn = styled.button`
  padding: 2rem;
  font-size: 1.6rem;
  border: none;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  outline: none;
  border: 0.2rem solid transparent;
  cursor: pointer;
  line-height: 1;
`;

export const CloseBtn = styled(Btn)`
  position: absolute;
  top: 0;
  right: -1rem;
  padding: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;

  &:hover {
    background-color: var(--color-earth-red);
    color: var(--color-almost-white);
  }
`;
