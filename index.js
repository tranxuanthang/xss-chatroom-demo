const fastify = require('fastify')({ logger: true });
const path = require('path');
const sqlite = require('better-sqlite3');
const db = new sqlite('chat.db');

// Create table
const createTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

db.exec(createTable);

// Register view plugin
fastify.register(require('@fastify/view'), {
  engine: {
    ejs: require('ejs'),
  },
  root: path.join(__dirname, 'views'),
});

// Define routes
fastify.get('/', async (req, reply) => {
  const getMessages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  return reply.view('/index.ejs', { messages: getMessages });
});

fastify.get('/api/get-messages', async (req, reply) => {
  const getMessages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  return reply.send(getMessages);
});

fastify.post('/api/send-message', async (req, reply) => {
  const { name, message } = req.body;
  const insert = db.prepare('INSERT INTO messages (name, message) VALUES (?, ?)');
  insert.run(name, message);
  return reply.send({ status: 'ok' });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
