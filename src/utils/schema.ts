import * as Joi from 'joi'

export const codeSubmissionSchema = Joi.object({
	username: Joi.string().alphanum().required(),
	language: Joi.string().required(), 
	sourceCode: Joi.string().required(), 
	stdInput: Joi.string().optional()
})