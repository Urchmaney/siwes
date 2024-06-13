const { connect, connection } = require('mongoose');

const studentService = require('./studentService');
const placementRequestService = require('./placmentRequestService');

const mongoConnect = async (URI) => {
  await connect(URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    err => {
      if (err) {
        process.exit(1);
      }
    });
  return {
    studentService,
    placementRequestService,
    closeConnect: () => connection.close(),
  };
};

module.exports = mongoConnect;