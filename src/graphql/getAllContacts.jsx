import gql from 'graphql-tag';

const getAllContacts = gql`
  query {
    contacts {
      id
      firstName
      middleName
      lastName
      number
      email
    }
  }
`;

export default getAllContacts;