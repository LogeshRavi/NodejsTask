const mongoose = require('mongoose')

const adminaccountSchema = mongoose.Schema({

    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    UserName:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
    },

})
module.exports=mongoose.model('adminaccount',adminaccountSchema)