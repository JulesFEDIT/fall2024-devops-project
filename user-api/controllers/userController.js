const redisClient = require('../redis-connection');

// Create a new user
exports.createUser = async (req, res) => {
  console.log('Redis client:', redisClient);
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: 'ID, name, and email are required' });
  }

  try {
    const user = { id, name, email };
    await redisClient.set(`user:${id}`, JSON.stringify(user));
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await redisClient.get(`user:${id}`);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(JSON.parse(userData));
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user', details: err.message });
  }
};

// Update a user's details
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: 'At least one field (name or email) must be provided for update' });
  }

  try {
    const userData = await redisClient.get(`user:${id}`);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = JSON.parse(userData);

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Save updated user back to Redis
    await redisClient.set(`user:${id}`, JSON.stringify(user));
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await redisClient.del(`user:${id}`);
    if (result === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};
