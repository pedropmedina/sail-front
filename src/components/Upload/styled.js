import styled from 'styled-components/macro';

export const UploadWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ dragging }) => (dragging ? 'rgba(0,0,0,.1)' : '#fff')};
  position: relative;
  color: var(--color-light-grey);
  height: 20rem;
  border-radius: var(--size-smallest);
`;

export const Upload = styled.div`
  height: 100%;
  width: 100%;
`;

export const UploadPreview = styled.figure`
  display: inline-block;
  height: 100%;
  width: 100%;
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
  font-size: var(--size-largest);
  cursor: pointer;

  svg {
    fill: currentColor;
    font-size: inherit;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const EditWrapper = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  z-index: 1;
`;
