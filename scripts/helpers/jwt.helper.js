const jwt = require('jsonwebtoken');

const createLoginToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      type: user.type,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '24h',
    }
  );
  res.header('token', token);

  return token;
};

module.exports = { createLoginToken };
