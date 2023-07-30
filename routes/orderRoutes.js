import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';
import { createOrderController, deleteOrderController, getOrderController, getSingleOrderController, orderPhotoController, updateOrderController } from "../controllers/orderController.js";

const router = express.Router();
//create order
router.post('/create-order', requireSignIn,formidable(), createOrderController);
// //Update product
router.put('/update-order/:pid', requireSignIn,isAdmin,formidable(), updateOrderController);

//get orders
router.get('/get-order',getOrderController);

//get photo
router.get('/order-photo/:pid',orderPhotoController);

//delete order
router.delete('/delete-order/:pid',deleteOrderController);

//single orders

router.get('/get-orders/:slug',getSingleOrderController);
export default router;