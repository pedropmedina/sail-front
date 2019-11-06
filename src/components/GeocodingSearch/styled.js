import styled, { css } from 'styled-components/macro';

import { ReactComponent as Icon } from '../../assets/SVG/search.svg';

export const GeocodingWrapper = styled.div`
  width: 100%;
  border-radius: var(--size-smallest);
  background-color: #fff;
  color: var(--color-light-grey);
`;

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
  background-color: inherit;
  border-radius: inherit;
  font-size: inherit;
  position: relative;
  color: inherit;
`;

export const GeocodingInput = styled.input`
  width: 100%;
  height: 100%;
  text-indent: 5rem;
  border: none;
  border-radius: inherit;
  outline: unset;
  color: var(--color-almost-black);
  background-color: inherit;
  font-size: var(--font-size-small);

  &::placeholder {
    color: var(--color-light-grey);
  }
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-large);
  fill: currentColor;
`;

export const GeocodingResults = styled.section`
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
  font-size: var(--font-size-small);
  color: var(--color-light-grey);
  padding: 1rem 2rem;

  &:hover {
    background-color: var(--color-almost-white);
    color: var(--color-light-grey);
    cursor: pointer;
  }
`;
