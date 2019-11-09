import styled, { css } from 'styled-components/macro';
import { Input, Label } from '../../sharedStyles/forms';

export const Select = styled.div`
  width: 100%;
  border-radius: var(--size-smallest);
  background-color: #fff;
  color: var(--color-light-grey);
  position: relative;
  padding-left: 2rem;
  display: flex;
  align-items: center;

  > svg {
    fill: var(--color-light-grey);
    font-size: var(--font-size-large);
    margin-right: 2rem;
  }
`;

export const SelectSearch = styled.div`
  height: 6rem;
  position: relative;
`;

export const SelectSearchLabel = styled(Label)``;

export const SelectSearchInput = styled(Input)`
  padding: 0;
`;

export const SelectOptions = styled.div`
  display: none;
  padding: 2rem 0;
  background-color: #fff;
  box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 2rem));
  z-index: 1;
  max-height: 25rem;
  overflow-y: auto;

  ${({ showOptions }) =>
    showOptions &&
    css`
      display: block;
    `}
`;

export const SelectOptionsList = styled.ul`
  list-style: none;
`;

export const SelectOptionsItem = styled.li`
  font-size: var(--font-size-small);
  color: var(--color-light-grey);
  padding: 1rem 2rem;

  &:hover {
    background-color: var(--color-almost-white);
    color: var(--color-light-grey);
    cursor: pointer;
  }
`;

export const SelectPicksList = styled(SelectOptionsList)`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

export const SelectPicksItem = styled.li`
  border-radius: var(--size-smallest);
  font-size: var(--font-size-small);
  color: var(--color-light-grey);
  position: relative;
  min-height: 5rem;
  color: var(--color-almost-black);

  :not(:last-child) {
    display: flex;
    align-items: center;
    margin: 0.5rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  }

  :last-child {
    flex-grow: 1;
  }
`;

export const SelectPickItemButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  color: var(--color-light-grey);
  font-size: var(--font-size-small);

  svg {
    font-size: var(--font-size-medium);
    fill: currentColor;
  }
`;
