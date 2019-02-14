const DBAdapter = require('./adapters/DBAdapter');

const getResponse = async (dbAdapter, guestId, rsvp, comments) => {
  const affectedRows = await dbAdapter.setGuestPreferences(guestId, rsvp, comments);
  return {
    affectedRows,
  }
};

exports.handler = async (event, context, callback) => {
  const dbAdapter = new DBAdapter(
    process.env.db_host,
    process.env.db_user,
    process.env.db_password,
  );

  const response = await getResponse(dbAdapter, event.guestId, event.rsvp, event.comments);

  dbAdapter.closeConnection();

  callback(null, response);
};
