const express = require('express')
const Category = require('../models/categories')
const Authentication = require('../middleware/auth')('admin')


const router = express.Router()


router.post('/AddCategory',Authentication,async (req,res) =>{
    try {
        const data =req.body
        const category = new Category(data)
        await category.save()
        res.send(category)
    } catch (error) {
        res.send(error)
    }
})
router.get('/GetAllCategories',async (req,res) =>{
    try {
        const categories = await Category.find({})
        res.send(categories)
    } catch (error) {
        res.send(error)
    }
})
router.delete('/DeleteCategory',Authentication,async (req,res) =>{
    try {
        const _id = req.body
        await Category.deleteOne({_id: _id})
        res.send()
    } catch (error) {
        res.send(error)
    }
})


module.exports = router