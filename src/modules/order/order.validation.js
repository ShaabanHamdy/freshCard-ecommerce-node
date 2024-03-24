

import joi from "joi"
// import { generationFields } from './../../utils/validation.middle.js';
import { generationFields } from '../../utils/validation.middle.js';

export const createOrderJoi = joi.object({
    note: joi.string().min(1).optional(),
    address: joi.string().min(1).required(),
    phone: joi.array().items(joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/))).min(1).max(3).required(),
    products: joi.array().items(joi.object({
        productId: generationFields.id,
        quantity: joi.number().positive().integer().min(1).required()
    }).required()).min(1)
})