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
    data: { profile }
  } = useQuery(GET_PROFILE_QUERY, {
    variables: { username: props.match.params.username },
    fetchPolicy: 'cache-and-network'
  });
  const {
    error: meError,
    loading: meLoading,
    data: { user }
  } = useQuery(ME_QUERY, { fetchPolicy: 'cache-and-network' });
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

  const handleFriendRequest = async (username, reqType) => {
    const input = { to: username, reqType };
    await createRequest({ variables: { input } });
  };

  // there are three cases when I don't want to show send friend request button:
  // 1. current profile is me
  // 2. current profile is already friend
  // 3. there's an active request between profile and me
  const showSendRequestBtn = (profile, me) => {
    const checkForReq = (reqs, username) =>
      reqs.some(req => req.reqType === 'FRIEND' && req.to === username);
    const isSame = me.username === profile.username;
    const isFriend = me.friends.some(
      friend => friend.username === profile.username
    );
    const haveISentReq = checkForReq(me.sentRequests, profile.username);
    const hasProfileSentReq = checkForReq(profile.sentRequests, me.username);

    return isSame || isFriend || haveISentReq || hasProfileSentReq;
  };

  const showNameOrUsername = data => (data.name ? data.name : data.username);

  if (
    !profileError &&
    !meError &&
    (profileLoading || meLoading || (!profile && !user))
  ) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.ProfileWrapper>
      <Topbar>
        <Styled.FriendRequestBtn
          isVisible={!showSendRequestBtn(profile, user)}
          onClick={() => handleFriendRequest(profile.username, 'FRIEND')}
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
            src={
              profile.image
                ? profile.image
                : 'https://via.placeholder.com/200X300'
            }
            alt="Profile image"
          />
          <Styled.Name>{showNameOrUsername(profile)}</Styled.Name>
          <Styled.Stats>
            <Styled.Stat>
              <Styled.StatHeading>Plans</Styled.StatHeading>
              <Styled.StatData>{profile.inPlans.length}</Styled.StatData>
            </Styled.Stat>
            <Styled.Stat>
              <Styled.StatHeading>Friend</Styled.StatHeading>
              <Styled.StatData>{profile.friends.length}</Styled.StatData>
            </Styled.Stat>
          </Styled.Stats>
          <Styled.Email>{profile.email}</Styled.Email>
          <Styled.Location>{address}</Styled.Location>
          <Styled.About>
            {profile.about ? profile.about : 'Tells about you!'}
          </Styled.About>
        </Styled.ProfileDetails>
        {/* Content */}
        <Styled.Content>
          {/* Plans */}
          <Styled.ContentPlans>
            <Styled.ContentHeading>Plans</Styled.ContentHeading>
            {profile.inPlans.length > 0 ? (
              <Styled.List>
                {profile.inPlans.map(plan => (
                  <Plan key={plan._id} {...plan} />
                ))}
              </Styled.List>
            ) : (
              <Styled.NoContent>
                {`${showNameOrUsername(
                  profile
                )} is yet to be part of any plans.`}
              </Styled.NoContent>
            )}
          </Styled.ContentPlans>
          {/* Friends */}
          <Styled.ContentFriends>
            <Styled.ContentHeading>Friends</Styled.ContentHeading>
            {profile.friends.length > 0 ? (
              <Styled.List>
                {profile.friends.map((friend, i) => (
                  <Friend key={`${friend.username}-${i}`} {...friend} />
                ))}
              </Styled.List>
            ) : (
              <Styled.NoContent>
                {`${showNameOrUsername(profile)} hasn't added any friends.`}
              </Styled.NoContent>
            )}
          </Styled.ContentFriends>
        </Styled.Content>
      </Styled.Profile>
    </Styled.ProfileWrapper>
  );
};

export default Profile;
