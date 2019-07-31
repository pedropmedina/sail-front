import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  :root {
    --color-earth-red: #CA433B;
    --color-almost-black: #0A0B0B;
    --color-dark-grey: #324C56;
    --color-light-grey: #6C8C96;
    --color-lightest-grey: #B6BBC0;
    --color-almost-white: #EDECED;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #eee;
    line-height: 1.6;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
`;
