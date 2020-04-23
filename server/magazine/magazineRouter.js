const Router = require('express').Router();
const controller = require('./magazineController');
// require('../../database/index');


Router.route('/one')
  .get(controller.getOne)
  .post(controller.createOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne)


Router.route('/many')
  .get(controller.getMany);


module.exports = Router;