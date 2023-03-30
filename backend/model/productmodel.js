let mongoose=require("mongoose")

let producrSchema=mongoose.Schema({
    title:String,
    image:[String],
    price:Number,
    category:String,
    gender:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    sellingCount:Number,
    size:Number,
},{
    versionKey:false
})

ProductModel=mongoose.model("productData",producrSchema)

module.exports={ProductModel}