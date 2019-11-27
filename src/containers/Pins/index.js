/* eslint-disable react/prop-types */
import styled from 'styled-components/macro'; // eslint-disable-line
import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';
import { TopbarButton, RoundButton } from '../../sharedStyles/buttons';
import { NoContent } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as PlusIcon } from '../../assets/SVG/plus.svg';
import { ReactComponent as HeartIcon } from '../../assets/SVG/heart.svg';

import Topbar from '../../components/Topbar';
import Loader from '../../components/Loader';

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

const overwrite = `
  position: absolute;
  top: .5rem;
  right: .5rem;
  background-color: #fff;
  color: var(--color-earth-red);
`;

const PinsList = ({
  pins,
  addresses,
  handleUnlikePin,
  hanldeVisitLink,
  type = 'MINE'
}) => {
  return (
    <Styled.PinsList>
      {pins.map(pin => (
        <Styled.PinItem key={pin._id} onClick={() => hanldeVisitLink(pin)}>
          <Styled.Pin>
            <Styled.PinLeft>
              {type !== 'MINE' && (
                <RoundButton
                  onClick={event => {
                    event.stopPropagation();
                    handleUnlikePin(pin._id);
                  }}
                  css={overwrite}
                >
                  <HeartIcon />
                </RoundButton>
              )}
              <Styled.PinImg src={pin.image} alt='Location image' />
            </Styled.PinLeft>
            <Styled.PinRight>
              <Styled.PinTitle>{pin.title}</Styled.PinTitle>
              <Styled.PinAddress>{addresses[pin._id]}</Styled.PinAddress>
              <Styled.PinContent>{pin.content}</Styled.PinContent>
            </Styled.PinRight>
          </Styled.Pin>
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

  if (loading || loadingGeocode || !data)
    return <Loader loading={loading || loadingGeocode} />;

  return (
    <Wrapper>
      <Topbar>
        <TopbarButton onClick={() => handleCreate(state.viewport)}>
          <PlusIcon className='icon icon-small' />
        </TopbarButton>
      </Topbar>
      <Styled.Panels>
        {/* Left Panel displaying pins authored by current user */}
        <Styled.LeftPanel>
          <Styled.PanelHeading>My Pins</Styled.PanelHeading>
          {data.user.myPins.length === 0 ? (
            <NoContent>No pins created</NoContent>
          ) : (
            <PinsList
              pins={data && data.user ? data.user.myPins : []}
              addresses={addresses}
              handleUnlikePin={handleUnlikePin}
              hanldeVisitLink={hanldeVisitLink}
              type='MINE'
            />
          )}
        </Styled.LeftPanel>
        {/* Right Panel displaying pins liked by current user */}
        <Styled.RightPanel>
          <Styled.PanelHeading>Liked Pins</Styled.PanelHeading>
          {data.user.likedPins.length === 0 ? (
            <NoContent>No pins liked</NoContent>
          ) : (
            <PinsList
              pins={data && data.user ? data.user.likedPins : []}
              addresses={addresses}
              handleUnlikePin={handleUnlikePin}
              hanldeVisitLink={hanldeVisitLink}
              type='LIKED'
            />
          )}
        </Styled.RightPanel>
      </Styled.Panels>
    </Wrapper>
  );
};

export default Pins;
