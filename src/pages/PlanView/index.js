/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import { Marker } from 'react-map-gl';

import * as Styled from './styled';

import MapPreview from '../../components/MapPreview';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

import { GET_PLAN_QUERY } from '../../graphql/queries';

const mapCss = `
  height: 25rem;
`;

const PlanView = props => {
  const { error, loading, data } = useQuery(GET_PLAN_QUERY, {
    variables: { planId: props.match.params.planId }
  });
  const { plan } = data;

  if (!error && loading) return <div>Loading...</div>;

  // console.log(plan);

  return (
    <Styled.PlanViewWrapper>
      <Styled.Panels>
        {/* Panel with plan's details */}
        <Styled.LeftPanel>
          <Styled.MapPreview>
            <MapPreview
              css={mapCss}
              longitude={plan.location.longitude}
              latitude={plan.location.latitude}
            >
              <Marker
                longitude={plan.location.longitude}
                latitude={plan.location.latitude}
              >
                <PinIcon className="icon icon-small pin-icon" />
              </Marker>
              <Styled.Popup
                longitude={plan.location.longitude}
                latitude={plan.location.latitude}
                offsetLeft={24}
                offsetTop={12}
                anchor="left"
                closeButton={false}
              >
                <Styled.PopupImg
                  src={plan.location.image}
                  alt="plans's image"
                />
              </Styled.Popup>
            </MapPreview>
          </Styled.MapPreview>
          <Styled.Date>
            {format(parseInt(plan.date), 'EEEE, MMMM do, yyyy hh:mm aaaa')}
          </Styled.Date>
          <Styled.Title>{plan.title}</Styled.Title>
          <Styled.Description>{plan.description}</Styled.Description>
          <Styled.Invites>
            <Styled.ListHeading>Pending Invitees</Styled.ListHeading>
            <Styled.List>
              {plan.invites.map(({ username, image }) => (
                <Styled.Item key={username}>
                  <Styled.UserPic
                    src={image ? image : 'https://via.placeholder.com/70'}
                    alt="user image"
                  />
                </Styled.Item>
              ))}
            </Styled.List>
          </Styled.Invites>
          <Styled.Participants>
            <Styled.ListHeading>Confirmed Participants</Styled.ListHeading>
            <Styled.List>
              {plan.participants.map(({ username, image }) => (
                <Styled.Item key={username}>
                  <Styled.UserPic
                    src={image ? image : 'https://via.placeholder.com/70'}
                    alt="user image"
                  />
                </Styled.Item>
              ))}
            </Styled.List>
          </Styled.Participants>
        </Styled.LeftPanel>
        {/* Panel with chat */}
        <Styled.RightPanel>
          <Styled.Chat>This is the chat</Styled.Chat>
        </Styled.RightPanel>
      </Styled.Panels>
    </Styled.PlanViewWrapper>
  );
};

export default PlanView;
