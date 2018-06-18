import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Submit_Form from '../graphql/Submit_Form.jsx';

const SubmitForm = (props) => {
  return (
    <Mutation mutation={Submit_Form}>
      {(submitForm, { data }) => {
        return (
          <div>
            <button 
            onClick={() => {
              submitForm({variables:props.data})
            }}
            >Add Contact</button>
          </div>
        )
      }}
    </Mutation>
  )  
}

export default SubmitForm;