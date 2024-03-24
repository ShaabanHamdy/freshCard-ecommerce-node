import Stripe from "stripe";


async function payment({
    // stripe = new Stripe(process.env.STRIPE_KEY),
    stripe = new Stripe("sk_test_51N9oE8E8FB2eaC6mX97vBXjMmt8nmtY4fSIbXPbGK2SQeNghBKu9d1CxlHMRqK03b0ztglPEflKDFQe2k6bpDgj600I2oe9mw1"),
    payment_method_types=["card"] ,
    mode="payment",
    customer_email,
    metadata={},
    cancel_url="http://localhost:3000/Cart",
    success_url="http://localhost:3000",
    discounts=[],
    line_items=[]
}={}) {

   
    const session = await stripe.checkout.sessions.create({

        payment_method_types,
        mode,
        customer_email,
        metadata,
        cancel_url,
        success_url,
        discounts,
        line_items
    })
return session
}


export default payment