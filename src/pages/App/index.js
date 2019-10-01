/* eslint-disable no-console, react/prop-types */
import React, { useState, useContext } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { useTransition } from 'react-spring';

import * as Styled from './styled';

import Context from '../../context';
import { GET_PINS_QUERY, GET_PIN_BY_COORDS } from '../../graphql/queries';
import { COMMENT_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions';
import {
  CREATE_DRAFT_PIN,
  UPDATE_DRAFT_PIN,
  DELETE_DRAFT_PIN,
  UPDATE_CURRENT_PIN,
  DELETE_CURRENT_PIN,
  SET_POPUP_PIN,
  DELETE_POPUP_PIN,
  SHOW_DRAFT_PIN_POPUP,
  UPDATE_VIEWPORT,
  CREATE_DRAFT_PIN_POPUP,
  UPDATE_DRAFT_PIN_POPUP,
  DELETE_DRAFT_PIN_POPUP
} from '../../reducer';

import Map from '../../components/Map';
import PinQuery from '../../components/PinQuery';
import PinMutation from '../../components/PinMutation';
import GeocodingSearch from '../../components/GeocodingSearch';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as CompassIcon } from '../../assets/SVG/compass.svg';
import { ReactComponent as PinIcon } from '../../assets/SVG/map-pin.svg';

// styles for geocoding search component
const css = `
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  max-width: 70rem;
  z-index: 1;
  box-shadow: 0 1rem 1.5rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  color: var(--color-light-grey);
  background-color: var(--color-almost-white);
  font-size: 1.6rem;
`;

const App = props => {
  const client = useApolloClient();
  const { state, dispatch } = useContext(Context);
  const {
    draftPin,
    currentPin,
    isLoggedIn,
    popupPin,
    showDraftPinPopup,
    draftPinPopup,
    viewport,
    draftPlan
  } = state;
  const [showBtns, setShowBtns] = useState(false);
  const { error, loading, data: pinsData, subscribeToMore } = useQuery(
    GET_PINS_QUERY
  );
  const transitions = useTransition([draftPin || currentPin], null, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, zIndex: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  });

  const subscribeToNewComment = () => {
    subscribeToMore({
      document: COMMENT_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;

        const { data: { pin } } = subscriptionData; // prettier-ignore
        return Object.assign({}, prev, {
          pins: prev.pins.map(p => (p._id === pin._id ? pin : p))
        });
      }
    });
  };

  const handleClickMarker = pin => {
    // remove existing draft pin
    dispatch({ type: DELETE_DRAFT_PIN });
    // dispatch clicked pin's info to context
    dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
  };

  const handleOnMouseEnterMarker = pin => {
    dispatch({ type: SET_POPUP_PIN, payload: pin });
  };

  const handleOnMouseLeaveMarker = () => {
    dispatch({ type: DELETE_POPUP_PIN });
  };

  const handleCreateDraftPin = () => {
    // make sure there's not existing draft pin
    if (draftPin) return;

    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: CREATE_DRAFT_PIN });

    const { longitude, latitude } = viewport;
    dispatch({
      type: UPDATE_DRAFT_PIN,
      payload: { longitude, latitude }
    });

    setShowBtns(false);
  };

  const handleViewportChange = viewport => {
    const { longitude, latitude, zoom } = viewport;
    dispatch({ type: UPDATE_VIEWPORT, payload: { longitude, latitude, zoom } });
  };

  const handleToggleNewBtns = () => {
    setShowBtns(!showBtns);
  };

  const handleDragEnd = ({ lngLat }) => {
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  const handleShowBtnsState = bool => {
    setShowBtns(bool);
  };

  const handleClickGeocodingResult = async result => {
    // set viewport based on clicked result
    const [longitude, latitude] = result.center;
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: { longitude, latitude, zoom: 13 }
    });
    // check for matching pin with given coordinates
    const { data } = await client.query({
      query: GET_PIN_BY_COORDS,
      variables: { input: { longitude, latitude } }
    });

    // show pin details or prompt user to create new pin
    if (data && data.pin) {
      if (showDraftPinPopup) {
        dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
      }
      dispatch({ type: UPDATE_CURRENT_PIN, payload: data.pin });
    } else {
      dispatch({ type: DELETE_CURRENT_PIN });
      dispatch({ type: CREATE_DRAFT_PIN_POPUP });
      dispatch({
        type: UPDATE_DRAFT_PIN_POPUP,
        payload: { longitude, latitude }
      });
      dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: true });
    }
  };

  const handleClickDraftPinPopup = (action = 'create') => {
    if (action === 'cancel') {
      // send back to /create-plan if popup was initiated while creating new plan
      if (draftPlan) {
        props.history.push('/create-plan');
      }
    } else {
      dispatch({ type: CREATE_DRAFT_PIN });
      dispatch({ type: UPDATE_DRAFT_PIN, payload: draftPinPopup });
    }

    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: false });
    dispatch({ type: DELETE_DRAFT_PIN_POPUP });
  };

  let Pin =
    !!draftPin && !currentPin
      ? PinMutation
      : !draftPin && !draftPlan && !!currentPin
      ? PinQuery
      : null;

  if (!error && loading) return <div>Loading...</div>;

  return (
    <Styled.App>
      {/* Geocoding search bar */}
      <GeocodingSearch
        viewport={viewport}
        onClickGeocodingResult={handleClickGeocodingResult}
        css={css}
      />
      {/* Create/Edit Pin or display current Pin */}
      {Pin &&
        transitions.map(
          ({ item, key, props }) => item && <Pin key={key} style={props} />
        )}
      {/* Map view  */}
      <Map
        viewport={viewport}
        draftPin={draftPin}
        currentPin={currentPin}
        onViewportChange={handleViewportChange}
        onDragEnd={handleDragEnd}
        onClickMarker={handleClickMarker}
        onMouseEnterMarker={handleOnMouseEnterMarker}
        onMouseLeaveMarker={handleOnMouseLeaveMarker}
        onClickGeocodingResult={handleClickGeocodingResult}
        isLoggedIn={isLoggedIn}
        popupPin={popupPin}
        showDraftPinPopup={showDraftPinPopup}
        draftPinPopup={draftPinPopup}
        onClickDraftPinPopup={handleClickDraftPinPopup}
        draftPlan={draftPlan}
        onSubscribeToNewComment={subscribeToNewComment}
        pinsData={pinsData}
      />
      {/* Lower right action buttons */}
      {isLoggedIn && (
        <>
          <Styled.ExpandBtn showBtns={showBtns} onClick={handleToggleNewBtns}>
            <PlusIcon className="icon icon-small" />
          </Styled.ExpandBtn>
          <Styled.AddBtnWrapper>
            <Styled.AddBtn onClick={() => handleShowBtnsState(false)}>
              <CompassIcon className="icon icon-smallest" />
            </Styled.AddBtn>
            <Styled.AddBtn onClick={handleCreateDraftPin}>
              <PinIcon className="icon icon-smallest" />
            </Styled.AddBtn>
          </Styled.AddBtnWrapper>
        </>
      )}
    </Styled.App>
  );
};

export default App;
