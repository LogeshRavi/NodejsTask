const mongoose = require('mongoose')

const orderProductSchema = mongoose.Schema({

    productId:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productBrand:{
        type:String,
        required:true,
    },
    productCost:{
        type:String,
        required:true,
    },
    productOrderBy:{
        type:String,
    },
    productOrderAt:{
        type:String
    }
    
})
module.exports=mongoose.model('orders',orderProductSchema)