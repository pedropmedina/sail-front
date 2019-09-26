import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  :root {
    --color-sky-blue: #4783e6;
    --color-earth-red: #CA433B;
    --color-almost-white: #EDECED;
    --color-less-white: #e8e8e8;
    --color-almost-black: #0A0B0B;
    --color-dark-grey: #324C56;
    --color-medium-grey: #6C8C96;
    --color-light-grey: #B6BBC0;
    --color-lightest-grey: #dbdbdb;
    --color-warning: #f2c446;
    --color-danger: #e64e4e;
    --color-success: #54b078;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #eee;
    line-height: 1.6;
    background-color: var(--color-almost-white);
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
`;
