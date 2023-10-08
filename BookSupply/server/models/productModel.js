const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    creatorId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        required:true,
    },
    name:{
        type:String,
        required:[true, "Please Enter product Name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true, "Please Enter product Description"],
    },
    price:{
        type:Number,
        required:[true, "Please Enter product Price"],
        maxLength:[6, "Price cannot exceed 6 characters"],
    },
    //average rating
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        }
    ],
    
    category:{
        type:String,
        required:[true, "Please enter product Category"],

    },
    subcategory:{
        type:String,
        required:[true, "Please enter product Sub-Category"],
    },
    stock:{
        type:Number,
        required:[true, "Please enter product Stock"],
        maxLength:[4, "Stock cannot exceed 4 characters"],
        default:1,
    },
    numOfReview:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    height:{
        type:Number,
        required:true,
    }
    ,
    width:{
        type:Number,
        required:true,
    },
    length:{
        type:Number,
        required:true,
    }
    
})


module.exports = mongoose.model("Product", productSchema);