/* eslint-disable no-console, react/prop-types */
import React, { useContext } from 'react';
import {
  useApolloClient,
  useQuery,
  useSubscription
} from '@apollo/react-hooks';
import { useTransition } from 'react-spring';
import { FlyToInterpolator } from 'react-map-gl';

import * as Styled from './styled';

import Context from '../../context';
import {
  GET_PINS_QUERY,
  GET_PIN_BY_COORDS,
  ME_QUERY
} from '../../graphql/queries';
import {
  COMMENT_CREATED_SUBSCRIPTION,
  PIN_CREATED_SUBSCRIPTION
} from '../../graphql/subscriptions';
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
  DELETE_DRAFT_PIN_POPUP,
  UPDATE_DRAFT_PLAN
} from '../../reducer';

import Map from '../../components/Map';
import PinQuery from '../../components/PinQuery';
import PinMutation from '../../components/PinMutation';
import GeocodingSearch from '../../components/GeocodingSearch';

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
    popupPin,
    showDraftPinPopup,
    draftPinPopup,
    viewport,
    draftPlan
  } = state;
  const { error, loading, data: pinsData } = useQuery(GET_PINS_QUERY);
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    ME_QUERY
  );
  const transitions = useTransition([draftPin || currentPin], null, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, zIndex: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  });

  useSubscription(PIN_CREATED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { data: { pin }} = subscriptionData; // prettier-ignore
      const { pins } = client.readQuery({ query: GET_PINS_QUERY });
      client.writeQuery({
        query: GET_PINS_QUERY,
        data: { pins: [...pins, pin] }
      });
      // update query for getPinByCoords if create pin was started while creating new plan
      if (state.draftPlan) {
        const { longitude, latitude } = pin;
        client.writeQuery({
          query: GET_PIN_BY_COORDS,
          variables: { input: { longitude, latitude } },
          data: { pin }
        });
        dispatch({
          type: UPDATE_DRAFT_PLAN,
          payload: { location: pin._id }
        });
        dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
        props.history.push('/create-plan');
      }
    }
  });

  useSubscription(COMMENT_CREATED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { cache } = client;
      const { data: { comment } } = subscriptionData; // prettier-ignore
      const { pins } = cache.readQuery({ query: GET_PINS_QUERY });
      cache.writeQuery({
        query: GET_PINS_QUERY,
        data: {
          pins: pins.map(pin => {
            if (pin._id === comment.pin._id) {
              pin.comments = [...pin.comments, comment];
              // update current pin if selected
              updateCurrentPinOnCommentCreated(
                pin,
                currentPin,
                dispatch,
                UPDATE_CURRENT_PIN
              );
              return pin;
            }
            return pin;
          })
        }
      });
    }
  });

  const updateCurrentPinOnCommentCreated = (
    pin,
    currentPin,
    dispatchFn,
    type
  ) => {
    if (currentPin && currentPin._id === pin._id) {
      dispatchFn({ type, payload: pin });
    }
  };

  const handleClickMarker = pin => {
    dispatch({ type: DELETE_DRAFT_PIN });
    dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
  };

  const handleOnMouseEnterMarker = pin => {
    dispatch({ type: SET_POPUP_PIN, payload: pin });
  };

  const handleOnMouseLeaveMarker = () => {
    dispatch({ type: DELETE_POPUP_PIN });
  };

  // TODO: Implement draftPin differently once I bring in data from foursquare
  /*
  const handleCreateDraftPin = () => {
    if (draftPin) return;

    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: CREATE_DRAFT_PIN });

    const { longitude, latitude } = viewport;
    dispatch({
      type: UPDATE_DRAFT_PIN,
      payload: { longitude, latitude }
    });
  };
  */

  const handleViewportChange = viewport => {
    const { longitude, latitude, zoom = 13 } = viewport;
    dispatch({ type: UPDATE_VIEWPORT, payload: { longitude, latitude, zoom } });
  };

  const handleDragEnd = ({ lngLat }) => {
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  const handleClickGeocodingResult = async result => {
    // set viewport based on clicked result
    const [longitude, latitude] = result.center;
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: {
        longitude,
        latitude,
        zoom: 13,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000
      }
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

  if ((!error && loading) || (!meError && meLoading))
    return <div>Loading...</div>;

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
          ({ item, key, props }) =>
            item && <Pin key={key} style={props} me={meData.user} />
        )}
      {/* Map view  */}
      <Map
        viewport={viewport}
        draftPin={draftPin}
        pinsData={pinsData}
        onViewportChange={handleViewportChange}
        onDragEnd={handleDragEnd}
        onClickMarker={handleClickMarker}
        onMouseEnterMarker={handleOnMouseEnterMarker}
        onMouseLeaveMarker={handleOnMouseLeaveMarker}
        popupPin={popupPin}
        showDraftPinPopup={showDraftPinPopup}
        onClickDraftPinPopup={handleClickDraftPinPopup}
        draftPinPopup={draftPinPopup}
      />
    </Styled.App>
  );
};

export default App;
