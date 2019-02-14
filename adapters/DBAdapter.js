const mysql = require('mysql');

class DBAdapter {
  constructor(host, user, password) {
    const connection = mysql.createConnection({
      host,
      user,
      password,
      database : 'juliana-renato',
    });

    connection.connect((err) => {
      if (err) {
        throw err;
      }

      console.log('Connected to DB...');
    });

    this.connection = connection;
  }

  closeConnection() {
    this.connection.end();
  }

  getAllGuests() {
    const query = 'SELECT `id`, `name`, `rsvp`, `comments` FROM guests ORDER BY `name` LIMIT 500;';

    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results.map(item => ({
          ...item,
          rsvp: !!item.rsvp,
          comments: item.comments ? item.comments : '',
        })));
      });
    });
  }
}

module.exports = DBAdapter;
