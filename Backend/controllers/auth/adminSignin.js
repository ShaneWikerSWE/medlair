const Admin = require('../../models/admin');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

module.exports = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    // Fetch user with phone number.
    const admin = await Admin.findByName(name);
    // Send an error if the admin not exist.
    if (admin[0].length == 0) {
      const error = new Error('Admin Not Found.');
      error.statusCode = 401;
      throw error;
    }
    // Check if password right
    if (admin[0][0].password !== password) {
      const error = new Error('Password wrong.');
      error.statusCode = 401;
      throw error;
    }
    // Create admin token
    const token = jwt.sign(
      {
        adminId: admin[0][0].id,
      },
      process.env.ADMIN_SECRET,
      {
        expiresIn: '3d',
      }
    );
    // Send Response
    res.status(200).json({
      token,
      expiresIn: (3 * 24 * 60 * 60).toString(),
    });
  } catch (err) {
    next(err);
  }
};
