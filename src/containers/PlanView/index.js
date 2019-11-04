/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';

import * as Styled from './styled';

import MapPreview from '../../components/MapPreview';
import Chat from '../../components/Chat';

import { GET_PLAN_QUERY } from '../../graphql/queries';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations';

import { useLazyReverseGeocode } from '../../customHooks';

const mapCss = `
  height: 25rem;
`;

const PlanView = props => {
  const { error, loading, data } = useQuery(GET_PLAN_QUERY, {
    variables: { planId: props.match.params.planId },
    fetchPolicy: 'cache-and-network'
  });
  const { plan } = data;
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    ignoreResults: true
  });
  const [
    reverseGeocode,
    { reversedGeocode, longitude, latitude }
  ] = useLazyReverseGeocode();

  useEffect(() => {
    if (data && data.plan) {
      const { plan: { location: { longitude, latitude } } } = data; //prettier-ignore
      reverseGeocode(longitude, latitude);
    }
  }, [data]);

  const handleCreateMessage = conversation => async content => {
    await createMessage({ variables: { input: { conversation, content } } });
  };

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.PlanViewWrapper>
      <Styled.Panels>
        {/* Panel with plan's details */}
        <Styled.LeftPanel>
          <Styled.MapPreview>
            <MapPreview
              css={mapCss}
              longitude={longitude}
              latitude={latitude}
              reversedGeocode={reversedGeocode}
            />
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
          <Styled.Chat>
            <Chat
              data={plan.chat.messages}
              onCreateNew={handleCreateMessage(plan.chat._id)}
            />
          </Styled.Chat>
        </Styled.RightPanel>
      </Styled.Panels>
    </Styled.PlanViewWrapper>
  );
};

export default PlanView;
