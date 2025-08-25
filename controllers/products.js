
const getAllProduct=async (req,res)=>{
    res.status(200).json({msg:'Product testing route'})
}

const getAllProductStatic=async (req,res)=>{
    throw new Error('Testing error')
    res.status(200).json({msg:'Static product testing route'})
}

module.exports={
    getAllProduct,
    getAllProductStatic
}