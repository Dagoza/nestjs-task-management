import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.string().default(3000).required(),
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(55000).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required()
});
