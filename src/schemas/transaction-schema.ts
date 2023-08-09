import Joi from 'joi';

export const transactionSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    user_card_id: Joi.number().required()
})