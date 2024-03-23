import cartModel from "../../../db/models/cart/cart.js"
import productModel from "../../../db/models/products/product.model.js"

export const addProductToCart = async (req, res, next) => {
    const { productId, quantity } = req.body

    const product = await productModel.findById(productId)
    if (!product) return next(new Error("invalid product id", { cause: 400 }))


    if (product.stock < quantity) {
        await productModel.updateOne({ _id: productId },
            { $addToSet: { wishUserList: req.user._id } })
        return next(new Error(`invalid product quantity max available is ${product.stock}`, { cause: 400 }))
    }

    const cart = await cartModel.findOne({ userId: req.user._id })
    if (!cart) {
        const data = await cartModel.create({
            userId: req.user._id,
            products: [{ productId, quantity }]
        })

        let calcQuantity = data?.products.reduce((e, x) => e + x.quantity, 0) 
        
        return res.status(201).json({ message: "Product added successfully to your cart", data, calcQuantity })
    }

    let equalProduct = false
    for (let i = 0; i < cart.products.length; i++) {

        if (cart.products[i].productId == productId) {
            if (product.stock < cart.products[i].quantity + quantity) {
                return next(new Error(`invalid product quantity max available is ${product.stock}`, { cause: 400 }))
            }
            cart.products[i].quantity += quantity
             equalProduct = true
            break;
        }
    }

    if (!equalProduct) {
        cart.products.push({ productId, quantity })

    }

    await cart.save()

    const data = await cartModel.find({userId:req.user._id}).populate([{ path: "products.productId" }])

    const calcQuantity = parseInt(data.map((e)=> e.products.reduce((e,x)=> e + x.quantity , 0)))
    res.status(201).json({ message: "Product added successfully to your cart", data , calcQuantity })
}


// ======================================================
export const decrementCarts = async (req, res, next) => {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    if (!product) return next(new Error("invalid product id", { cause: 400 }))
    const cart = await cartModel.findOne({ userId: req.user._id })
    if (!cart) return next(new Error("invalid user id"))
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId == productId) {
            if (cart.products[i].quantity == 1) {
                return next(new Error("can't decrement less than 1"))
            }
            if (cart.products[i].quantity > 1) {
                cart.products[i].quantity -= 1
                await cart.save()
                const data = await cartModel.find({userId:req.user._id}).populate([{ path: "products.productId" }])
                // const data = await cartModel.find().populate([{ path: "products.productId" }])
                const calcQuantity = parseInt(data.map((e)=> e.products.reduce((e,x)=> e + x.quantity , 0)))
            
                res.status(201).json({ message: "Product added successfully to your cart", calcQuantity})
                return
            }


        }
    }

}
// ======================================================

// // ======================================================
export const removeOneCart = async (req, res, next) => {
    const { productId } = req.body
    const cart = await cartModel.findOne({ userId: req.user._id })
    if (!cart) return next(new Error("invalid user id"))
    // for (let i = 0; i < cart.products.length; i++) {
    //     let x = cart.products.find(e => e._id == productId)
    // }
    const cartId = await cartModel.updateOne({ "products.productId": productId }, {
        $pull: { products: { productId } }
    })

    if (cartId) {
        res.status(201).json({ message: "success" })
        return

    }
    res.status(201).json({ message: "fail to delete cart item ", cartId })
    return

}

// ======================================================
export const deleteAllCarts = async (req, res, next) => {
    const cart = await cartModel.deleteMany()
    if (cart.deletedCount < 1) return next(new Error("not find any  carts ", { cause: 409 }))

    res.status(201).json({ message: "success", deletedCount: cart.deletedCount })
}

// =========================================================
export const getAllCarts = async (req, res, next) => {
    // const user = await cartModel.findOne({ userId: req.user._id })
    if (!await cartModel.findOne({ userId: req.user._id })) {
        let num = 0
        res.json({ message: "Cart Empty", results: parseInt(num) })
    }

    const data = await cartModel.find({ userId: req.user._id }).populate([{
        path: "products.productId"
    }])

    // if (cartModel.findOne({ userId: req.user._id})) {

    // }
    if (data.length < 1) {
        next(new Error("carts empty"))
    }
    let num = data.map(res => res.products.length)
    let carts = data.map(e => e.products)
    const calcQuantity = parseInt(data.map((e)=> e.products.reduce((e,x)=> e + x.quantity , 0)))
    // res.json({ message: "Done", data: carts })
    res.json({ message: "Done", results: parseInt(num), data: carts ,calcQuantity })


}
// =========================================================
