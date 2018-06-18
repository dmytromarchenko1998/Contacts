import gql from 'graphql-tag';

const Update_Form = gql`
  mutation updateForm($firstName: String, $middleName: String, $lastName: String, $number: String, $email: String) {
    updateForm(firstName: $firstName, middleName: $middleName, lastName: $lastName, number: $number, email: $email) @client{
      firstName
    }
  }
`

export default Update_Form;