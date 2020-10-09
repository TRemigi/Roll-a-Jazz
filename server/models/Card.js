const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    logoUrl: {
      type: String,
      unique: false,
    },
    companyName: {
      type: String,
    },
    tagline: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;
