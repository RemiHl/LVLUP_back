require('dotenv').config();

const verifyAdminKey = (req, res, next) => {
  const key = req.headers['x-admin-key'];

  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  next();
};

module.exports = verifyAdminKey;