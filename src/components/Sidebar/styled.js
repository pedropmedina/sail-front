import React from 'react';
import styled, { css } from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import { mediaQueries } from '../../sharedStyles/mediaQueries';

export const Sidebar = styled.nav`
  grid-row: row-1-start / row-2-end;
  grid-column: col-1-start / col-1-end;
  z-index: 2;
  background-color: var(--color-almost-white);
  box-shadow: ${({ showingCurrentPin, showingDraftPin }) =>
    !(showingCurrentPin || showingDraftPin)
      ? '0 1rem 1rem 1rem rgba(0, 0, 0, 0.1)'
      : 'unset'};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;

  > * {
    flex-basis: 100%;
  }

  ${mediaQueries.tablet`
    grid-column: col-1-start / col-2-end;
    grid-row: row-1-start / row-1-end;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 0 1.5rem;
    box-shadow: 0 .2rem .8rem .2rem rgba(0, 0, 0, 0.1);

    > * {
      flex-basis: initial;
    }
  `}

  ${mediaQueries.mobileM`
    padding: 0 1rem;
  `}
`;

export const Profile = styled.aside`
  flex-basis: 12rem;
  height: fit-content;
  color: var(--color-almost-white);
  background-color: var(--color-medium-grey);
  padding: 2rem 1rem;
  border-radius: 2rem;

  ${mediaQueries.tablet`
    background-color: transparent;
    padding: 0;
    margin-right: auto;
  `}

  ${mediaQueries.mobileM`
    flex-basis: 6rem;
  `}
`;

export const Figure = styled.figure`
  text-align: center;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > *:not(:first-child) {
    flex-basis: 100%;
  }

  ${mediaQueries.tablet`
    .sidebar-avatar {
      width: 5rem !important;
      height: 5rem !important;

      > div {
        line-height: 4.5rem !important;
        width: 5rem !important;
        height: 5rem !important;
        border: 0.2rem solid #fff;

        img {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  `}

  ${mediaQueries.mobileM`
    .sidebar-avatar {
      width: 4rem !important;
      height: 4rem !important;

      > div {
        line-height: 3.5rem !important;
        width: 4rem !important;
        height: 4rem !important;
        border: 0.2rem solid #fff;

        img {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  `}
`;

export const Name = styled.figcaption`
  margin-top: 1rem;
  font-size: 1.2rem;
  text-transform: capitalize;

  ${mediaQueries.tablet`
    display: none;
  `}
`;

export const Location = styled.span`
  font-size: 1.2rem;

  ${mediaQueries.tablet`
    display: none;
  `}
`;

export const ProfileMoreBtn = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-almost-white);
  width: 50%;
  display: block;
  margin: 1rem auto 0 auto;
  border-radius: 2rem;
  cursor: pointer;

  svg {
    fill: currentColor;
    height: 2rem;
    width: 2rem;

    ${mediaQueries.tablet`
    display: none;
  `}
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const List = styled.ul`
  list-style: none;
  font-size: 1.2rem;

  ${mediaQueries.tablet`
      display: flex;
      height: 100%;
    }
  `}
`;

export const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  :not(:last-child) {
    margin-bottom: 2rem;
  }

  ${mediaQueries.tablet`
    margin-bottom: 0 !important;
  `}
`;

// Avoid customs props from being passed down to third party DOM element
export const Link = styled((
  { isDirtyReq, isDirtyMsg, children, ...rest } // eslint-disable-line
) => <NavLink {...rest}>{children}</NavLink>)`
  &:link,
  &:visited,
  &:active {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    text-decoration: none;
    color: var(--color-light-grey);
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: var(--color-almost-white);
      background-color: var(--color-light-grey);
    }
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: currentColor;
  }

  ${mediaQueries.tablet`
    &:link,
    &:visited,
    &:active {
      width: 4rem;
      height: 100%;
      border-radius: unset;
      position: relative;

      &::after {
        content: " ";
        display: block;
        color: black;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: .4rem;
        background-color: transparent;
      }
    }


    &.selected-navLink {
      background-color: var(--color-less-white);
      color: var(--color-medium-grey) !important;

      &::after {
        background-color: var(--color-medium-grey);
      }
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  `}

  ${mediaQueries.mobileM`
    &:link,
    &:visited {
      width: 3rem;
    }

    svg {
      width: 1.7rem;
      height: 1.7rem;
    }
  `}

  ${({ isDirtyMsg, isDirtyReq }) =>
    (isDirtyMsg || isDirtyReq) &&
    css`
      ::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0rem;
        right: 0.1rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background-color: var(--color-earth-red);
      }
    `}
`;

export const AuthWrapper = styled.div`
  ${mediaQueries.tablet`
    margin-left: auto;
    height: 100%;
  `}
`;

export const AuthBtn = styled.button`
  border: none;
  padding: 0;
  width: 5rem;
  height: 5rem;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  background-color: transparent;
  color: var(--color-light-grey);
  cursor: pointer;
  transition: all 0.2s;
  outline: unset;

  &:hover {
    background-color: var(--color-light-grey);
    color: var(--color-almost-white);
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: currentColor;
  }

  ${mediaQueries.tablet`
    width: 4rem !important;
    height: 100%;
    border-radius: unset;

    svg {
      width: 2rem;
      height: 2rem;
    }
  `}

  ${mediaQueries.mobileM`
    width: 3rem !important;
    height: 100%;
    border-radius: unset;

    svg {
      width: 1.7rem;
      height: 1.7rem;
    }
  `}
`;
