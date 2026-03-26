const express = require('express');
const cors = require('cors');
const { Low, JSONFile } = require('lowdb');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbFile = 'db.json';
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data ||= { users: [], messages: [] };
  await db.write();
}

// Register user
app.post('/api/register', async (req, res) => {
  await db.read();
  const { name, email, phone, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const found = db.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    userType,
    createdAt: new Date().toISOString()
  };

  db.data.users.push(newUser);
  await db.write();

  res.json({ user: { ...newUser, password: undefined } });
});

// Login user
app.post('/api/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const user = db.data.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email/password' });
  }
  res.json({ user: { ...user, password: undefined } });
});

// Send message
app.post('/api/messages', async (req, res) => {
  await db.read();
  const { senderId, receiverId, message, productId } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newMessage = {
    id: Date.now(),
    senderId,
    receiverId,
    message,
    productId: productId || null,
    timestamp: new Date().toISOString(),
    read: false
  };

  db.data.messages.push(newMessage);
  await db.write();

  res.json({ message: newMessage });
});

// Get messages for user
app.get('/api/messages', async (req, res) => {
  await db.read();
  const userId = Number(req.query.userId);
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userMessages = db.data.messages.filter(m => m.senderId === userId || m.receiverId === userId);
  res.json({ messages: userMessages });
});

// Get users (for resolving buyer/seller)
app.get('/api/users', async (req, res) => {
  await db.read();
  const users = db.data.users.map(u => ({ ...u, password: undefined }));
  res.json({ users });
});

initDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
});
