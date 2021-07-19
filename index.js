const express = require('express')
const app=express();
const mongoose=require('mongoose');
const morgan = require('morgan')
const cors=require('cors')
const admin=require('./routes/admin')
const user = require('./routes/user')

app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

app.use('/admin',admin);
app.use('/user',user)


mongoose.connect('mongodb+srv://demo:E8wxFGqeJz0VkKWm@cluster0.jrdfh.mongodb.net/infoware?retryWrites=true&w=majority',
                 {useNewUrlParser: true,
                     useUnifiedTopology: true});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);

});
