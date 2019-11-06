import styled from 'styled-components/macro';

export const Button = styled.button`
  height: 100%;
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  border: none;
  border-radius: var(--size-smallest);
  background-color: var(--color-light-grey);
  color: var(--color-almost-white);
  box-shadow: 0 0.5rem 1.5rem 0.3rem rgba(0, 0, 0, 0.2);
  font-size: var(--font-size-small);
  outline: unset;
  cursor: pointer;
  position: relative;
`;

export const SaveButton = styled(Button)`
  background-color: var(--color-earth-red);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled(Button)`
  background-color: var(--color-light-grey);
`;

export const RoundButton = styled.button`
  border: none;
  width: ${({ width }) => (width ? `${width}rem` : 'var(--size-medium)')};
  height: ${({ height }) => (height ? `${height}rem` : 'var(--size-medium)')};
  background-color: ${({ bg }) => (bg ? `${bg}` : 'var(--color-light-grey)')};
  color: ${({ fg }) => (fg ? `${fg}` : 'var(--color-almost-white)')};
  border-radius: 50%;
  margin: 0.2rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: var(--font-size-medium);
    fill: currentColor;
  }
`;
