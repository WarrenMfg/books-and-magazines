import { Router } from 'express';
import controller from './itemController';


const router = Router();

router.route('/all/:column/:direction')
  .get(controller.getAllByUserOrder);

router.route('/one/:column/:direction')
  // .get(controller.getOne) // not used
  .post(controller.createOne)
  .put(controller.updateOne);

router.route('/one/:column/:direction/:id')
  .delete(controller.deleteOne);


// router.route('/many') // not used
//   .get(controller.getMany);

// router.route('/all')
//   .get(controller.getAll);



export default router;