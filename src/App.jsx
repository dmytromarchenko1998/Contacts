import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    contacts {
      firstName
    }
  }
`;

const ContactList = () => (
  <Query query={QUERY} >
    {({ data, error, loading }) => {
      if (error) return '💩 Oops!';
      if (loading) return 'loading';
      console.log(data);

      return (
        <h1>{data.contacts[0].firstName}</h1>
      );
    }}
  </Query>
);

const App = () => <ContactList />;

export default App;


// import React, { Component } from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
