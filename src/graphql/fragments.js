import gql from 'graphql-tag';

// conversation fragments
export const conversationFragments = {
  default: gql`
    fragment defaultConversationFields on Conversation {
      _id
      participants {
        name
        username
        email
      }
      messages {
        _id
        content
      }
      keyedMessagesByUser
      author {
        name
        username
        email
      }
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
        name
        username
        email
        image
      }
      participants {
        name
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
        name
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
        text
        author {
          email
          username
          name
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
        name
        image
        about
        address {
          longitude
          latitude
        }
        friends {
          email
          username
          name
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
        name
        username
        email
        image
      }
      status
      reqType
      author {
        name
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
        name
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
        name
        username
        email
        image
      }
      createdAt
      updatedAt
    }
  `
};

// user fragments
export const userFragments = {
  default: gql`
    fragment defaultUserFields on User {
      email
      username
      name
      image
      about
      address {
        longitude
        latitude
      }
      friends {
        email
        username
        name
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
  `,
  friends: gql`
    fragment friendsFields on User {
      email
      username
      name
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
        name
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
      name
      image
      about
      address {
        longitude
        latitude
      }
      friends {
        email
        username
        name
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
        participants {
          name
          username
          email
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

// comment fragments
export const commentFragments = {
  default: gql`
    fragment defaultCommentFields on Comment {
      _id
      text
      pin {
        _id
      }
      author {
        name
        username
        email
        image
      }
      createdAt
    }
  `
};
