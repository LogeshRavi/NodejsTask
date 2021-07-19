const mongoose = require('mongoose')

const addProductSchema = mongoose.Schema({

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
    productAddBy:{
        type:String,
    
    },


})

module.exports=mongoose.model('Products',addProductSchema)
