const boom = require('boom');

const creatCrud = (model) => ({

  async get({ params: { id } }, res, req) {
    try {
      const user = await model.findById(id);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(boom.boomify(error));
    }
  },

  async create({ body }, res, req) {
    try {
      const user = new model(body);
      const newUser = user.save();
      return res.status(200).send(newUser);
    } catch (error) {
      return res.status(400).send(boom.boomify(error));
    }
  }

});

module.exports = creatCrud;