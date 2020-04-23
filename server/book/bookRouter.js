const Router = require('express').Router();
const controller = require('./bookController');
// require('../../database/index');


Router.route('/one')
  .get(controller.getOne)
  .post(controller.createOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

Router.route('/many')
  .get(controller.getMany);

// to get all of both books and magazines on load
Router.route('/all')
  .get(controller.getAll);


module.exports = Router;