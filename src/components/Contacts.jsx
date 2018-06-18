import React from 'react';
import { Query, Mutation } from 'react-apollo';
import getAllContacts from '../graphql/getAllContacts.jsx';

const Contacts = () => (
  <Query query={getAllContacts} >
    {({ data, error, loading }) => {
      if (error) return '💩 Oops!';
      if (loading) return 'loading';
      return (
        data.contacts.map(({ firstName, middleName,lastName, number, email, id}) => (
          <div className="contact" id={id}>
            <p>{`${firstName} ${middleName || ''} ${lastName}`}</p>
            <p>{number}</p>
            <p>{email}</p>
          </div>
        ))
      );
    }}
  </Query>
);

export default Contacts;