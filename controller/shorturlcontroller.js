
const URL = require('../model/shortUrl');

const getAllShortUrls = async (req, res) => {
  try {
    const shortUrls = await URL.find();
    res.render('/users/profile', { shortUrls });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const createShortUrl = async (req, res) => {
  try {
    await URL.create({ full: req.body.fullUrl });
    res.redirect('/users/profile');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const redirectToFullUrl = async (req, res) => {
  try {
    const shortUrl = await URL.findOne({ short: req.params.shortUrl });
    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    await shortUrl.save();
    res.redirect(shortUrl.full);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllShortUrls,
  createShortUrl,
  redirectToFullUrl,
};


