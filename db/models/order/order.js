import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    address: { type: String, required: true },
    phone: [{ type: String, required: true }],
    note: String,
    reason: String,

    products: [{
        title: { type: String, required: true },
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        finalPrice: { type: Number, default: 1, required: true },
    }],
    subtotal: { type: Number, default: 0 },
    // finalPrice: { type: Number, default: 0 },
    paymentType: {
        type: String,
        default: "card",
        enum: ["card", "cash"],
    },
    status: {
        type: String,
        default: "placed",
        enum: ["waitPayment", "placed", "canceled", "rejected", "onWay", "delivered"],
    },
}, {

    

    timestamps: true
})


const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default orderModel
