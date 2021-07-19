const router = require('express').Router();
const Admin = require('../Schema/adminaddacc')
const addProducts=require('../Schema/addproduct')
const orders = require('../Schema/orderProduct')
const jwt = require('jsonwebtoken')

//Add Admin Account
router.post('/addaccount', async (req, res) => {
    try {

        const user = new Admin({
            Name: req.body.Name,
            Email: req.body.Email,
            UserName: req.body.UserName,
            Password: req.body.Password,
            phoneNumber: req.body.phoneNumber,
            Role: "admin"
        })

        var data = await user.save();
        res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Register Successfully", user: user })

    } catch (error) {
        res.status(400).json(error)
    }
})

//Admin Login
router.post('/login', async (req, res) => {

    
    var adminExist = await Admin.findOne({ $or: [{ Email: req.body.Email }, { UserName: req.body.Email }] })
    if (!adminExist) {

        return res.json({ StatusCode: 400, StatusMessage: "Failure", Response: "User Not Found" })
    }

    if (adminExist && adminExist.Password == req.body.Password) {
        var userToken = jwt.sign({ _id: adminExist.id }, 'secretkey')
        res.header('auth', userToken).json({ StatusCode: 200, StatusMessage: "Success", Response: "Login Successfully", token: userToken, user: adminExist })
    }
    else {
        return res.json({ StatusCode: 400, StatusMessage: "Failure", Response: " Password Not Correct" })
    }
})

//Admin Token
const adminToken = (req, res, next) => {
    var token = req.header('auth');
  
    jwt.verify(token, 'secretkey', (err, payload) => {
      if (err) {
  
      }
        //console.log(payload)
      const id = payload
      Admin.findById(id).then(data => {
        req.user = data
        //console.log(req.user)
        next()
      })
    })
  }

//Add Products
  router.post('/addProducts',adminToken, async (req, res) => {

    try {

        const product = new addProducts({
            productId: req.body.productId,
            productName: req.body.productName,
            productBrand: req.body.productBrand,
            productCost: req.body.productCost,
            productAddBy: req.user.UserName,
        })

        var data = await product.save();
        res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Product Added Successfully", product:product })

    } catch (error) {
        res.status(400).json(error)
    }



  })
  
//View Orders by Admin
  router.get('/viewOrders', async (req, res) => {
    const data = orders.find({ }, {}, { sort: { 'productOrderAt': -1 } }, function (req, results) {
        res.send({ StatusCode: 200, StatusMessage: "Success", orderList: results });
      })

})




module.exports = router;
