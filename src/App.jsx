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

const Update_Form = gql`
  mutation updateForm($firstName: String, $middleName: String, $lastName: String, $number: String, $email: String) {
    updateForm(firstName: $firstName, middleName: $middleName, lastName: $lastName, number: $number, email: $email) @client{
      firstName
    }
  }
`

const Submit_Form = gql`
  mutation newContact($firstName: String!, $middleName: String, $lastName: String!, $number: String!, $email: String!) {
    newContact(firstName: $firstName, middleName: $middleName, lastName: $lastName, number: $number, email: $email) {
      id
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

const Form = () => {
  const inputs = {
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
    number: 'PhoneNumber',
    email: 'Email'
  }
  return (
    <Mutation mutation={Update_Form}>
      {(updateForm, { data }) => {
        return Object.keys(inputs).map((key, index) => (
          <div className="input">
            <p>{inputs[key]} :</p>
            <input onChange={({ target }) => {
              updateForm({variables:{[key]:target.value}})}}
            />
          </div>
        ))
      }}
    </Mutation>
  )
};

const FormDraft = () => (
  <Query query={getFormData}>
    {({ data, error, loading}) => {
      if (error) return '💩 Oops!';
      if (loading) return 'loading';
      const currentForm = data.currentForm;
      return (
        <div>
          <p>{`Full Name: ${currentForm.firstName} ${currentForm.middleName} ${currentForm.lastName}`}</p>
          <p>{`Phone Number: ${currentForm.number}`}</p>
          <p>{`Email: ${currentForm.email}`}</p>
          <SubmitForm data={currentForm}/>
        </div>
      )
    }}
  </Query>
)

const SubmitForm = (props) => {
  return (
    <Mutation mutation={Submit_Form}>
      {(submitForm, { data }) => {
        return (
          <div>
            <button onClick={() => {
              submitForm({variables:props.data})
            }}>Submit</button>
          </div>
        )
      }}
    </Mutation>
  )  
}

export default App;
