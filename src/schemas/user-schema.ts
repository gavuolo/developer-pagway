import Joi from 'joi';
const date = require('joi').extend(require('@joi/date'));

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})

export const creteCardSchema = Joi.object({
    card_cvv: Joi.string().min(3).max(3).required(),
    card_expiring_date: date.date().format("MM/YY").required(),
    card_number: Joi.string().min(4).max(4).required(),
    card_name: Joi.string().required()
})