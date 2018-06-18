import gql from 'graphql-tag';

module.exports = {
  Mutation: {
    updateForm:(_, { firstName, middleName, lastName, number, email}, { cache }) => {
      const query = gql`
        query GetCurrentForm {
          currentForm @client {
            __typename
            firstName
            middleName
            lastName
            number
            email
          }
        }
      `
      const { currentForm } = cache.readQuery({query});

      const data = {
        currentForm: {
          __typename: currentForm.__typename,
          firstName: firstName || currentForm.firstName,
          middleName: middleName || currentForm.middleName,
          lastName: lastName || currentForm.lastName,
          number: number || currentForm.number,
          email: email || currentForm.email
        }
      }

      cache.writeData({ query, data })
    },
  }
}