const mongoose = require('mongoose');

const db = mongoose.connection;

db.on("error", error => {
  console.log("error", error);
});

module.exports = {
  db,
  connect: async () => {
    try {
      await mongoose.connect(process.env.DB_LOCATION, {
        autoIndex: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      });
      console.log('Mongo')
    } catch (err) {
      console.log("Can not connect to mongo server. Error:");
      console.log(err);
      process.exit(1);
    }
  },
  close: async () => {
    try {
      await mongoose.disconnect();
    } catch (err) {
      console.log("Can not disconnect to mongo server.", err)
    }
  }
};