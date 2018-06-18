import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, graphql} from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import App from './components/App.jsx';
import resolvers from './resolvers.jsx';


const cache = new InMemoryCache();

const defaultState = {
  currentForm: {
    __typename: 'CurrentForm',
    firstName: '',
    middleName: '',
    lastName: '',
    number: '',
    email:'',
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: resolvers
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'http://192.168.29.248:8000/graphql'
    })
  ]),
  cache
})

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));