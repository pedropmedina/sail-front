import styled from 'styled-components/macro';

export const PinsWrapper = styled.div`
  overflow-y: auto;
`;

export const Panels = styled.article`
  display: flex;
  flex-wrap: wrap;
  padding: 3rem 5rem;
`;

export const Panel = styled.section`
  flex: 1 1 auto;
  margin: 1rem;
`;

export const LeftPanel = styled(Panel)``;

export const RightPanel = styled(Panel)``;

export const PanelHeading = styled.h2`
  color: var(--color-light-grey);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem;
`;

export const Pins = styled.ul``;

export const PinsList = styled(Pins)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  gap: 1.5rem;

  list-style: none;
  font-size: 1.6rem;
  color: var(--color-light-grey);
`;

export const PinItem = styled.li`
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);

  > svg {
    height: 10.5rem;
    max-width: 100%;
  }
`;

export const Pin = styled.div`
  display: flex;
  align-items: center;
`;

export const PinLeft = styled.div`
  margin-right: 2rem;
  height: 9rem;
  width: 11rem;
  min-width: 9rem;
`;

export const PinRight = styled.div`
  overflow: hidden;
`;

export const PinImg = styled.img`
  display: inline-block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export const P = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PinTitle = styled.h3`
  font-size: 1.6rem;
`;

export const PinAddress = styled(P)``;

export const PinContent = styled(P)``;

export const PinBtns = styled.div`
  display: flex;
`;

export const PinBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: unset;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-medium-grey);

  :hover {
    background-color: var(--color-less-white);
  }

  svg {
    font-size: 1.4rem;
    fill: currentColor;
  }
`;

export const UnlikeBtn = styled(PinBtn)`
  margin-right: 0.1rem;

  svg {
    fill: var(--color-earth-red);
  }
`;

export const VisitBtn = styled(PinBtn)``;
