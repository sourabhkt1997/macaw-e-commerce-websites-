
let express=require("express")
let productrouter=express.Router()
let {ProductModel}=require("../model/productmodel")


productrouter.post("/addproduct",async(req,res)=>{
    
    try{
        let data=new ProductModel(req.body)
        await data.save()
        res.status(400).send({'messgae':"new product added"})
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})
    }
})

// productrouter.get("/",async(req,res)=>{
//     try{
//        let data= await ProductModel.find()
//        res.status(200).send(data)
//     }
//     catch(err){
//         res.status(400).send({'messgae':err.messgae})  
//     }
// })

productrouter.get("/:id",async(req,res)=>{
    let {id}=req.params
    try{
       let data= await ProductModel.find({_id:id})
       res.status(200).send(data)
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})  
    }
})

productrouter.get("/",async(req,res)=>{
    let {page}=req.query
    console.log(page)
    let limit=2
    let skip=(+page-1)*limit
    try{
        if(page){
       let data= await ProductModel.find().skip(skip).limit(limit)
       res.status(200).send(data)
        }
        else{
            let data= await ProductModel.find()
       res.status(200).send(data)
        }
        // if(ratingmax&&ratingmin){
        //     ratingmax=+ratingmax
        //     ratingmin=+ratingmin
        //     console.log(ratingmax,ratingmin)
        //     data=await ProductModel.find({$and:[{rating:{$gte:ratingmin}},{rating:{$lte:ratingmax}}]})
        //     res.status(200).send(data)  
        // }

        // if(tag){
        //     data=await ProductModel.find({sellingCount:tag})
        // }
        // if(title){
        //     let data=await ProductModel.find({title:{$regex:title,options:"i"}})
        // }
        // else{
        //     let data= await ProductModel.find()
        //       res.status(200).send(data)
        // }
    }
    catch(err){
        res.status(400).send({'messgae':err.messgae})  
    }
})




module.exports={productrouter}