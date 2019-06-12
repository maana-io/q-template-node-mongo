// --- GraphQL resolvers

const resolver = {
  Query: {
    foo: async (_, { name }, { models }) => models.Foo.find({ name }),
    totalBar: async (_, args, { models }) => {
      const res = await models.Foo.find({});
      return res.reduce((acc, foo) => acc + foo.bar, 0);
    }
  },
  Mutation: {
    createFoo: async (_, fooPrototype, { models }) => models.Foo.create(fooPrototype),
    deleteFoo: async (_, fooFilter, { models }) => models.Foo.findOneAndDelete(fooFilter)
  }
};

exports.resolver = resolver;
