/* eslint-disable no-console, react/prop-types */
import React, { useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { useTransition } from 'react-spring';

import * as Styled from './styled';

import PlusIcon from '../../assets/SVG/plus.svg';
import MapPin from '../../assets/SVG/map-pin.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';

import PinQuery from '../PinQuery';
import PinMutation from '../PinMutation';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg';

const geocondingService = mbxGeocoding({ accessToken: MAPBOX_TOKEN });

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
  isLoggedIn,
  popupPin
}) => {
  const transitions = useTransition([draftPin, currentPin], null, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, zIndex: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  });

  // this is to test the geocoding sdk
  // useEffect(() => {
  //   geocondingService
  //     .forwardGeocode({
  //       query: 'Paris, France',
  //       limit: 2
  //     })
  //     .send()
  //     .then(res => {
  //       console.log(res.body);
  //     });
  // }, []);

  let Pin =
    !!draftPin && !currentPin
      ? PinMutation
      : !draftPin && !!currentPin
      ? PinQuery
      : null;

  return (
    <Styled.Map>
      {/* Geocoding search bar */}
      {/* <Styled.GeocodingSearch>
        <Styled.GeocodingInput type="text" placeholder="search a place" />
      </Styled.GeocodingSearch> */}

      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
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
