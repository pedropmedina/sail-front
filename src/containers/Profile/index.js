/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Avatar from 'react-user-avatar';
import { ClipLoader } from 'react-spinners';

import * as Styled from './styled';
import { NoContent, Spinner } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as UserPlusIcon } from '../../assets/SVG/user-plus.svg';

import Topbar from '../../components/Topbar';
import Plan from '../../components/Plan';
import Friend from '../../components/Friend';

import { GET_PROFILE_QUERY, ME_QUERY } from '../../graphql/queries';
import { CREATE_REQUEST_MUTATION } from '../../graphql/mutations';

import { useColors } from '../../hooks';

const Profile = props => {
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
  const { colors } = useColors();

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

  const showNameOrUsername = data =>
    data.firstName ? data.firstName : data.username;

  const hidePlans = user => plan =>
    plan.private
      ? [...plan.participants, ...plan.invites].some(
          u => u.username === user.username
        )
      : true;

  return (
    <Wrapper>
      {!profileError &&
      !meError &&
      (profileLoading || meLoading || (!profile && !user)) ? (
        <Spinner>
          <ClipLoader
            sizeUnit={'rem'}
            size={4}
            color={'#6C8C96'}
            loading={profileLoading || meLoading}
          />
        </Spinner>
      ) : (
        <>
          <Topbar>
            {!showSendRequestBtn(profile, user) && (
              <Styled.FriendRequestBtn
                onClick={() => handleFriendRequest(profile.username, 'FRIEND')}
              >
                <UserPlusIcon className='icon icon-small' />
                Send Friend Request
              </Styled.FriendRequestBtn>
            )}
          </Topbar>
          {/* Wraps profile details and content */}
          <Styled.Profile>
            {/* Profile details  */}
            <Styled.ProfileDetails>
              <Avatar
                size='200'
                name={profile.fullName}
                src={profile.image}
                className='UserAvatar--square'
                colors={colors}
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
              {profile.address.longitude && profile.address.latitude && (
                <Styled.Location>
                  {profile.address.place}, {profile.address.region}
                </Styled.Location>
              )}
              <Styled.About>
                {profile.about ? profile.about : 'Add your about'}
              </Styled.About>
            </Styled.ProfileDetails>
            {/* Content */}
            <Styled.Content>
              {/* Plans */}
              <Styled.ContentPlans>
                <Styled.ContentHeading>Plans</Styled.ContentHeading>
                {profile.inPlans.length <= 0 ? (
                  <NoContent>
                    {`${showNameOrUsername(
                      profile
                    )} is yet to be part of any plans.`}
                  </NoContent>
                ) : profile.inPlans.filter(hidePlans(user)).length <= 0 ? (
                  <NoContent>
                    {`${showNameOrUsername(profile)}'s plans are private.`}
                  </NoContent>
                ) : (
                  <Styled.List>
                    {profile.inPlans.filter(hidePlans(user)).map(plan => (
                      <Plan key={plan._id} {...plan} />
                    ))}
                  </Styled.List>
                )}
              </Styled.ContentPlans>
              {/* Friends */}
              <Styled.ContentFriends>
                <Styled.ContentHeading>Friends</Styled.ContentHeading>
                {profile.friends.length > 0 ? (
                  <Styled.List>
                    {profile.friends.map((friend, i) => (
                      <Friend
                        key={`${friend.username}-${i}`}
                        plansQty={friend.inPlans.length}
                        friendsQty={friend.friends.length}
                        {...friend}
                      />
                    ))}
                  </Styled.List>
                ) : (
                  <NoContent>
                    {`${showNameOrUsername(profile)} hasn't added any friends.`}
                  </NoContent>
                )}
              </Styled.ContentFriends>
            </Styled.Content>
          </Styled.Profile>
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
