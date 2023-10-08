

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    shippingInfo:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        address:{
            type:String, 
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String, 
            required:true
        },
        
        zip:{
            type:Number,
            required:true,
            
        },
        phoneNo:{
            type:Number,
            required:true,
        },
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
    }, 
    paidAt:{
        type:Date,
        required:true,

    },
    itemsPrice:{
        type:Number,
        default:0,
        required:true,
    },
    // taxPrice:{
    //     type:Number,
    //     default:0,
    //     required:true,
    // },
    // shippingPrice:{
    //     type:Number,
    //     default:0,
    //     required:true,
    // },
    // totalPrice:{//itemsPrice + taxPrice + shippingprice
    //     type:Number,
    //     default:0,
    //     required:true,
    // },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        required:true,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    quantity:{
        type:Number,
        required:[true, "Please Enter product quantity"],
        maxLength:[6, "Price cannot exceed 6 characters"],
    },
    status:{//shipped or delivered or processed
        type:String,
        required:true
    }
})


module.exports = mongoose.model("Order", orderSchema);