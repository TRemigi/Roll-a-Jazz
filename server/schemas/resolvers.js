const { User, Card } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("Card");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("Card");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },
    helloWorld: () => {
      return "Hello World";
    },
    // CARD
    card: async (parent, { _id }) => {
      return Card.findOne({ id: _id }).select("-__v");
    },

    // CARDS
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    // ADD CARD
    addCard: async (parent, args) => {
      const card = await Card.create(args);
      return { card };
    },

    // UPDATE CARD

    // DELETE CARD
  },
};

module.exports = resolvers;
