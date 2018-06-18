import gql from 'graphql-tag';

const getFormData = gql`
  query {
    currentForm @client {
      firstName
      middleName
      lastName
      number
      email
    }
  }
`;
  
export default getFormData;