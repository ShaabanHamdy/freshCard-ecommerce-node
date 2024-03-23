import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    
    
    title: { type: String, required: true, },
    categoryName: { type: String, required: true, },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: { type: [Object], required: true },
    subImages: { type: [Object] ,required: true},
    discount: { type: Number, default: 0 },
    priceAfterDiscount: { type: Number },
    stock: { type: Number },
    quantity: { type: Number, default: 0, mon: 0, required: [true, "Product quantity required"] },
    size: { type: [String], enum: ['s', 'm', 'lg', 'xl'] },
    sold: { type: Number, default: 0, min: 0 },
    wishUserList: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ratingAverage: {
        type: Number,
        min: [1, 'raying average must be greater than 1'],
        max: [5, 'raying average must be less than 1'],
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    ratingCount: Number,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: [true, "created Id is required"] },

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true
});



productSchema.virtual("category" , {
    ref:"Category",
    localField:"_id",
    foreignField:"productId"
})



const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel