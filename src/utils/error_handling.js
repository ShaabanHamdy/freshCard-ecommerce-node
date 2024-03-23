
let stackVar;

export const asyncHandling = (API) => {

    return (req, res, next) => {
        API(req, res, next).catch(err => {
            stackVar = err.stack
            return next(new Error(err.message, { caus: 500 }))
        })
    }
}

export default function globalErrorHandling(err,req,res,next){
    if (err) {
        return res.status(err.caus || 500).json({message:"fail Response" , 
        Error :err.message , stack : err.stack})
    }
}