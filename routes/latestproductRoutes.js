import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import formidable from 'express-formidable';
import { LatestProductPhotoController, createLatestProductController, deleteLatestProductController, getLatestProductController, getSingleLatestProductController, updateLatestProductController } from "../controllers/latestproductController.js";

const router = express.Router();

//routes

//create LatestProduct
router.post('/create-latestproduct', requireSignIn,isAdmin,formidable(), createLatestProductController);
//Update product
router.put('/update-latestproduct/:pid', requireSignIn,isAdmin,formidable(), updateLatestProductController);

//get products
router.get('/get-latestproduct',getLatestProductController);

//single products

router.get('/get-latestproduct/:slug',getSingleLatestProductController);

//get photo
router.get('/latestproduct-photo/:pid',LatestProductPhotoController);

//delete product
router.delete('/delete-latestproduct/:pid',deleteLatestProductController);

// //filter product
// router.post("/product-filters", productFiltersController);

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

// //search product
// router.get("/search/:keyword", searchProductController);

// //similar product
// router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);

export default router;