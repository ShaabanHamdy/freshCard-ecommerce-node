import cartModel from "../../../db/models/cart/cart.js"
import orderModel from "../../../db/models/order/order.js";
import productModel from "../../../db/models/products/product.model.js"
import payment from "../../utils/payment.js"
import { Stripe } from 'stripe';

export const createOrder = async (req, res, next) => {
    const { note, address, phone, paymentType } = req.body


    const cart = await cartModel.findOne({ userId: req.user._id })
    if (!cart?.products?.length) {
        return next(new Error(`Empty cart`))
    }
    req.body.products = cart.products

    let finalProductList = []
    let productIds = []
    let subtotal = 0

    for (let product of req.body.products) {
        const checkedProduct = await productModel.findOne({
            _id: product.productId,
            stock: { $gte: product.quantity },
        })

        if (!checkedProduct) {
            return next(new Error(`Invalid product ${checkedProduct.productId}`))
        }

        product = product.toObject()
        productIds.push(product.productId)
        product.title = checkedProduct.title
        product.price = checkedProduct.price
        product.finalPrice = product.quantity * checkedProduct.price
        finalProductList.push(product)
        subtotal += product.finalPrice
    }

    const order = await orderModel.create({
        userId: req.user._id,
        address,
        phone,
        note,
        products: finalProductList,
        subtotal,
        paymentType,
        status: "waitPayment"
    })

    // decrease product from stock
    // for (const product of req.body.products) {
    //     await productModel.updateOne({ _id: product.productId }, { $inc: { stock: -product.quantity, sold: product.quantity } })
    // }

    // clear cart items

    // await cartModel.updateOne({ userId: req.user._id }, { products: [] })
    // payment
    // const stripe = new Stripe(process.env.STRIP_KEY)
    const stripe = new Stripe("sk_test_51N9oE8E8FB2eaC6mX97vBXjMmt8nmtY4fSIbXPbGK2SQeNghBKu9d1CxlHMRqK03b0ztglPEflKDFQe2k6bpDgj600I2oe9mw1")
    const session = await payment({
        stripe,
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: req.user.email,
        metadata: {
            orderId: order._id.toString()
        },
        cancel_url: `http://localhost:3000/Cart?orderIds=${order._id.toString()}`,
        line_items: order.products.map(product => {
            return {
                price_data: {
                    currency: "egp",
                    product_data: {
                        name: product.title
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            }
        })

    })


    return res.status(201).json({ message: "Done", order, session, url: session.url })
    // return res.status(201).json({ message: "Done" })


}


export const getAll = async (req, res, next) => {
    const order = await productModel.find()
    res.json({ message: "Done" })
}


export const webhook = async (req, res) => {
    // const stripe = Stripe(process.env.STRIP_KEY)
    const stripe = Stripe("sk_test_51N9oE8E8FB2eaC6mX97vBXjMmt8nmtY4fSIbXPbGK2SQeNghBKu9d1CxlHMRqK03b0ztglPEflKDFQe2k6bpDgj600I2oe9mw1")
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, "whsec_J30WiF9SzK6CkIqZ6wP8CkTMTYkESxEO");
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    const { orderId } = event.data.object.metadata

    if (event.type != "checkout.session.completed") {
        await orderModel.updateOne({ _id: orderId }, { status: "rejected" })
        return res.status(400).json({ message: "Rejected Order" })
    }
    await orderModel.updateOne({ _id: orderId }, { status: "paid" })
    //=================================================================

    const carts = await cartModel.find()


    for (const product of carts.products) {
        await productModel.updateOne({ _id: product.productId },
            { $inc: { stock: -product.quantity, sold: product.quantity } })
    }

    await cartModel.updateOne({ products: [] })
    // Return a 200 res to acknowledge receipt of the event
    return res.status(200).json({ message: "Done" })
};

