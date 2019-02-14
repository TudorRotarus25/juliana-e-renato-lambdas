const DBAdapter = require('./adapters/DBAdapter');

const getResponse = async (dbAdapter) => {
  const guests = await dbAdapter.getAllGuests();

  return {
    guests,
  };
};

exports.handler = async (event, context, callback) => {
  const dbAdapter = new DBAdapter(
    process.env.db_host,
    process.env.db_user,
    process.env.db_password,
  );

  const response = await getResponse(dbAdapter);

  dbAdapter.closeConnection();

  callback(null, response);
};
