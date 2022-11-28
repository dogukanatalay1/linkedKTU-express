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

// const JWT = require('jsonwebtoken');

// const generateAccessToken = (data) => JWT.sign({ data }, process.env.JWT_ACCESS_SECRET, {
//   expiresIn: process.env.JWT_ACCESS_EXP,
// });

// const generateRefreshToken = (data) => JWT.sign({ data }, process.env.JWT_REFRESH_SECRET, {
//   expiresIn: process.env.JWT_REFRESH_EXP,
// });


// module.exports = {
//   generateAccessToken,
//   generateRefreshToken,
// };
