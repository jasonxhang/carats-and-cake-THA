const localDefaultMongo = 'mongodb://localhost:27017/carats-and-cake-app';

const configOptions = {
  mongoURL: process.env.ATLAS_URI || localDefaultMongo,
  redisAddr: 'redis://localhost:6379/0',
  port: process.env.PORT || 8000,
};

module.exports = configOptions;
