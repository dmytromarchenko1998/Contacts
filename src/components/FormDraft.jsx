import React from 'react';
import { Query, Mutation } from 'react-apollo';
import getFormData from '../graphql/getFormData.jsx';
import SubmitForm from './SubmitForm.jsx';

const FormDraft = () => (
  <Query query={getFormData}>
    {({ data, error, loading}) => {
      if (error) return '💩 Oops!';
      if (loading) return 'loading';
      const currentForm = data.currentForm;
      return (
        <div>
          <div >
            <p>{`Full Name: ${currentForm.firstName} ${currentForm.middleName} ${currentForm.lastName}`}</p>
            <p>{`Phone Number: ${currentForm.number}`}</p>
            <p>{`Email: ${currentForm.email}`}</p>
          </div>
          <SubmitForm data={currentForm}/>
        </div>
      )
    }}
  </Query>
)

export default FormDraft;