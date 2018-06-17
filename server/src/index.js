const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const express = require('express');
const path = require('path');

const resolvers = {
  Query: {
    contacts: (_, args, context, info) => {
      return context.prisma.query.contacts(
        {},
        info,
      )
    },
    contact: (_, args, context, info) => {
      return context.prisma.query.contact(
        {
          where: {
            id: args.id,
          },
        },
        info,
      )
    }
  },
  Mutation: {
    newContact: (_, args, context, info) => {
      return context.prisma.mutation.createContact(
        {
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            middleName: args.middleName,
            number: args.number,
            email: args.email,
          },
        },
        info,
      )
    },
    removeContact: (_, args, context, info) => {
      return context.prisma.mutation.deleteContact(
        {
          where: {
            id: args.id,
          },
        },
        info,
      )
    }
  },
}

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, '/schema.graphql'),
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: path.join(__dirname, '/generated/prisma.graphql'),
      endpoint: 'http://localhost:4466',
    }),
  }),
})
// console.log(path.join(__dirname, '../../public'));
server.express.use('/build', express.static(path.join(__dirname, '../../public')));
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))