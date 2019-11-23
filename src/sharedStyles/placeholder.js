import styled from 'styled-components/macro';

export const NoContent = styled.div`
  font-size: 1.6rem;
  color: var(--color-light-grey);
  background-color: var(--color-less-white);
  padding: 2rem;
  border-radius: var(--size-smallest);
`;

export const NoContentFull = styled(NoContent)`
  width: 100%;
  height: 100%;
  font-size: var(--font-size-large);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: var(--size-large);
    width: var(--size-large);
    margin-right: 1rem;
    fill: currentColor;
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
