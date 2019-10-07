/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import * as Styled from './styled';

import { ReactComponent as UserPlusIcon } from '../../assets/SVG/user-plus.svg';

import Topbar from '../../components/Topbar';
import Plan from '../../components/Plan';
import Friend from '../../components/Friend';

import { GET_PROFILE_QUERY, ME_QUERY } from '../../graphql/queries';
import { CREATE_REQUEST_MUTATION } from '../../graphql/mutations';

import { reverseGeocode } from '../../utils';

const Profile = props => {
  const [address, setAddress] = useState('Unknown');
  const {
    error: profileError,
    loading: profileLoading,
    data: profileData
  } = useQuery(GET_PROFILE_QUERY, {
    variables: { username: props.match.params.username }
  });
  const { error: meError, loading: meLoading, data: meData } = useQuery(
    ME_QUERY
  );
  const [createRequest] = useMutation(CREATE_REQUEST_MUTATION, {
    ignoreResults: true
  });

  useEffect(() => {
    (async () => {
      if (profileData && profileData.address) {
        const { longitude, latitude } = profileData.address;
        if ((longitude, latitude)) {
          setAddress(await prepareUserAddress(profileData.address));
        }
      }
    })();
  }, [profileData]);

  const prepareUserAddress = async coords => {
    const { longitude, latitude } = coords;
    if (longitude && latitude) {
      return await reverseGeocode(longitude, latitude);
    }
    return 'Unknown';
  };

  const handleFriendRequest = async (username, reqType) => {
    const input = { to: username, reqType };
    await createRequest({ variables: { input } });
  };

  if ((!profileError || !meError) && (profileLoading || meLoading))
    return <div>Loading...</div>;

  const {
    name,
    username: profileUsername,
    email,
    about,
    image,
    friends: profileFriends,
    inPlans
  } = profileData.profile;
  const { username: meUsername, friends: meFriends } = meData.user;

  return (
    <Styled.ProfileWrapper>
      <Topbar>
        <Styled.FriendRequestBtn
          isVisible={
            meUsername !== profileUsername &&
            !meFriends.some(friend => friend.username === profileUsername)
          }
          onClick={() => handleFriendRequest(profileUsername, 'FRIEND')}
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
          <Styled.Name>{name ? name : profileUsername}</Styled.Name>
          <Styled.Stats>
            <Styled.Stat>
              <Styled.StatHeading>Plans</Styled.StatHeading>
              <Styled.StatData>{inPlans.length}</Styled.StatData>
            </Styled.Stat>
            <Styled.Stat>
              <Styled.StatHeading>Friend</Styled.StatHeading>
              <Styled.StatData>{profileFriends.length}</Styled.StatData>
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
                {`${
                  name ? name : profileUsername
                } is yet to be part of any plans.`}
              </Styled.NoContent>
            )}
          </Styled.ContentPlans>
          {/* Friends */}
          <Styled.ContentFriends>
            <Styled.ContentHeading>Friends</Styled.ContentHeading>
            {profileFriends.length > 0 ? (
              <Styled.List>
                {profileFriends.map((friend, i) => (
                  <Friend key={`${friend.username}-${i}`} {...friend} />
                ))}
              </Styled.List>
            ) : (
              <Styled.NoContent>
                {`${name ? name : profileUsername} hasn't added any friends.`}
              </Styled.NoContent>
            )}
          </Styled.ContentFriends>
        </Styled.Content>
      </Styled.Profile>
    </Styled.ProfileWrapper>
  );
};

export default Profile;
