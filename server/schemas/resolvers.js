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
      return await User.find().select("-__v -password").populate("createdCards");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },

    helloWorld: () => {
      return "Hello World";
    },

    card: async (parent, { _id }) => {
      const card = await Card.find({ _id: _id }).select("-__v");
      return card;
    },

    // CARDS
    cards: async () => {
      return await Card.find().select("-__v");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).select("-__v");
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

    addCard: async (parent, args, context) => {
      const card = await Card.create({ ...args, username: context.user._id });
      return card;
    },

    updateCard: async (parent, { _id, input }, context) => {
      // if user is logged in: find card by id, update specified card fields by user input,
      // and return updated card, else return an error
      if (context.user) {
        const updatedCard = await Card.findOneAndUpdate({ _id: _id }, input, {
          new: true,
        });
        return updatedCard;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteCard: async (parent, { _id }, context) => {
      if (context.user) {
        const removedCard = await Card.findOneAndDelete({ _id: _id });
        return removedCard;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
