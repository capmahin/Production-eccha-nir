import slugify from "slugify";
import orderModel from "../models/orderModel.js";
import categoryModel from '../models/categoryModel.js'
import fs from 'fs';

export const createOrderController = async(req,res)=>{
    try {
        const {name,slug,email,phone,bkash,category,quantity,shipping, address, currieraddress, size,serial,pobox} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
            case !email:
                return res.status(500).send({error:'email required'})
            case !phone:
                return res.status(500).send({error:'phone required'})
            case !bkash:
                return res.status(500).send({error:'bkash required'})
            case !category:
                return res.status(500).send({error:'Category required'})
            case !quantity:
                return res.status(500).send({error:'Quantity required'})
            case !address:
                return res.status(500).send({error:'address required'})
            case !currieraddress:
                return res.status(500).send({error:'currieraddress required'})
            case !size:
                return res.status(500).send({error:'size required'})
            case !serial:
                return res.status(500).send({error:'serial required'})
            case !pobox:
                return res.status(500).send({error:'pobox required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = new orderModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Order Created Successfully',
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Create Order',
            error,
        })
    }
};

//getOrderController

export const getOrderController = async(req,res)=>{
    try {
        const products = await orderModel.find({}).populate("category").select("-photo").limit(20).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'All Orders',
            
            products,
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get orders',
            error,
        })
    }
};

//getSingleOrderController

export const getSingleOrderController = async(req,res)=>{
    try {
        const product = await orderModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:'Single order fetched',
            product,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get single orders',
            error,
        })
    }
};

//get orderPhotoController

export const orderPhotoController = async(req,res)=>{
    try {
        const product = await orderModel.findById(req.params.pid).select("photo");
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

//deleteOrderController

export const deleteOrderController = async(req,res)=>{
    try {
        await orderModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:'Successfully Order Deleted',
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting order',
            error,
        })
    }
};

//updateOrderController

export const updateOrderController = async(req,res)=>{
    try {
        const {name,slug,email,phone,bkash,category,quantity,shipping, address, currieraddress, size,serial,pobox} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
            case !email:
                return res.status(500).send({error:'email required'})
            case !phone:
                return res.status(500).send({error:'phone required'})
            case !bkash:
                return res.status(500).send({error:'bkash required'})
            case !category:
                return res.status(500).send({error:'Category required'})
            case !quantity:
                return res.status(500).send({error:'Quantity required'})
            case !address:
                return res.status(500).send({error:'address required'})
            case !currieraddress:
                return res.status(500).send({error:'currieraddress required'})
            case !size:
                return res.status(500).send({error:'size required'})
                case !serial:
                    return res.status(500).send({error:'serial required'})
                case !pobox:
                    return res.status(500).send({error:'pobox required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await orderModel.findByIdAndUpdate(
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
            message:'Orders Updated Successfully',
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Update Order',
            error,
        })
    }
};

