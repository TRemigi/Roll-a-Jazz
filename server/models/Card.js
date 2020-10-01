const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
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
    unique: false,
  },
  phone: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: false,
    match: [/.+@.+\..+/, "Must match an email address!"],
  }
});

const Card = model("Card", cardSchema);

module.exports = Card;
