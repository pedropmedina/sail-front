/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ContentLoader from 'react-content-loader';

import * as Styled from './styled';
import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as HeartIcon } from '../../assets/SVG/heart.svg';
import { ReactComponent as ExternalLinkIcon } from '../../assets/SVG/external-link.svg';
import { CreateBtn } from '../../stylesShare';

import Topbar from '../../components/Topbar';

import { ME_QUERY } from '../../graphql/queries';
import { UNLIKE_PIN } from '../../graphql/mutations';
import {
  UPDATE_CURRENT_PIN,
  UPDATE_VIEWPORT,
  CREATE_DRAFT_PIN_POPUP,
  UPDATE_DRAFT_PIN_POPUP,
  DELETE_CURRENT_PIN,
  SHOW_DRAFT_PIN_POPUP
} from '../../reducer';

import { reverseGeocode } from '../../utils';
import Context from '../../context';

const PinLoader = () => (
  <ContentLoader
    height={120}
    width={500}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="39" y="17" rx="0" ry="0" width="0" height="0" />
    <rect x="34" y="26" rx="0" ry="0" width="0" height="0" />
    <rect x="38" y="48" rx="0" ry="0" width="0" height="0" />
    <rect x="39" y="40" rx="0" ry="0" width="0" height="0" />
    <rect x="39" y="40" rx="0" ry="0" width="0" height="0" />
    <rect x="16" y="5" rx="0" ry="0" width="103" height="93" />
    <rect x="143" y="17" rx="3" ry="3" width="350" height="6" />
    <rect x="143" y="36" rx="3" ry="3" width="350" height="6" />
    <rect x="142" y="57" rx="3" ry="3" width="350" height="6" />
    <circle cx="193" cy="85" r="12" />
    <circle cx="157" cy="85" r="12" />
  </ContentLoader>
);

const PinsList = ({
  isLoading,
  pins,
  addresses,
  handleUnlikePin,
  hanldeVisitLink,
  type = 'MINE'
}) => {
  return (
    <Styled.PinsList>
      {pins.map(pin => (
        <Styled.PinItem key={pin._id}>
          {isLoading ? (
            <PinLoader />
          ) : (
            <Styled.Pin>
              <Styled.PinLeft>
                <Styled.PinImg src={pin.image} alt="Location image" />
              </Styled.PinLeft>
              <Styled.PinRight>
                <Styled.PinTitle>{pin.title}</Styled.PinTitle>
                <Styled.PinAddress>{addresses[pin._id]}</Styled.PinAddress>
                <Styled.PinContent>{pin.content}</Styled.PinContent>
                <Styled.PinBtns>
                  {type !== 'MINE' && (
                    <Styled.UnlikeBtn onClick={() => handleUnlikePin(pin._id)}>
                      <HeartIcon />
                    </Styled.UnlikeBtn>
                  )}
                  <Styled.VisitBtn onClick={() => hanldeVisitLink(pin)}>
                    <ExternalLinkIcon />
                  </Styled.VisitBtn>
                </Styled.PinBtns>
              </Styled.PinRight>
            </Styled.Pin>
          )}
        </Styled.PinItem>
      ))}
    </Styled.PinsList>
  );
};

const Pins = ({ history }) => {
  const { state, dispatch } = useContext(Context);
  const [loadingGeocode, setLoadingGeocode] = useState(true);
  const { loading, data } = useQuery(ME_QUERY);
  const [addresses, setAddresses] = useState({});
  const [unlikePin] = useMutation(UNLIKE_PIN, { ignoreResults: true });

  const handleCreate = viewport => {
    const { longitude, latitude } = viewport;
    dispatch({ type: DELETE_CURRENT_PIN });
    dispatch({ type: CREATE_DRAFT_PIN_POPUP });
    dispatch({
      type: UPDATE_DRAFT_PIN_POPUP,
      payload: { longitude, latitude }
    });
    dispatch({ type: SHOW_DRAFT_PIN_POPUP, payload: true });
    history.push('/map');
  };

  useEffect(() => {
    if (data && data.user) {
      handleReverseGeocode(data.user.likedPins);
    }
  }, [data]);

  const handleReverseGeocode = async pins => {
    for (let pin of pins) {
      const addr = await reverseGeocode(pin.longitude, pin.latitude);
      setAddresses(prevState => ({ ...prevState, [pin._id]: addr }));
    }
    setLoadingGeocode(false);
  };

  const handleUnlikePin = async pinId => {
    await unlikePin({
      variables: { pinId },
      update: cache => {
        const { user } = cache.readQuery({ query: ME_QUERY });
        cache.writeQuery({
          query: ME_QUERY,
          data: {
            user: {
              ...user,
              likedPins: user.likedPins.filter(pin => pin._id !== pinId)
            }
          }
        });
      }
    });
  };

  const hanldeVisitLink = pin => {
    const { longitude, latitude } = pin;
    dispatch({
      type: UPDATE_VIEWPORT,
      payload: { longitude, latitude, zoom: 13 }
    });
    dispatch({ type: UPDATE_CURRENT_PIN, payload: pin });
    history.push('/map');
  };

  return (
    <Styled.PinsWrapper>
      <Topbar>
        <CreateBtn onClick={() => handleCreate(state.viewport)}>
          <PlusIcon className="icon icon-small" />
        </CreateBtn>
      </Topbar>
      <Styled.Panels>
        {/* Left Panel displaying pins authored by current user */}
        <Styled.LeftPanel>
          <Styled.PanelHeading>My Pins</Styled.PanelHeading>
          <PinsList
            isLoading={loading || loadingGeocode}
            pins={data && data.user ? data.user.myPins : []}
            addresses={addresses}
            handleUnlikePin={handleUnlikePin}
            hanldeVisitLink={hanldeVisitLink}
            type="MINE"
          />
        </Styled.LeftPanel>
        {/* Right Panel displaying pins liked by current user */}
        <Styled.RightPanel>
          <Styled.PanelHeading>Liked Pins</Styled.PanelHeading>
          <PinsList
            isLoading={loading || loadingGeocode}
            pins={data && data.user ? data.user.likedPins : []}
            addresses={addresses}
            handleUnlikePin={handleUnlikePin}
            hanldeVisitLink={hanldeVisitLink}
            type="LIKED"
          />
        </Styled.RightPanel>
      </Styled.Panels>
    </Styled.PinsWrapper>
  );
};

export default Pins;
