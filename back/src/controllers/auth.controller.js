require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Token } = require('../models');

module.exports = {  
  
  async register(req, res) {
    try {
      const { name, email, phone, language } = req.body;
      
      const foundUser = await User.findOne({ $or: [{ name }, { email }] });
      if(foundUser) {
        return res.status(403).send({ message: "Пользователь с таким именем или почтой уже существует" });
      } 
  
      const newUser = await new User({ name, email, phone, language });
      // console.log('newUser: ', newUser);
      await newUser.save();
  
      return res.status(200).send({
        message: "Пользователь создан",
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        language: newUser.language
      })  
  
    } catch (error) {
      return res.status(403).send({ message: "Что-то пошло не так" });    
    }
  },

  async login(req, res) {
    try {
      const { name, email} = req.body;

      const foundUser = await User.findOne({ email });  
      if(!foundUser) {
        return res.status(403).send({ message: "Извините, введенные данные не верны" });
      }
  
      const isNameCorrect = foundUser.name == name;  
      if(!isNameCorrect) {
        return res.status(403).send({ message: "Извините, введенные данные не верны" });
      }
      
      const accessToken = jwt.sign({
        userId: foundUser._id,
        email: foundUser.email
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
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
          email: foundUser.email,
          name: foundUser.name,
          phone: foundUser.phone,
          message: "Пользователь авторизован",
          id: foundUser._id
        })
      }
  
      const token = new Token({ token: refreshToken, user: foundUser._id });
      await token.save();      
  
    } catch (error) {
      return res.status(403).send({
        message: "Извините, введенные данные не верны",
        error,
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
        message: 'пользователь не авторизован'
      })
    }

    await Token.findByIdAndDelete(foundToken._id);

    return res.status(200).send({
      message: 'пользователь разлогинен'
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

  async getUser(req, res) {
    try {
      const { userId } = req.body;

      // ищем токен в бд
      const currentToken = await Token.findOne({ user: userId })

      if(!currentToken) {
        return res.status(403).send({ message: 'Пользователь не найден' })
      }

      const foundUser = await User.findOne({ _id: currentToken.user })
      if(!foundUser) {
        return res.status(403).send({ message: 'Пользователь не найден' })
      }

      return res.status(200).send({
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
        message: "Пользователь авторизован",
        id: foundUser._id
      })
      
    } catch (error) {
      return res.status(403).send({
        message: "что-то пошло не так",
        error,
      });
    }
  }

}