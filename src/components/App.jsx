import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Contacts from './Contacts.jsx';
import Form from './Form.jsx';
import FormDraft from './FormDraft.jsx';

const App = () => (
  <div className="app">
    <Contacts />
    <form className="form">
      <div className="inputsContainer">
        <Form />
      </div>
      <FormDraft />
    </form>
  </div>
)

export default App;
