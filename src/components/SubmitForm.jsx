import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Submit_Form from '../graphql/Submit_Form.jsx';

const SubmitForm = (props) => (
  <Mutation mutation={Submit_Form}>
    {(submitForm, { data }) => (
      <button 
        onClick={() => {
          submitForm({variables:props.data})
        }}
      >Add Contact</button>
    )}
  </Mutation>
)  

export default SubmitForm;