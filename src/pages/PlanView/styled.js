import styled from 'styled-components/macro';

import { Popup as P } from '../../stylesShare';

export const PlanViewWrapper = styled.div`
  padding: 2rem 5rem;
  color: var(--color-light-grey);
  overflow-y: auto;
`;

export const Panels = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
`;

export const Panel = styled.section`
  flex: 1 1 auto;
  padding: 2rem;
`;

export const LeftPanel = styled(Panel)`
  overflow-y: auto;
`;

export const RightPanel = styled(Panel)`
  height: 100%;
`;

export const MapPreview = styled.div`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 2rem;
  color: var(--color-dark-grey);
`;

export const Description = styled.p`
  font-size: 1.2rem;
`;

export const Date = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const Users = styled.section`
  margin-top: 1.5rem;
`;

export const Invites = styled(Users)``;

export const Participants = styled(Users)``;

export const ListHeading = styled.h2`
  font-weight: 500;
  color: var(--color-medium-grey);
`;

export const List = styled.ul`
  list-style: none;

  display: flex;
  flex-wrap: wrap;
`;

export const Item = styled.li`
  margin: 0.5rem;
`;

export const UserPic = styled.img`
  border-radius: 0.5rem;
  width: 7rem;
  height: 7rem;
`;

export const Popup = styled(P)`
  .mapboxgl-popup-content {
    box-shadow: none;
    background-color: var(--color-less-white);
  }

  div.mapboxgl-popup-tip {
    border-right-color: var(--color-less-white);
    border-left-color: var(--color-less-white);
  }
`;

export const PopupImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
`;

export const Chat = styled.div`
  height: 100%;
`;
