import slugify from "slugify";
import bannerModel from "../models/bannerModel.js";
import categoryModel from '../models/categoryModel.js'
import fs from 'fs';

export const createBannerController = async(req,res)=>{
    try {
        const {name,slug,category,} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
                case !category:
                return res.status(500).send({error:'Category required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = new bannerModel({...req.fields, slug:slugify(name)})
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

//getBannerController

export const getBannerController = async(req,res)=>{
    try {
        const products = await bannerModel.find({}).populate("category").select("-photo").limit(20).sort({createdAt:-1});
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

//getSingleBannerController

export const getSingleBannerController = async(req,res)=>{
    try {
        const product = await bannerModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
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

//get bannerPhotoController

export const bannerPhotoController = async(req,res)=>{
    try {
        const product = await bannerModel.findById(req.params.pid).select("photo");
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

export const deleteBannerController = async(req,res)=>{
    try {
        await bannerModel.findByIdAndDelete(req.params.pid).select("-photo");
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

export const updateBannerController = async(req,res)=>{
    try {
        const {name,slug,category,} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
                case !category:
                    return res.status(500).send({error:'Category required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await bannerModel.findByIdAndUpdate(
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


