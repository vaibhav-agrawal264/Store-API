
const Products=require('../models/product')

const getAllProductStatic=async (req,res)=>{
   const product=await Products.find({
    name:"accent chair"
   })
    res.status(200).json({product})
}

const getAllProduct=async (req,res)=>{
    const {featured,company,name}=req.query
    const queryobject={}
    if(featured){
        queryobject.featured = featured==='true'?true:false
    }
    if(company){
        queryobject.company = company
    }
    if(name){
        queryobject.name = {$regex:name,$options:'i'}
    }
    const product=await Products.find(queryobject)
    res.status(200).json({product,nbHits:product.length})
}

module.exports={
    getAllProduct,
    getAllProductStatic
}