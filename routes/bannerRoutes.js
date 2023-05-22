import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';
import { bannerPhotoController, createBannerController, deleteBannerController, getBannerController, getSingleBannerController, updateBannerController } from "../controllers/bannerController.js";


const router = express.Router();

//routes

//create banner
router.post('/create-banner', requireSignIn,isAdmin,formidable(), createBannerController);
//Update product
router.put('/update-banner/:pid', requireSignIn,isAdmin,formidable(), updateBannerController);

//get products
router.get('/get-banner',getBannerController);

//single products

router.get('/get-banner/:slug',getSingleBannerController);

//get photo
router.get('/banner-photo/:pid',bannerPhotoController);

//delete product
router.delete('/delete-banner/:pid',deleteBannerController);

export default router;