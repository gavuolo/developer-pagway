import Joi from 'joi';

export const transactionSchema = Joi.object({
    value: Joi.string().required(),
    description: Joi.string().required(),
    user_card_id: Joi.number().required()
})