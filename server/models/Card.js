const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  logoUrl: {
    type: String,
    unique: true,
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
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
});

const Card = model("Card", cardSchema);

module.exports = Card;
