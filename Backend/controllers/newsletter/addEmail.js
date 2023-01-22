const Newsletter = require('../../models/newsletter');
const validateEmail = require('../../helpers/validateEmail');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const validateResult = validateEmail(email.trim());
  try {
    // Check if validation has any errors.
    if (!validateResult) {
      const error = new Error('Value must be email.');
      error.statusCode = 422;
      throw error;
    }

    // Check if there's email like the email param
    const findEmail = await Newsletter.findByEmail(email);
    if (findEmail[0].length !== 0) {
      const error = new Error('Email already exists in our newsletter.');
      error.statusCode = 409;
      throw error;
    }

    // Save email And send response
    await new Newsletter(email).save();
    res.status(201).json({
      msg: 'Email added to newsletter successfully.',
    });
  } catch (err) {
    next(err);
  }
};
