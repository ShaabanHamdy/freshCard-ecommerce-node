import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    products: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 0 },
    }],

}, {

    
    timestamps: true
})


const cartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default cartModel
