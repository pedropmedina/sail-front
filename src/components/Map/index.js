/* eslint-disable no-console, react/prop-types */
import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import * as Styled from './styled';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';
import { ReactComponent as XIcon } from '../../assets/SVG/x.svg';

const Map = ({
  viewport,
  draftPin,
  pinsData,
  onViewportChange,
  onDragEnd,
  onClickMarker,
  onMouseEnterMarker,
  onMouseLeaveMarker,
  popupPin,
  showDraftPinPopup,
  onClickDraftPinPopup,
  draftPinPopup
}) => {
  return (
    <Styled.Map>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={onViewportChange}
      >
        {/* Add markers for all existing pins */}
        {pinsData &&
          pinsData.pins.map(pin => {
            const { _id, longitude, latitude } = pin;
            return (
              <Marker
                key={_id}
                longitude={longitude}
                latitude={latitude}
                offsetLeft={-24 / 2}
                offsetTop={-24}
              >
                <PinIcon
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
            offsetTop={-28}
            sortByDepth={true}
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
            key={draftPin.id}
            longitude={draftPin.longitude}
            latitude={draftPin.latitude}
            draggable={true}
            onDragEnd={onDragEnd}
            offsetLeft={-24 / 2}
            offsetTop={-24}
          >
            <PinIcon
              className="icon icon-small draft-pin-icon-draggable"
              onClick={() => onClickMarker(draftPin)}
            />
          </Marker>
        )}

        {/* show popup and marker for selecting geocoding result */}
        {showDraftPinPopup && (
          <>
            <Marker {...draftPinPopup} offsetLeft={-24 / 2} offsetTop={-24}>
              <PinIcon className="icon icon-small draf-pin-icon" />
            </Marker>

            <Styled.CustomPopup
              longitude={draftPinPopup.longitude}
              latitude={draftPinPopup.latitude}
              offsetLeft={12}
              offsetTop={-12}
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
          </>
        )}
      </ReactMapGL>
    </Styled.Map>
  );
};

export default Map;
