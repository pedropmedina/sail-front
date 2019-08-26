/* eslint-disable no-console, react/prop-types */
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useTransition, config } from 'react-spring';

import * as Styled from './styled';

import PlusIcon from '../../assets/SVG/plus.svg';
import MapPin from '../../assets/SVG/map-pin.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';

import PinQuery from '../PinQuery';
import PinMutation from '../PinMutation';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg';

const Map = ({
  viewport,
  pins,
  draftPin,
  currentPin,
  showBtns,
  onViewportChange,
  onDragEnd,
  onCreateDraftPin,
  onClickMarker,
  onToggleNewBtns,
  onChangeShowBtnsState,
  isLoggedIn
}) => {
  const transitions = useTransition([draftPin, currentPin], null, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    config: config.stiff
  });

  let Pin =
    !!draftPin && !currentPin
      ? PinMutation
      : !draftPin && !!currentPin
      ? PinQuery
      : null;

  return (
    <Styled.Map>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={onViewportChange}
      >
        {pins &&
          pins.map(pin => {
            const { _id, longitude, latitude } = pin;
            return (
              <Marker key={_id} longitude={longitude} latitude={latitude}>
                <MapPin
                  className="icon icon-small pin-icon"
                  onClick={() => onClickMarker(pin)}
                />
              </Marker>
            );
          })}

        {draftPin && (
          <Marker {...draftPin} draggable={true} onDragEnd={onDragEnd}>
            <MapPin className="icon icon-small draft-pin-icon" />
          </Marker>
        )}
      </ReactMapGL>

      {/* Create/Edit Pin or display current Pin */}
      {Pin &&
        transitions.map(
          ({ item, key, props }) => item && <Pin key={key} style={props} />
        )}

      {/* Create New Pins and Plans Buttons */}
      {isLoggedIn && (
        <>
          <Styled.ExpandBtn showBtns={showBtns} onClick={onToggleNewBtns}>
            <PlusIcon className="icon icon-small" />
          </Styled.ExpandBtn>
          <Styled.AddBtnWrapper>
            <Styled.AddBtn onClick={() => onChangeShowBtnsState(false)}>
              <CompassIcon className="icon icon-smallest" />
            </Styled.AddBtn>
            <Styled.AddBtn onClick={onCreateDraftPin}>
              <PinIcon className="icon icon-smallest" />
            </Styled.AddBtn>
          </Styled.AddBtnWrapper>
        </>
      )}
    </Styled.Map>
  );
};

export default Map;
