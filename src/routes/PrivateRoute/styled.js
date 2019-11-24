import styled from 'styled-components/macro';

import { mediaQueries } from '../../sharedStyles/mediaQueries';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: [col-1-start] 20rem [col-1-end col-2-start] 1fr [col-2-end];
  grid-template-rows: [row-1-start] 7rem [row-1-end row-2-start] 1fr [row-2-end];
  background-color: var(--color-almost-white);
  position: relative;

  > * {
    :nth-child(2) {
      grid-row: row-1-start / row-2-end;
      grid-column: col-2-start / col-2-end;

      ${mediaQueries.tablet`
        grid-column: col-1-start / col-2-end;
        grid-row: row-2-start / row-2-end;
      `}
    }
  }
`;
