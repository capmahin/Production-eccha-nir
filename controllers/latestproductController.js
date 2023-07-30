import slugify from "slugify";
import latestproductModel from "../models/latestproductModel.js";
import categoryModel from '../models/categoryModel.js'
import fs from 'fs';

export const createLatestProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
            case !description:
                return res.status(500).send({error:'Description required'})
            case !price:
                return res.status(500).send({error:'Price required'})
            case !category:
                return res.status(500).send({error:'Category required'})
            case !quantity:
                return res.status(500).send({error:'Quantity required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = new latestproductModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product Created Successfully',
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Create Product',
            error,
        })
    }
};

//getProductController

export const getLatestProductController = async(req,res)=>{
    try {
        const products = await latestproductModel.find({}).populate("category").select("-photo").limit(20).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'All Products',
            
            products,
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get products',
            error,
        })
    }
};

//getSingleProductController

export const getSingleLatestProductController = async(req,res)=>{
    try {
        const product = await latestproductModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:'Single product fetched',
            product,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get single products',
            error,
        })
    }
};

//get productPhotoController

export const LatestProductPhotoController = async(req,res)=>{
    try {
        const product = await latestproductModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get photo',
            error,
        })
    }
};

//deleteProductController

export const deleteLatestProductController = async(req,res)=>{
    try {
        await latestproductModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:'Successfully Product Deleted',
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting product',
            error,
        })
    }
};

//updateProductController

export const updateLatestProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
            case !description:
                return res.status(500).send({error:'Description required'})
            case !price:
                return res.status(500).send({error:'Price required'})
            case !category:
                return res.status(500).send({error:'Category required'})
            case !quantity:
                return res.status(500).send({error:'Quantity required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await latestproductModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
          );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product Updated Successfully',
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Update Product',
            error,
        })
    }
};

// // filters
// export const productFiltersController = async (req, res) => {
//     try {
//       const { checked, radio } = req.body;
//       let args = {};
//       if (checked.length > 0) args.category = checked;
//       if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
//       const products = await productModel.find(args);
//       res.status(200).send({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "Error WHile Filtering Products",
//         error,
//       });
//     }
//   };
  
//   // product count
//   export const productCountController = async (req, res) => {
//     try {
//       const total = await productModel.find({}).estimatedDocumentCount();
//       res.status(200).send({
//         success: true,
//         total,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         message: "Error in product count",
//         error,
//         success: false,
//       });
//     }
//   };
  
//   // product list base on page
//   export const productListController = async (req, res) => {
//     try {
//       const perPage = 10;
//       const page = req.params.page ? req.params.page : 1;
//       const products = await productModel
//         .find({})
//         .select("-photo")
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .sort({ createdAt: -1 });
//       res.status(200).send({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "error in per page ctrl",
//         error,
//       });
//     }
//   };

//   // search product
// export const searchProductController = async (req, res) => {
//     try {
//       const { keyword } = req.params;
//       const resutls = await productModel
//         .find({
//           $or: [
//             { name: { $regex: keyword, $options: "i" } },
//             { description: { $regex: keyword, $options: "i" } },
//           ],
//         })
//         .select("-photo");
//       res.json(resutls);
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "Error In Search Product API",
//         error,
//       });
//     }
//   };
  
//   // similar products
//   export const realtedProductController = async (req, res) => {
//     try {
//       const { pid, cid } = req.params;
//       const products = await productModel
//         .find({
//           category: cid,
//           _id: { $ne: pid },
//         })
//         .select("-photo")
//         .limit(3)
//         .populate("category");
//       res.status(200).send({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "error while getting related product",
//         error,
//       });
//     }
//   };
  
//   // get prdocyst by catgory
//   export const productCategoryController = async (req, res) => {
//     try {
//       const category = await categoryModel.findOne({ slug: req.params.slug });
//       const products = await productModel.find({ category }).populate("category");
//       res.status(200).send({
//         success: true,
//         category,
//         products,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         error,
//         message: "Error While Getting products",
//       });
//     }
//   };
