/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';

import { ReactComponent as UserPlusIcon } from '../../assets/SVG/user-plus.svg';

import Topbar from '../../components/Topbar';
import Plan from '../../components/Plan';
import Friend from '../../components/Friend';

import { GET_PROFILE_QUERY } from '../../graphql/queries';
import { CREATE_REQUEST_MUTATION } from '../../graphql/mutations';

import { reverseGeocode } from '../../utils';

import Context from '../../context';

const Profile = props => {
  const { state } = useContext(Context);
  const [address, setAddress] = useState('Unknown');
  const {
    error,
    loading,
    data: { profile }
  } = useQuery(GET_PROFILE_QUERY, {
    variables: { username: props.match.params.username }
  });
  const [createRequest] = useMutation(CREATE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  useEffect(() => {
    (async () => {
      if (profile && profile.address) {
        const { longitude, latitude } = profile.address;
        if ((longitude, latitude)) {
          setAddress(await prepareUserAddress(profile.address));
        }
      }
    })();
  }, [profile]);

  const prepareUserAddress = async coords => {
    const { longitude, latitude } = coords;
    if (longitude && latitude) {
      return await reverseGeocode(longitude, latitude);
    }
    return 'Unknown';
  };

  const handleFriendRequest = async (email, reqType) => {
    const input = { to: email, reqType };
    await createRequest({ variables: { input } });
  };

  if (!error && loading) return <div>Loading...</div>;

  const { name, username, email, about, image, friends, inPlans } = profile;

  return (
    <Styled.ProfileWrapper>
      <Topbar>
        <Styled.FriendRequestBtn
          isVisible={
            state &&
            state.currentUser &&
            state.currentUser.username !== username &&
            !state.currentUser.friends.some(
              friend => friend.username === username
            )
          }
          onClick={() => handleFriendRequest(email, 'FRIEND')}
        >
          <UserPlusIcon className="icon icon-small" />
          Send Friend Request
        </Styled.FriendRequestBtn>
      </Topbar>
      {/* Wraps profile details and content */}
      <Styled.Profile>
        {/* Profile details  */}
        <Styled.ProfileDetails>
          <Styled.ProfileImg
            src={image ? image : 'https://via.placeholder.com/200X300'}
            alt="Profile image"
          />
          <Styled.Name>{name ? name : username}</Styled.Name>
          <Styled.Stats>
            <Styled.Stat>
              <Styled.StatHeading>Plans</Styled.StatHeading>
              <Styled.StatData>{inPlans.length}</Styled.StatData>
            </Styled.Stat>
            <Styled.Stat>
              <Styled.StatHeading>Friend</Styled.StatHeading>
              <Styled.StatData>{friends.length}</Styled.StatData>
            </Styled.Stat>
          </Styled.Stats>
          <Styled.Email>{email}</Styled.Email>
          <Styled.Location>{address}</Styled.Location>
          <Styled.About>{about ? about : 'Tells about you!'}</Styled.About>
        </Styled.ProfileDetails>
        {/* Content */}
        <Styled.Content>
          {/* Plans */}
          <Styled.ContentPlans>
            <Styled.ContentHeading>Plans</Styled.ContentHeading>
            {inPlans.length > 0 ? (
              <Styled.List>
                {inPlans.map(plan => (
                  <Plan key={plan._id} {...plan} />
                ))}
              </Styled.List>
            ) : (
              <Styled.NoContent>
                {`${name ? name : username} is yet to be part of any plans.`}
              </Styled.NoContent>
            )}
          </Styled.ContentPlans>
          {/* Friends */}
          <Styled.ContentFriends>
            <Styled.ContentHeading>Friends</Styled.ContentHeading>
            {friends.length > 0 ? (
              <Styled.List>
                {friends.map((friend, i) => (
                  <Friend key={`${friend.username}-${i}`} {...friend} />
                ))}
              </Styled.List>
            ) : (
              <Styled.NoContent>
                {`${name ? name : username} hasn't added any friends.`}
              </Styled.NoContent>
            )}
          </Styled.ContentFriends>
        </Styled.Content>
      </Styled.Profile>
    </Styled.ProfileWrapper>
  );
};

export default Profile;
