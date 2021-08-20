const { getPool } = require('../../db');
const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    const { id } = accessTokenData;
    const { title } = req.body;

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();

    try {
      if (!accessTokenData) {
        res.status(401).send({ message: 'invalid access token' });
      }

      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      const musicalId = musicalData[0].id;
      if (title) {
        const input = await connection.execute(
          `INSERT IGNORE INTO user_musical (user_id, musical_id) VALUES (?, ?)`,
          [id, musicalId]
        );
        await connection.commit();
        connection.release();

        res.status(200).json({ message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
  delete: async (req, res) => {
    // const accessTokenData = checkAccessToken(req);
    // const { id } = accessTokenData;
    const { title } = req.params;
    console.log(title);
    // return res.send('done');
    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();
    try {
      if (!accessTokenData) {
        res.status(401).send({ message: 'invalid access token' });
      }

      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      const musicalId = musicalData[0].id;
      if (title) {
        const deleteBookmark = await connection.execute(
          `DELETE FROM user_musical WHERE user_id = ? AND musical_id = ?`,
          [id, musicalId]
        );
        await connection.commit();
        connection.release();

        res.status(200).json({ message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
