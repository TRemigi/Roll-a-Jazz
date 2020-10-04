const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  logoUrl: {
    type: String,
    unique: false
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
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  username: {
    type: String,
    required: true
  },
},
  {
    toJSON: {
      getters: true
    }
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;
