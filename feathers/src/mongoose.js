const mongoose = require('mongoose');
const logger = require('./logger');
const grid = require('gridfs-stream');

module.exports = function(app) {

  mongoose
    .connect(app.get('mongodb'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  const dbconnection = mongoose.connection;

  dbconnection.once('open', () => {
    const gfs = grid(dbconnection.db, mongoose.mongo);
    app.set('gfs', gfs);
  });
  
  app.set('mongooseClient', mongoose);

};
