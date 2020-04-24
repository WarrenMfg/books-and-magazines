const Router = require('express').Router();
const controller = require('./itemController');


Router.route('/one')
  .get(controller.getOne) // not used
  .post(controller.createOne)
  .put(controller.updateOne);

Router.route('/one/:id')
  .delete(controller.deleteOne);

Router.route('/many') // not used
  .get(controller.getMany);

Router.route('/all')
  .get(controller.getAll);

Router.route('/all/:column/:direction')
  .get(controller.getAllByUserOrder);


module.exports = Router;