import styled from 'styled-components/macro';

export const UploadWrapper = styled.div`
`;

export const Upload = styled.div`
  background-color: ${({ dragging }) => (dragging ? 'rgba(0,0,0,.1)' : '#fff')};
  color: var(--color-light-grey);
  height: 20rem;
  padding: 2rem;
  position: relative;
  border-radius: var(--size-smallest);
`;

export const UploadPreview = styled.figure`
  display: inline-block;
  height: 100%;
  position: relative;
  opacity: ${({ dragging }) => (dragging ? 0.5 : 1)};
`;

export const PreviewImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Label = styled.label`
  width: 100%;
  height: 100%;
  border-radius: var(--size-smallest);
  border: 0.1rem dashed var(--color-light-grey);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: currentColor;
    font-size: var(--size-largest);
  }
`;

export const Input = styled.input`
  display: none;
`;
