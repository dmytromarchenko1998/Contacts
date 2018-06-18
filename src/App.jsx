import React from 'react';
import PropTypes from 'prop-types';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql, compose } from 'apollo-client';

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

const updateForm = gql`
  mutation updateForm($firstName: String!, $middleName: String!) {
    updateForm(firstName: $firstName, middleName: $middleName) @client{
      firstName
    }
  }
`

const App = () => (
  <div className="App">
    <Contacts />
    <Form />
    <FormDraft />
  </div>
)

const Contacts = () => (
  <Query query={getAllContacts} >
    {({ data, error, loading }) => {
      if (error) return '💩 Oops!';
      if (loading) return 'loading';
      return (
        data.contacts.map(({ firstName, middleName,lastName, number, email, id}) => (
          <div id={id}>
            <p>{`${firstName} ${middleName || ''} ${lastName}`}</p>
            <p>{number}</p>
            <p>{email}</p>
          </div>
        ))
      );
    }}
  </Query>
);

// const Form = () => (
//   <Mutation mutation={updateForm}>
//     {({ updateForm }, { data }) => (
//     <div>
//       <input onChange={({ target }) => {
//         console.log(target.value);
//         console.log(updateForm);
//         updateForm({variables:{firstName:target.value, middleName: target.value}})}}
//       />
//     </div>
//     )}
//   </Mutation>
// );

// const FormDraft = () => (
//   <Query query={getFormData}>
//     {({ data, error, loading}) => {
//       if (error) return '💩 Oops!';
//       if (loading) return 'loading';
//       console.log(data);
//       return (
//         <div>test</div>
//       )
//     }}
//   </Query>
// )

// const Form = () => {
//   return (
//     <div>
//       <form>
//         <input onChange={({ target }) => {console.log(target.value)}}/>
//       </form>
//     </div>
//   )
// }

export default App;
