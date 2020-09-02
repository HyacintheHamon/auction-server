const { createConnection } = require('mongoose');

// const uristring = process.env.MONGOLAB_URI ||
//  process.env.MONGOHQ_URL ||
//  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`

  const uristring =  `mongodb://localhost:27017/realtime`
  //const uristring =  `mongodb://localhost:27017/realtime?compressors=disabled&gssapiServiceName=mongodb`
const db = createConnection(uristring, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports = db;
