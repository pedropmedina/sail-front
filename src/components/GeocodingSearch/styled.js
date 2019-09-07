import styled, { css } from 'styled-components/macro';

import Icon from '../../assets/SVG/search.svg';

export const GeocodingWrapper = styled.div``;

export const Geocoding = styled.div`
  position: relative;
  color: inherit;
  background-color: inherit;
  border-radius: inherit;
  font-size: inherit;
`;

export const GeocodingSearch = styled.section`
  height: 6rem;
  width: 100%;
  color: inherit;
  background-color: inherit;
  border-radius: inherit;
  font-size: inherit;
  position: relative;
`;

export const GeocodingInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 2rem;
  border: none;
  color: inherit;
  background-color: inherit;
  outline: none;
  border-radius: inherit;
  font-size: inherit;

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: var(--color-light-grey);
`;

export const GeocodingResults = styled.section`
  display: none;
  padding: 2rem 0;
  background-color: var(--color-almost-white);
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 2rem));
  z-index: 1;

  ${({ showResults }) =>
    showResults &&
    css`
      display: block;
    `}
`;

export const ResultList = styled.ul`
  list-style: none;
`;

export const ResultItem = styled.li`
  font-size: 1.6rem;
  color: var(--color-light-grey);
  padding: 1rem 2rem;

  &:hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
    cursor: pointer;
  }
`;
