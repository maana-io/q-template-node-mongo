const mongoose = require('mongoose');
const { uniqueId, project, rename } = require('../util');

// --- Schema

const Foo = require('./Foo');

const models = {
  Foo
};

// --- Mongoose client

// Setup Mongoose Promises.
mongoose.Promise = global.Promise;

const startDB = args => {
  const { user, pwd, url, db } = args;
  mongoose.connect(
    `mongodb://${user}:${pwd}@${url}/${db}`,
    {
      useNewUrlParser: true
    },
    error => {
      if (error) {
        console.log('MongoDB error', error);
        setTimeout(() => startDB(args), 3000);
      }
    }
  );
};

module.exports = {
  models,
  startDB
};
