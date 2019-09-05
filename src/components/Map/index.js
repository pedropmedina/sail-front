/* eslint-disable no-console, react/prop-types */
import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useTransition } from 'react-spring';

import * as Styled from './styled';

import PlusIcon from '../../assets/SVG/plus.svg';
import MapPin from '../../assets/SVG/map-pin.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';
import XIcon from '../../assets/SVG/x.svg';

import PinQuery from '../PinQuery';
import PinMutation from '../PinMutation';
import GeocodingSearch from '../GeocodingSearch';

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
  onMouseEnterMarker,
  onMouseLeaveMarker,
  onClickGeocodingResult,
  isLoggedIn,
  popupPin,
  showDraftPinPopup,
  onClickDraftPinPopup
}) => {
  const transitions = useTransition([draftPin, currentPin], null, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, zIndex: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  });

  let Pin =
    !!draftPin && !showDraftPinPopup && !currentPin
      ? PinMutation
      : !draftPin && !!currentPin
      ? PinQuery
      : null;

  return (
    <Styled.Map isLoggedIn={isLoggedIn}>
      {/* Geocoding search bar */}
      <GeocodingSearch
        viewport={viewport}
        onClickGeocodingResult={onClickGeocodingResult}
      />

      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={onViewportChange}
      >
        {/* Add markers for all existing pins */}
        {pins &&
          pins.map(pin => {
            const { _id, longitude, latitude } = pin;
            return (
              <Marker key={_id} longitude={longitude} latitude={latitude}>
                <MapPin
                  className="icon icon-small pin-icon"
                  onClick={() => onClickMarker(pin)}
                  onMouseEnter={() => onMouseEnterMarker(pin)}
                  onMouseLeave={onMouseLeaveMarker}
                />
              </Marker>
            );
          })}

        {/* Show popup on hover over pin */}
        {popupPin && (
          <Popup
            latitude={popupPin.latitude}
            longitude={popupPin.longitude}
            closeButton={false}
            closeOnClick={false}
            offsetLeft={12}
            offsetTop={-7}
          >
            <Styled.PopupFigure>
              <Styled.PopupImg src={popupPin.image} alt={popupPin.title} />
              <Styled.PopupCaption>{popupPin.title}</Styled.PopupCaption>
            </Styled.PopupFigure>
          </Popup>
        )}

        {/* Show marker for draft pin */}
        {draftPin && (
          <Marker
            {...draftPin}
            draggable={true}
            onDragEnd={onDragEnd}
          >
            <MapPin className="icon icon-small draft-pin-icon" />
          </Marker>
        )}
        {/* show popup for draft pin when selecting geocoding result */}
        {draftPin && showDraftPinPopup && (
          <Styled.CustomPopup
            longitude={draftPin.longitude}
            latitude={draftPin.latitude}
            offsetLeft={24}
            offsetTop={12}
            anchor="left"
            closeButton={false}
          >
            <p>Create new pin</p>
            <button onClick={onClickDraftPinPopup}>
              <PlusIcon className="icon icon-smallest" />
            </button>
            <button onClick={() => onClickDraftPinPopup('cancel')}>
              <XIcon className="icon icon-smallest" />
            </button>
          </Styled.CustomPopup>
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
