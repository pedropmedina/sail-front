import { css } from 'styled-components/macro';

// handle css media queries
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

const devices = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};

// export an object with device size mapped to function that gets called with backslash
// with the css properties that then get passed down to styled components's css function as args
export const mediaQueries = Object.keys(devices).reduce((queries, device) => {
  queries[device] = (...args) => css`
    @media ${devices[device]} {
      ${css(...args)};
    }
  `;
  return queries;
}, {});
