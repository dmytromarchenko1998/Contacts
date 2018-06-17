import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.29.248:8000/graphql'}),
  cache: cache,
})

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));