import gql from 'graphql-tag';

export const planFragment = gql`
  fragment planFields on Plan {
    _id
    title
    description
    date
    invites {
      name
      username
      email
    }
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
    author {
      name
      username
      email
    }
  }
`;

export const pinFragment = gql`
  fragment pinFields on Pin {
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
`;

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
        _id
        to {
          email
          username
        }
        status
        reqType
      }
      receivedRequests {
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
  `,
  people: gql`
    fragment peopleFields on User {
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
    }
  `
};

export const userFragment = gql`
  fragment userFields on User {
    email
    username
    name
    image
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
    receivedRequests {
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
`;
