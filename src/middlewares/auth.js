const jwt = require('jsonwebtoken');

const secret = 'mysecretkey';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;