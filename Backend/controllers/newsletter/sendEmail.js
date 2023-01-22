const Newsletter = require('../../models/newsletter');
const nodeMailer = require('../../helpers/nodemailer');

module.exports = async (req, res, next) => {
  const { subject, html } = req.body;

  try {
    if (subject.length === 0 || html.length === 0) {
      const error = new Error('Subject And Content Can not be empty.');
      error.statusCode = 422;
      throw error;
    }
    const emails = await Newsletter.find();

    emails[0].forEach((e) => nodeMailer(subject, html, e.email));

    res.status(201).json({
      msg: 'Emails Sent Successfully.',
    });
  } catch (err) {
    next(err);
  }
};
