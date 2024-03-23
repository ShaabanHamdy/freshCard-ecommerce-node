import jwt from "jsonwebtoken"





export const token_generation = ({
    payload = {},
    signature = "GENERATETOKEN",
    // signature = process.env.SIGNATURE,
    
}) => {

    const token = jwt.sign(payload, signature)
    return token
}

// =========================================================================
export const token_decode = ({
    payload = {},
    signature = "GENERATETOKEN",
    // signature = process.env.SIGNATURE,
}) => {

    const decode = jwt.verify(payload, signature)
    return decode
}
