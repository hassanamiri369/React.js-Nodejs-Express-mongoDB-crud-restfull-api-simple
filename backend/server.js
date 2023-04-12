const express = require('express');

const app = express()


const mongoose = require('mongoose')

const Product = require("./models/productModel")

// این برای اینه که دیتایی ک از سمت کلاینت میاد پارس بشه 
// چون به صورت دیفالت اکسپرس دیتای ارسالی از سمت کلاینت رو پارس نمیکنه 
app.use(express.json())



// این رو هم موقع اپدیت کردن اضافه کردم 
app.use(express.urlencoded({extended : false}))

// routes
app.get('/' , (req , res)=>{
    res.send("hello node api")
})


app.get('/blog' , (req , res)=>{
    res.send("hello blog page")
})



// get all product
app.get("/products" , async(req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})



// get one product by id
app.get("/products/:id" , async(req , res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})



// update a product
app.put("/products/:id" , async(req , res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id , req.body)
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message : `cannot find any product wit id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }

    catch(error){
        res.status(500).json({message : error.message})
    }
})






app.post('/products' , async (req , res) =>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})



app.delete("/products/:id" , async(req , res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message : `cannot find any product wit id ${id}`})
        }
        res.status(200).json(product)
    }

    catch(error){
        res.status(500).json({message : error.message})
    }
})



mongoose.set("strictQuery" , false)
mongoose.connect("mongodb+srv://admin:adminApi1234@adminapi.tztw4gv.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('connected to database');
    
app.listen(8000 , ()=>{
    console.log(`node api app is running on port 8000`)
})
})
.catch((error) => {
    console.log(error);
})