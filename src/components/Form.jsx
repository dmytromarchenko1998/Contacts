import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Update_Form from '../graphql/Update_Form.jsx';

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
          <div className="inputs">
            <input className="input" placeholder={inputs[key]} onChange={({ target }) => {
              let value = target.value;
              if (value === '') {
                value = ' ';
              }
              updateForm({variables:{[key]:value}})}}
            />
          </div>
        ))
      }}
    </Mutation>
  )
};

export default Form;