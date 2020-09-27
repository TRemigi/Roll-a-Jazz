const mongoose = require('mongoose');

// the name of the project/website should go in the placeholder.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/placeholder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
