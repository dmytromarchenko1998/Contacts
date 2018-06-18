import gql from 'graphql-tag';

const Submit_Form = gql`
  mutation newContact($firstName: String!, $middleName: String, $lastName: String!, $number: String!, $email: String!) {
    newContact(firstName: $firstName, middleName: $middleName, lastName: $lastName, number: $number, email: $email) {
      id
    }
  }
`

export default Submit_Form;