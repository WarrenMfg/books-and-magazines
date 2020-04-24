const Router = require('express').Router();
const controller = require('./itemController');


Router.route('/one')
  .get(controller.getOne)
  .post(controller.createOne)
  .put(controller.updateOne);

Router.route('/one/:id')
  .delete(controller.deleteOne);

Router.route('/many')
  .get(controller.getMany);

Router.route('/all')
  .get(controller.getAll);


module.exports = Router;