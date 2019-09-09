import React from 'react';
import { StaticMap } from 'react-map-gl';

import * as Styled from './styled';
import { ReactComponent as CalendarIcon } from '../../assets/SVG/calendar.svg';

const Plan = () => (
  <Styled.Plan>
    <Styled.Location>
      <StaticMap
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        width="100%"
        height="25rem"
        latitude={37.7577}
        longitude={-122.4376}
        zoom={13}
      />
    </Styled.Location>
    <Styled.Title>Picnic at the park</Styled.Title>
    <Styled.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Styled.Description>
    <Styled.Date>
      <CalendarIcon className="icon icon-smallest" /> 09/13/2019
    </Styled.Date>
    <Styled.Participants>
      {[...Array(3)].map((e, i) => (
        <Styled.ParticipantImg key={i} src="https://via.placeholder.com/60" />
      ))}
    </Styled.Participants>
  </Styled.Plan>
);

export default Plan;
