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
  gap: 2rem;

  list-style: none;
  font-size: 1.6rem;
  color: var(--color-light-grey);
`;

export const PinItem = styled.li`
  padding: 1rem;
  box-shadow: 0 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: var(--size-smallest);
  cursor: pointer;

  :hover {
    box-shadow: 0 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.2);
  }
`;

export const Pin = styled.div`
  height: 9rem;
  display: flex;
`;

export const PinLeft = styled.div`
  margin-right: 2rem;
  position: relative;
`;

export const PinRight = styled.div`
  overflow: hidden;
`;

export const PinImg = styled.img`
  display: inline-block;
  height: 100%;
  width: 11rem;
  object-fit: cover;
  object-position: center;
  border-radius: var(--size-smallest);
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
