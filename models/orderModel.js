import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    serial:{
        type:Number,
        required:true
    },


    // pobox:{
    //     type:Number,
    //     required:true
    // },
    // bkash:{
    //     type:Number,
    //     required:true
    // },

    
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    currieraddress:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    
    shipping:{
        type:Boolean
    }

},{timestamps:true})

export default mongoose.model('Orders', orderSchema)