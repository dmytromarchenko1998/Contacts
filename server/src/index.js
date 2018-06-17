const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    contacts: (_, args, context, info) => {
      return context.prisma.query.contacts(
        {
          where: {
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
  }
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))