import * as Joi from 'joi'

export const codeSubmissionSchema = Joi.object({
	username: Joi.string().alphanum().required(),
	language: Joi.string().required(), 
	language_id: Joi.number().required(), 
	sourceCode: Joi.string().required(), 
	stdInput: Joi.string().optional()
})