const mongoose = require('mongoose');
const MONGDB_URL =
  'mongodb+srv://admin:oE4v02Ox91t94FKR@cluster0.r9esu.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(MONGDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
    console.log(error);
  }
}

module.exports = { connect };
