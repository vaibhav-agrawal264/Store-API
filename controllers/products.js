
const Products=require('../models/product')

const getAllProductStatic=async (req,res)=>{
   const product=await Products.find({}).select('name')
    res.status(200).json({product})
}

const getAllProduct=async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilter}=req.query
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
    console.log(numericFilter)
    if(numericFilter){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /(>=|<=|>|<|=)/g
        let filters=numericFilter.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const options=['price','rating']
        filters=filters.split(',').forEach((item) => {
            const [field,operator,value]=item.split('-')
            if(options.includes(field)){
                queryobject[field]={[operator]:Number(value)}
            }
        })
    }
    console.log(queryobject)

    let result= Products.find(queryobject)
    if(sort){
        const sortlist=sort.split(',').join(' ')
        result=result.sort(sortlist)
    }
    if(fields){
        const fieldsList=fields.split(',').join(' ')
        result=result.select(fieldsList)
    }
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10
    const skip=(page-1)*limit
    result=result.skip(skip).limit(limit)
    const product = await result

    res.status(200).json({product,nbHits:product.length})
}

module.exports={
    getAllProduct,
    getAllProductStatic
}