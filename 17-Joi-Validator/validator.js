import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(10).required(),
  confirmPassword: Joi.ref("password"),
});

export const validateRegister = validator(registerSchema);
