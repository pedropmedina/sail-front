import styled from 'styled-components/macro';

export const GeocodingSearch = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 50vh;
  height: 6rem;
  z-index: 1;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
`;

export const GeocodingForm = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const GeocodingInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 2rem;
  background-color: var(--color-almost-white);
  color: var(--color-light-grey);
  font-size: 1.6rem;
  border: none;
  outline: none;

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const SearchBtn = styled.button`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  color: var(--color-light-grey);
`;
