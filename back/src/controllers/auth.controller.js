require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Token } = require('../models');

module.exports = {
  
  async register({ body: { name, email, phone, language }, res }) {
    try {
      const foundUser = await User.findOne({ email });
  
      if(foundUser) {
        return res.status(403).send({
          message: "Пользователь с такими данными уже существует",
          error
        });
      }
  
      const newUser = await new User({ name, email, phone, language });      
      await newUser.save();
  
      return res.status(200).send({
        message: "Пользователь создан",
      })
  
    } catch (error) {
      return res.status(403).send({
        message: "Извините, введенные данные не верны",
        error
      });    
    }
  },

  async logout({ body: { refreshToken }}, res) {
    //декодируем токен
    // вытаскиваем из токена юзерайди
    // по юзерайди находим рефрештокен
    // удаляем этот рефрештокен
    const foundToken = await Token.findOne({ token: refreshToken });

    if(!foundToken) {
      return status(403).send({
        message: 'пользователб не авторизован'
      })
    }

    await Token.findByIdAndDelete(foundToken._id);

    return res.status(200).send({
      message: 'Юзер разлогинен'
    })

  },
  
  async refreshToken({ body: { refreshToken }}) {
    //првоеряем есть ли токен в запросе
    if(!refreshToken) {
      return status(403).send({
        message: 'пользователб не найден'
      })
    }

    // ищем токен в бд
    const currentToken = await Token.findOne({ token: refreshToken})

    if(!currentToken) {
      return status(403).send({
        message: 'пользователб не найден'
      })
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
      if(err) {
        return status(403).send({
          message: 'пользователб не найден'
        })
      }
      console.log('accessToken: ', accessToken);

      const accessToken = jwt.sign({
        userId: user._id,
        email: user.email
      }, process.env.JWT_SECRET, {
        expiresIn: '1m'
      });

      return res.status(200).send({
        accessToken,
        email: user.email
      })



    })


  },

  async login({ body: { name, email}, res }) {
    try {
      const foundUser = await User.findOne({ email });

      if(!foundUser) {
        return res.status(403).send({
          message: "Извините, введенные данные не верны",
          error
        });
      }

      const isNameCorrect = foundUser.name == name

      if(!isNameCorrect) {
        return res.status(403).send({
          message: "Извините, введенные данные не верны",
          error
        });
      }
      const accessToken = jwt.sign({
        userId: foundUser._id,
        email: foundUser.email
      }, process.env.JWT_SECRET, {
        expiresIn: '1m'
      });

      const refreshToken = jwt.sign({
        userId: foundUser._id,
        email: foundUser.email
      }, process.env.JWT_SECRET_REFRESH);

      const foundToken = await Token.findOne({
        user: foundUser._id
      });

      if(foundToken) {
        await Token.findByIdAndUpdate(foundToken._id, { token: refreshToken });

        return res.status(200).send({
          accessToken,
          refreshToken,
          email: foundUser.email
        })
      }

      const token = new Token({ token: refreshToken, user: foundUser._id });
      await token.save();

      

    } catch (error) {
      return res.status(403).send({
        message: "Извините, введенные данные не верны",
        error
      });    
    }
  },

}