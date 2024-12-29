const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Connect to Redis
client.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection error:', err));

// Create a new user
exports.createUser = async (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ error: 'ID, name, and email are required' });
  }

  try {
    await client.hSet(`user:${id}`, { id, name, email });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await client.hGetAll(`user:${id}`);
    if (Object.keys(user).length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user', details: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const userExists = await client.exists(`user:${id}`);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    await client.hSet(`user:${id}`, { name, email });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await client.del(`user:${id}`);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};
