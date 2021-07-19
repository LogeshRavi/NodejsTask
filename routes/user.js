const router = require('express').Router();
const User = require('../Schema/useraddacc')
const browseProducts=require('../Schema/addproduct')
const orders = require('../Schema/orderProduct')
const jwt = require('jsonwebtoken')


// Add User Account 
router.post('/addaccount', async (req, res) => {
    try {

        const user = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            UserName: req.body.UserName,
            Password: req.body.Password,
            phoneNumber: req.body.phoneNumber,
            Role: "User"
        })

        var data = await user.save();
        res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Register Successfully", user: user })

    } catch (error) {
        res.status(400).json(error)
    }
})

// Login User Account
router.post('/login', async (req, res) => {

    var email = req.body.Email
    var userExist = await User.findOne({ $or: [{ Email: req.body.Email }, { UserName: req.body.Email }] })
    if (!userExist) {

        return res.json({ StatusCode: 400, StatusMessage: "Failure", Response: "User Not Found" })
    }

    if (userExist && userExist.Password == req.body.Password) {
        var userToken = jwt.sign({ _id: userExist.id }, 'secretkey')
        res.header('auth', userToken).json({ StatusCode: 200, StatusMessage: "Success", Response: "Login Successfully", token: userToken, user: userExist })
    }
    else {
        return res.json({ StatusCode: 400, StatusMessage: "Failure", Response: " Password Not Correct" })
    }
})

//User Token
const userToken = (req, res, next) => {
    var token = req.header('auth');
  
    jwt.verify(token, 'secretkey', (err, payload) => {
      if (err) {
  
      }
        //console.log(payload)
      const id = payload
      User.findById(id).then(data => {
        req.user = data
        //console.log(req.user)
        next()
      })
    })
  }

  //Browse Product
router.get('/browseProduct', async (req, res) => {

    const product = req.body.Product
    var ProductExist = await browseProducts.findOne({ productName: product })

    if(!ProductExist){
        var brandExist =  await browseProducts.find({ productBrand: product })
        if(!brandExist){
            return res.json({ StatusCode: 400, StatusMessage: "Failure", Response: "No Result Found !!" })
        }
        return res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Browse Product Successfully",Result:brandExist })
    }
    return res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Browse Product Successfully",Result:ProductExist })
  })

  //Order Product
router.post('/orderProduct',userToken, async (req, res) => {
    
    try {

        const order = new orders({
            productId: req.body.productId,
            productName: req.body.productName,
            productBrand: req.body.productBrand,
            productCost: req.body.productCost,
            productOrderBy: req.user.UserName,
            productOrderAt: now
        })

        var data = await order.save();
        res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Product Order Successfully", product:order })

    } catch (error) {
        res.status(400).json(error)
    }

  })

// View Orders
router.get('/viewOrders',userToken, async (req, res) => {
    const data = orders.find({ productOrderBy: req.user.UserName }, {}, { sort: { 'productOrderAt': -1 } }, function (req, results) {
        res.send({ StatusCode: 200, StatusMessage: "Success", orderList: results });
      })

})
module.exports = router;