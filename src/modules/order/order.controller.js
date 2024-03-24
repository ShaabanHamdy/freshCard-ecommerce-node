import cartModel from "../../../db/models/cart/cart.js"
import orderModel from "../../../db/models/order/order.js";
import productModel from "../../../db/models/products/product.model.js"
import payment from "../../utils/payment.js"
import { Stripe } from 'stripe';

export const createOrder = async (req, res, next) => {
    const { note, address, phone } = req.body


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
    for (const product of req.body.products) {
        await productModel.updateOne({ _id: product.productId }, { $inc: { stock: -product.quantity, sold: product.quantity } })
    }

    // clear cart items

    await cartModel.updateOne({ userId: req.user._id }, { products: [] })
    payment 
    const stripe = new Stripe(process.env.STRIP_KEY)
    const session = await payment({
        stripe,
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: req.user.email,
        metadata: {
            orderId: order._id.toString()
        },
        cancel_url: `${process.env.CANCEL_URL}?orderId=${order._id.toString()}`,
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