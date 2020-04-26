import { Router } from 'express';
import controller from './itemController';


const router = Router();

router.route('/all/:column/:direction')
  .get(controller.getAllByUserOrder);

router.route('/one/:column/:direction')
  .post(controller.createOne)
  .put(controller.updateOne);

router.route('/one/:column/:direction/:id')
  .delete(controller.deleteOne);


export default router;