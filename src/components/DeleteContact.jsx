import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Remove_Contact from '../graphql/removeContact.jsx';

const  DeleteContact = ({id}) => (
  <Mutation mutation={Remove_Contact}>
    {(removeContact, { data }) => (
      <button onClick={() => {
        removeContact({variables:{id:id}})
        console.log(document.getElementById(id).classList.toggle('hide'));
      }}>Remove Contact</button>
    )}
  </Mutation>
);

export default DeleteContact;
