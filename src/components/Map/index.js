/* eslint-disable no-console, react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useLazyQuery } from '@apollo/react-hooks';
import { useTransition, config } from 'react-spring';

import * as Styled from './styled';
import Context from '../../context';
import { GET_PINS_QUERY } from '../../graphql/queries';
import {
  CREATE_DRAFT_PIN,
  UPDATE_DRAFT_PIN,
  DELETE_DRAFT_PIN,
  GET_PINS,
  UPDATE_CURRENT_PIN,
  DELETE_CURRENT_PIN
} from '../../reducer';

import PlusIcon from '../../assets/SVG/plus.svg';
import MapPin from '../../assets/SVG/map-pin.svg';
import CompassIcon from '../../assets/SVG/compass.svg';
import PinIcon from '../../assets/SVG/map-pin.svg';

import PinQuery from '../PinQuery';
import PinMutation from '../PinMutation';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg';

const INITIAL_VIEWPORT = {
  longitude: -122.4376,
  latitude: 37.7577,
  zoom: 13
};

const Map = () => {
  const { state, dispatch } = useContext(Context);
  const { draftPin, currentPin, pins } = state;
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [showAddNewButtons, setShowAddNewButtons] = useState(false);
  const [getPins, { data: getPinsData }] = useLazyQuery(GET_PINS_QUERY);
  const transitions = useTransition([draftPin, currentPin], null, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    config: config.stiff
  });

  useEffect(() => {
    getPins();
  }, []);

  useEffect(() => {
    // getPinsData is updated upon the creation of new pin via cache.writeQuery in
    // PinMutation component making obsolete the need to dispath the new pin to Context
    // as we dispatch all pins in apollo cache at once
    if (getPinsData) {
      dispatch({ type: GET_PINS, payload: getPinsData.getPins });
    }
  }, [getPinsData]);

  const handleCreateDraftPin = () => {
    // make sure there's not existing draft pin
    if (draftPin) return;
    // remove existing current pin
    dispatch({ type: DELETE_CURRENT_PIN });
    // start with a clean slate
    dispatch({ type: CREATE_DRAFT_PIN });
    // get longitude and latitude from the current viewport and update draft pin
    const { longitude, latitude } = viewport;
    // update draft pin
    dispatch({
      type: UPDATE_DRAFT_PIN,
      payload: { longitude, latitude }
    });
    // hide buttons
    setShowAddNewButtons(false);
  };

  const handleCurrentPin = pin => {
    // remove existing draft pin
    dispatch({ type: DELETE_DRAFT_PIN });
    // dispatch clicked pin's info to context
    dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
  };

  const handleDragEnd = ({ lngLat }) => {
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

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
        onViewportChange={viewport => setViewport(viewport)}
      >
        {pins &&
          pins.map(pin => {
            const { _id, longitude, latitude } = pin;
            return (
              <Marker key={_id} longitude={longitude} latitude={latitude}>
                <MapPin
                  className="icon icon-small pin-icon"
                  onClick={() => handleCurrentPin(pin)}
                />
              </Marker>
            );
          })}

        {draftPin && (
          <Marker {...draftPin} draggable={true} onDragEnd={handleDragEnd}>
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
      <Styled.NewButton
        showAddNewButtons={showAddNewButtons}
        onClick={() => setShowAddNewButtons(!showAddNewButtons)}
      >
        <PlusIcon className="icon icon-small" />
      </Styled.NewButton>
      <Styled.CreateNew>
        <Styled.NewPlanButton onClick={() => setShowAddNewButtons(false)}>
          <CompassIcon className="icon icon-smallest" />
        </Styled.NewPlanButton>
        <Styled.NewPinButton onClick={handleCreateDraftPin}>
          <PinIcon className="icon icon-smallest" />
        </Styled.NewPinButton>
      </Styled.CreateNew>
    </Styled.Map>
  );
};

export default Map;
