import gql from 'graphql-tag';

// conversation fragments
export const conversationFragments = {
  default: gql`
    fragment defaultConversationFields on Conversation {
      _id
      participants {
        firstName
        lastName
        username
        email
        image
      }
      messages {
        _id
        content
        createdAt
        author {
          firstName
          lastName
          username
          image
        }
      }
      unreadCount {
        _id
        count
      }
      plan {
        _id
        title
        description
      }
      author {
        firstName
        lastName
        username
        email
      }
      createdAt
    }
  `
};

// plan fragments
export const planFragments = {
  default: gql`
    fragment defaultPlanFields on Plan {
      _id
      title
      description
      date
      invites {
        firstName
        lastName
        username
        email
        image
      }
      participants {
        firstName
        lastName
        username
        email
        image
      }
      chat {
        ...defaultConversationFields
      }
      location {
        _id
        title
        content
        image
        longitude
        latitude
        createdAt
      }
      author {
        firstName
        lastName
        username
        email
      }
    }
    ${conversationFragments.default}
  `
};

// pin fragments
export const pinFragments = {
  default: gql`
    fragment defaultPinFields on Pin {
      _id
      title
      content
      image
      latitude
      longitude
      author {
        username
        email
      }
      comments {
        _id
        content
        author {
          email
          username
          firstName
          lastName
        }
        createdAt
      }
      createdAt
    }
  `
};

// auth fragments
export const authFragments = {
  default: gql`
    fragment defaultAuthFields on Auth {
      token
      user {
        email
        username
        firstName
        lastName
        image
        about
        address {
          longitude
          latitude
        }
        friends {
          email
          username
          firstName
          lastName
          image
        }
        myPlans {
          _id
          title
          description
          date
        }
        inPlans {
          _id
          title
          description
          date
        }
        likedPins {
          _id
          title
          content
          image
          latitude
          longitude
        }
        sentRequests {
          _id
          to {
            email
            username
          }
          status
          reqType
        }
        admin
      }
    }
  `
};

// request fragments
export const requestFragments = {
  default: gql`
    fragment defaultRequestFields on Request {
      _id
      to {
        firstName
        lastName
        username
        email
        image
      }
      status
      reqType
      author {
        firstName
        lastName
        username
        email
        image
      }
      createdAt
      updatedAt
    }
  `,
  invite: gql`
    fragment inviteRequestFields on InviteRequest {
      _id
      to {
        firstName
        lastName
        username
        email
        image
      }
      status
      reqType
      plan {
        _id
        title
        description
      }
      author {
        firstName
        lastName
        username
        email
        image
      }
      createdAt
      updatedAt
    }
  `
};

// comment fragments
export const commentFragments = {
  default: gql`
    fragment defaultCommentFields on Comment {
      _id
      content
      pin {
        _id
      }
      author {
        firstName
        lastName
        username
        email
        image
      }
      createdAt
    }
  `
};

// user fragments
export const userFragments = {
  default: gql`
    fragment defaultUserFields on User {
      firstName
      lastName
      username
      email
      phone
      image
      about
      address {
        longitude
        latitude
      }
      friends {
        email
        username
        firstName
        lastName
        image
      }
      myPlans {
        _id
        title
        description
        date
      }
      inPlans {
        _id
        title
        description
        date
      }
      myPins {
        _id
        title
        content
        image
        latitude
        longitude
        comments {
          ...defaultCommentFields
        }
      }
      likedPins {
        _id
        title
        content
        image
        latitude
        longitude
        comments {
          ...defaultCommentFields
        }
      }
      sentRequests {
        ... on FriendRequest {
          ...defaultRequestFields
        }
        ... on InviteRequest {
          ...inviteRequestFields
        }
      }
      admin
    }
    ${requestFragments.default}
    ${requestFragments.invite}
    ${commentFragments.default}
  `,
  friends: gql`
    fragment friendsFields on User {
      email
      username
      firstName
      lastName
      image
      address {
        longitude
        latitude
      }
      about
      inPlans {
        _id
      }
      friends {
        email
        username
        firstName
        lastName
        image
        address {
          longitude
          latitude
        }
        about
      }
    }
  `,
  profile: gql`
    fragment profileFields on User {
      email
      username
      firstName
      lastName
      image
      about
      address {
        longitude
        latitude
      }
      friends {
        email
        username
        firstName
        lastName
        image
        address {
          longitude
          latitude
        }
      }
      inPlans {
        _id
        title
        description
        date
        private
        participants {
          firstName
          lastName
          username
          email
          image
        }
        invites {
          firstName
          lastName
          username
          email
          image
        }
        location {
          _id
          title
          content
          image
          longitude
          latitude
          createdAt
        }
      }
      likedPins {
        _id
        title
        content
        image
        latitude
        longitude
      }
      sentRequests {
        ... on FriendRequest {
          ...defaultRequestFields
        }
        ... on InviteRequest {
          ...inviteRequestFields
        }
      }
    }
    ${requestFragments.default}
    ${requestFragments.invite}
  `
};

// message fragments
export const messageFragments = {
  default: gql`
    fragment defaultMessageFields on Message {
      _id
      content
      createdAt
      conversation {
        _id
      }
      author {
        firstName
        lastName
        username
        email
        image
      }
    }
  `
};
