import gql from 'graphql-tag';

const Remove_Contact = gql`
  mutation removeContact($id: String!) {
    removeContact(id: $id) {
      id
    }
  }
`

export default Remove_Contact;