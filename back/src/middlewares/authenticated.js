require('dotenv').config();
const { verify } = require('jsonwebtoken');

const checkJWTSign = async (req, res, next) => {
  const { header: { authorization } } = req;
  if (authorization) {
    const token = authorization.split(' ')[1];

    verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) {
        return res.status(403).send({
          message: 'Пользователь не авторизован'
        });
      }

      req.user = user;
      next();
    })
  }

  return res.status(403).send({
    message: 'Пользователь не авторизован'
  });
};

module.exports = checkJWTSign;