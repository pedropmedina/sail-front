/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Avatar from 'react-user-avatar';

import * as Styled from './styled';
import { NoContent } from '../../sharedStyles/placeholder';
import { Wrapper } from '../../sharedStyles/wrappers';

import { ReactComponent as UserPlusIcon } from '../../assets/SVG/user-plus.svg';

import Topbar from '../../components/Topbar';
import Plan from '../../components/Plan';
import Friend from '../../components/Friend';
import Loader from '../../components/Loader';

import { GET_PROFILE_ME_QUERY } from '../../graphql/queries';
import { CREATE_REQUEST_MUTATION } from '../../graphql/mutations';

import { useColors } from '../../hooks';

const Profile = props => {
  const { loading, data } = useQuery(GET_PROFILE_ME_QUERY, {
    variables: { username: props.match.params.username }
  });

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

  if (loading || !data) return <Loader loading={loading} />;

  return (
    <Wrapper>
      <Topbar>
        {!showSendRequestBtn(data.profile, data.me) && (
          <Styled.FriendRequestBtn
            onClick={() => handleFriendRequest(data.profile.username, 'FRIEND')}
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
            name={data.profile.fullName}
            src={data.profile.image}
            className='UserAvatar--square'
            colors={colors}
          />
          <Styled.Name>{showNameOrUsername(data.profile)}</Styled.Name>
          <Styled.Stats>
            <Styled.Stat>
              <Styled.StatHeading>Plans</Styled.StatHeading>
              <Styled.StatData>{data.profile.inPlans.length}</Styled.StatData>
            </Styled.Stat>
            <Styled.Stat>
              <Styled.StatHeading>Friend</Styled.StatHeading>
              <Styled.StatData>{data.profile.friends.length}</Styled.StatData>
            </Styled.Stat>
          </Styled.Stats>
          <Styled.Email>{data.profile.email}</Styled.Email>
          {data.profile.address.longitude && data.profile.address.latitude && (
            <Styled.Location>
              {data.profile.address.place}, {data.profile.address.region}
            </Styled.Location>
          )}
          <Styled.About>
            {data.profile.about ? data.profile.about : 'Add your about'}
          </Styled.About>
        </Styled.ProfileDetails>
        {/* Content */}
        <Styled.Content>
          {/* Plans */}
          <Styled.ContentPlans>
            <Styled.ContentHeading>Plans</Styled.ContentHeading>
            {data.profile.inPlans.length <= 0 ? (
              <NoContent>
                {`${showNameOrUsername(
                  data.profile
                )} is yet to be part of any plans.`}
              </NoContent>
            ) : data.profile.inPlans.filter(hidePlans(data.me)).length <= 0 ? (
              <NoContent>
                {`${showNameOrUsername(data.profile)}'s plans are private.`}
              </NoContent>
            ) : (
              <Styled.List>
                {data.profile.inPlans.filter(hidePlans(data.me)).map(plan => (
                  <Plan key={plan._id} {...plan} me={data.me} />
                ))}
              </Styled.List>
            )}
          </Styled.ContentPlans>
          {/* Friends */}
          <Styled.ContentFriends>
            <Styled.ContentHeading>Friends</Styled.ContentHeading>
            {data.profile.friends.length > 0 ? (
              <Styled.List>
                {data.profile.friends.map((friend, i) => (
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
                {`${showNameOrUsername(
                  data.profile
                )} hasn't added any friends.`}
              </NoContent>
            )}
          </Styled.ContentFriends>
        </Styled.Content>
      </Styled.Profile>
    </Wrapper>
  );
};

export default Profile;
